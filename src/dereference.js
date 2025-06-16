/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
import { klona } from './klona.js'
import { resolveRefSync } from './resolveRef.js'

/**
 * @typedef {import('./types').JSONSchema} JSONSchema
 * @typedef {import('./types').DereferencedJSONSchema} DereferencedJSONSchema
 */

const cache = new Map()

/**
 * Resolves all $ref pointers in a schema and returns a new schema without any $ref pointers.
 * @param {JSONSchema} schema
 * @returns {DereferencedJSONSchema}
 */
export const dereferenceSync = (schema) => {
  if (cache.has(schema)) {
    return cache.get(schema)
  }

  const visitedNodes = new Set()
  const cloned = klona(schema)

  const resolve = (current, path) => {
    if (typeof current === 'object' && current !== null) {
      // make sure we don't visit the same node twice
      if (visitedNodes.has(current)) {
        return current
      }
      visitedNodes.add(current)

      if (Array.isArray(current)) {
        // array
        for (let index = 0; index < current.length; index++) {
          current[index] = resolve(current[index], `${path}/${index}`)
        }
      } else {
        // object
        if ('$ref' in current && typeof current.$ref === 'string') {
          let ref = current
          do {
            ref = resolveRefSync(cloned, ref.$ref)
          } while (ref?.$ref)
          return ref
        }

        for (const key in current) {
          if (!['__proto__', 'constructor', 'prototype'].includes(key)) {
            current[key] = resolve(current[key], `${path}/${key}`)
          }
        }
      }
    }

    return current
  }

  const result = resolve(cloned, '#')
  cache.set(schema, result)
  return result
}
