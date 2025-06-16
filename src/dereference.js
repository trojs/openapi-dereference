/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
import { klona } from './klona.js'
import { resolveRefSync } from './resolveRef.js'

/**
 * @typedef {import('./types').JSONSchema} JSONSchema
 * @typedef {import('./types').DereferencedJSONSchema} DereferencedJSONSchema
 */

const PROHIBITED_KEYS = ['__proto__', 'constructor', 'prototype']
const cache = new Map()

/**
 * Resolves all $ref pointers in a schema and returns a new schema without any $ref pointers.
 * @param {JSONSchema} schema - The JSON schema to dereference.
 * @returns {DereferencedJSONSchema} The dereferenced schema.
 */
export const dereferenceSync = (schema) => {
  if (cache.has(schema)) {
    return cache.get(schema)
  }

  const visitedNodes = new Set()
  const cloned = klona(schema)

  /**
   * Recursively resolves all elements in an array.
   * @param {any[]} arr - The array to resolve.
   * @param {string} path - The current JSON pointer path.
   * @returns {any[]} The resolved array.
   */
  function resolveArray (arr, path) {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = resolve(arr[i], `${path}/${i}`)
    }
    return arr
  }

  /**
   * Recursively resolves all properties in an object, handling $ref if present.
   * @param {object} obj - The object to resolve.
   * @param {string} path - The current JSON pointer path.
   * @returns {object} The resolved object.
   */
  function resolveObject (obj, path) {
    if ('$ref' in obj && typeof obj.$ref === 'string') {
      let ref = obj
      do {
        ref = resolveRefSync(cloned, ref.$ref)
      } while (ref?.$ref)
      return ref
    }
    for (const key in obj) {
      if (!PROHIBITED_KEYS.includes(key)) {
        obj[key] = resolve(obj[key], `${path}/${key}`)
      }
    }
    return obj
  }

  /**
   * Recursively resolves a value (object, array, or primitive).
   * @param {any} current - The current value to resolve.
   * @param {string} path - The current JSON pointer path.
   * @returns {any} The resolved value.
   */
  function resolve (current, path) {
    if (typeof current !== 'object' || current === null) {
      return current
    }
    if (visitedNodes.has(current)) {
      return current
    }
    visitedNodes.add(current)

    if (Array.isArray(current)) {
      return resolveArray(current, path)
    }
    return resolveObject(current, path)
  }

  const result = resolve(cloned, '#')
  cache.set(schema, result)
  return result
}
