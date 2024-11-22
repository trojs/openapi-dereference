/* eslint-disable sonarjs/no-duplicate-string */
import test from 'node:test'
import assert from 'node:assert'
import { resolveRefSync } from './resolveRef.js'

/**
 * @typedef {import('./types.js').JSONSchema} JSONSchema
 * @typedef {import('./types.js').DereferencedJSONSchema} DereferencedJSONSchema
 */

test('resolveRef', async (t) => {
    await t.test('should resolve simple refs', async () => {
    // given
    /** @type {JSONSchema} */
        const schema = {
            schemas: {
                Person: {
                    type: 'object'
                },
                Name: {
                    type: 'string'
                }
            }
        }

        // when
        const result1 = resolveRefSync(schema, '#/schemas/Person')
        const result2 = resolveRefSync(schema, '#/schemas/Name')

        assert.deepEqual(result1, {
            type: 'object'
        })
        assert.deepEqual(result2, {
            type: 'string'
        })
    })

    await t.test('should resolve bad refs as null', async () => {
    // given
    /** @type {JSONSchema} */
        const schema = {
            schemas: {
                Person: {
                    type: 'object'
                }
            }
        }

        // when
        const result = resolveRefSync(schema, '#/schemas/Name')

        assert.deepEqual(result, null)
    })

    await t.test('should cache resolved refs', async () => {
    // given
    /** @type {JSONSchema} */
        const schema = {
            schemas: {
                Person: {
                    type: 'object'
                }
            }
        }
        const result1 = resolveRefSync(schema, '#/schemas/Person')

        // when

        // replace Person schema with a new object
        // since we are caching the resolved ref, this should not affect the next result
        schema.schemas.Person = {
            type: 'string'
        }
        const result2 = resolveRefSync(schema, '#/schemas/Person')

        assert.deepEqual(result1, {
            type: 'object'
        })
        assert.deepEqual(result1, result2)
    })
})
