/* eslint-disable sonarjs/no-duplicate-string */
import test from 'node:test'
import assert from 'node:assert'
import { dereferenceSync } from './dereference.js'

/**
 * @typedef {import('./types').JSONSchema} JSONSchema
 * @typedef {import('./types').DereferencedJSONSchema} DereferencedJSONSchema
 */

test('dereferenceSync', async (t) => {
    await t.test('should return a copy of the same schema if it has no $ref', async () => {
    // given
    /** @type {JSONSchema} */
        const schema = {
            type: 'object',
            properties: {
                name: {
                    type: 'string'
                }
            }
        }

        // when
        const result = dereferenceSync(schema)

        assert.deepEqual(result, schema)
    })

    await t.test('should dereference simple schema', async () => {
    // given
    /** @type {JSONSchema} */
        const schema = {
            schemas: {
                Person: {
                    type: 'object',
                    properties: {
                        name: {
                            $ref: '#/schemas/Name'
                        }
                    }
                },
                Name: {
                    type: 'string'
                }
            }
        }

        // when
        const result = dereferenceSync(schema)

        assert.deepEqual(result, {
            schemas: {
                Person: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string'
                        }
                    }
                },
                Name: {
                    type: 'string'
                }
            }
        })
    })

    await t.test('should dereference a schema with deeply nested $refs', async () => {
    // given
    /** @type {JSONSchema} */
        const schema = {
            schemas: {
                Person: {
                    type: 'object',
                    properties: {
                        name: {
                            $ref: '#/schemas/Name'
                        }
                    }
                },
                Name: {
                    type: 'object',
                    properties: {
                        first: {
                            $ref: '#/schemas/FirstName'
                        },
                        last: {
                            $ref: '#/schemas/LastName'
                        }
                    }
                },
                FirstName: {
                    $ref: '#/schemas/NameComponent'
                },
                LastName: {
                    $ref: '#/schemas/NameComponent'
                },
                NameComponent: {
                    $ref: '#/schemas/StringType'
                },
                StringType: {
                    type: 'string'
                }
            }
        }

        // when
        const result = dereferenceSync(schema)

        assert.deepEqual(result, {
            schemas: {
                Person: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'object',
                            properties: {
                                first: {
                                    type: 'string'
                                },
                                last: {
                                    type: 'string'
                                }
                            }
                        }
                    }
                },
                Name: {
                    type: 'object',
                    properties: {
                        first: {
                            type: 'string'
                        },
                        last: {
                            type: 'string'
                        }
                    }
                },
                FirstName: {
                    type: 'string'
                },
                LastName: {
                    type: 'string'
                },
                NameComponent: {
                    type: 'string'
                },
                StringType: {
                    type: 'string'
                }
            }
        })
    })

    await t.test('should dereference a schema with circular $refs', async () => {
    // given
    /** @type {JSONSchema} */
        const schema = {
            schemas: {
                Person: {
                    type: 'object',
                    properties: {
                        name: {
                            $ref: '#/schemas/Person'
                        }
                    }
                }
            }
        }

        // when
        const result = dereferenceSync(schema)

        // then
        const CircularPerson = {
            type: 'object',
            properties: {
                name: {
                    $ref: '#/schemas/Person'
                }
            }
        }
        // @ts-ignore
        CircularPerson.properties.name = CircularPerson

        assert.deepEqual(result, {
            schemas: {
                Person: CircularPerson
            }
        })
    })

    await t.test('should replace a bad ref with nul', async () => {
    // given
    /** @type {JSONSchema} */
        const schema = {
            schemas: {
                Person: {
                    type: 'object',
                    properties: {
                        name: {
                            $ref: '#/schemas/Name'
                        }
                    }
                }
            }
        }

        // when
        const result = dereferenceSync(schema)

        assert.deepEqual(result, {
            schemas: {
                Person: {
                    type: 'object',
                    properties: {
                        name: null
                    }
                }
            }
        })
    })

    await t.test('should cache the dereferenced schema', async () => {
    // given
    /** @type {JSONSchema} */
        const schema = {
            schemas: {
                Person: {
                    type: 'object',
                    properties: {
                        name: {
                            $ref: '#/schemas/Name'
                        }
                    }
                },
                Name: {
                    type: 'string'
                }
            }
        }
        const result1 = dereferenceSync(schema)

        // when

        // mutate schema
        // since we are caching the clone, dereferenced schema, this should not affect the result
        schema.schemas.Person = {
            type: 'string'
        }
        const result2 = dereferenceSync(schema)

        assert.deepEqual(result1, {
            schemas: {
                Person: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string'
                        }
                    }
                },
                Name: {
                    type: 'string'
                }
            }
        })

        assert.deepEqual(result1, result2)
    })
})
