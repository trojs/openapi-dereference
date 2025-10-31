/* eslint sonarjs/cognitive-complexity: ["error", 19] */
import { klona } from './klona.js'
import { resolveRefSync } from './resolveRef.js'

/**
 * @typedef {import('./types.d.ts').JSONSchema} JSONSchema
 * @typedef {import('./types.d.ts').DereferencedJSONSchema} DereferencedJSONSchema
 * @typedef {WeakMap<{[key: string]: string}, any>} WeakMapRefAny
 */

const PROHIBITED_KEYS = new Set(['__proto__', 'constructor', 'prototype'])
const cache = new Map()

/**
 * Removes prohibited keys from an object (shallow).
 * @param {object} obj
 * @returns {object}
 */
function filterProhibitedKeys (obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !PROHIBITED_KEYS.has(key))
  )
}

/**
 * Resolves all $ref pointers in a schema and returns a new schema without any $ref pointers.
 * Handles circular references and deeply nested $refs.
 * @param {JSONSchema} schema - The JSON schema to dereference.
 * @returns {DereferencedJSONSchema} The dereferenced schema.
 */
export const dereferenceSync = (schema) => {
  if (cache.has(schema)) return cache.get(schema)

  // Filter prohibited keys at the root level
  const filtered = typeof schema === 'object' && schema !== null && !Array.isArray(schema)
    ? filterProhibitedKeys(schema)
    : schema

  const cloned = klona(filtered)
  /** @type {WeakMapRefAny} */
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

    // Handle arrays (register before descending)
    if (Array.isArray(current)) {
      const arr = new Array(current.length)
      // @ts-expect-error
      seen.set(current, arr)
      for (let i = 0; i < current.length; i++) {
        arr[i] = resolve(current[i], `${path}/${i}`)
      }
      return arr
    }

    // Handle $ref
    if ('$ref' in current && typeof current.$ref === 'string') {
      const ref = resolveRefSync(cloned, current.$ref)
      if (!ref) {
        return null
      }
      // @ts-expect-error WeakMap type
      if (typeof ref === 'object' && ref !== null && seen.has(ref)) {
        // @ts-expect-error WeakMap type
        return seen.get(ref)
      }
      // Resolve the referenced value (object/array/primitive)
      return resolve(ref, current.$ref)
    }

    // Handle objects (register before descending)
    const obj = {}
    seen.set(current, obj)
    for (const [key, value] of Object.entries(current)) {
      if (PROHIBITED_KEYS.has(key)) continue
      obj[key] = resolve(value, `${path}/${key}`)
    }
    return obj
  }

  const result = resolve(cloned, '#')
  cache.set(schema, result)
  return result
}
