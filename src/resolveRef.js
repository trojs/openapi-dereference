/**
 * @typedef {import('./types').JSONSchema} JSONSchema
 * @typedef {import('./types').DereferencedJSONSchema} DereferencedJSONSchema
 */

const cache = new Map()

/**
 * Resolves a $ref pointer in a schema and returns the referenced value.
 * @param {JSONSchema} schema
 * @param {string} ref
 * @returns {unknown}
 */
export const resolveRefSync = (schema, ref) => {
    if (!cache.has(schema)) {
        cache.set(schema, new Map())
    }
    const schemaCache = cache.get(schema)

    if (schemaCache.has(ref)) {
        return schemaCache.get(ref)
    }

    const path = ref.split('/').slice(1)

    let current = schema
    for (const segment of path) {
        if (!current || typeof current !== 'object') {
            // we've reached a dead end
            current = null
        }
        current = current[segment] ?? null
    }

    schemaCache.set(ref, current)
    return current
}
