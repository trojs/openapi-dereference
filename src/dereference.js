import { klona } from './klona.js'
import { resolveRefSync } from './resolveRef.js'

/**
 * @typedef {import('./types').JSONSchema} JSONSchema
 * @typedef {import('./types').DereferencedJSONSchema} DereferencedJSONSchema
 */

const PROHIBITED_KEYS = new Set(['__proto__', 'constructor', 'prototype'])
const cache = new Map()

/**
 * Resolves all $ref pointers in a schema and returns a new schema without any $ref pointers.
 * Handles circular references and deeply nested $refs.
 * @param {JSONSchema} schema - The JSON schema to dereference.
 * @returns {DereferencedJSONSchema} The dereferenced schema.
 */
export const dereferenceSync = (schema) => {
  if (cache.has(schema)) return cache.get(schema)

  const cloned = klona(schema)
  const seen = new WeakMap()

  /**
   * Recursively resolves a value (object, array, or primitive).
   * @param {any} current - The current value to resolve.
   * @param {string} path - The current JSON pointer path.
   * @returns {any} The resolved value.
   */
  const resolve = (current, path) => {
    if (typeof current !== 'object' || current === null) return current

    // Handle circular references
    if (seen.has(current)) return seen.get(current)

    // Handle arrays
    if (Array.isArray(current)) {
      const arr = current.map((item, i) => resolve(item, `${path}/${i}`))
      seen.set(current, arr)
      return arr
    }

    // Handle $ref
    if ('$ref' in current && typeof current.$ref === 'string') {
      const ref = resolveRefSync(cloned, current.$ref)
      if (!ref) return null
      // Recursively resolve the referenced schema
      // Track the resolved object for circular refs
      if (seen.has(ref)) return seen.get(ref)
      // Create a placeholder to handle circular refs
      const placeholder = {}
      seen.set(current, placeholder)
      const resolved = resolve(ref, current.$ref)
      Object.assign(placeholder, resolved)
      return placeholder
    }

    // Handle objects
    const obj = Object.fromEntries(
      Object.entries(current)
        .filter(([key]) => !PROHIBITED_KEYS.has(key))
        .map(([key, value]) => [key, resolve(value, `${path}/${key}`)])
    )
    seen.set(current, obj)
    return obj
  }

  const result = resolve(cloned, '#')
  cache.set(schema, result)
  return result
}
