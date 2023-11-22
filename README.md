# OpenAPI dereference

[![NPM version][npm-image]][npm-url] [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=hckrnews_openapi-dereference&metric=coverage)](https://sonarcloud.io/summary/new_code?id=hckrnews_openapi-dereference) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=hckrnews_openapi-dereference&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=hckrnews_openapi-dereference) 
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=hckrnews_openapi-dereference&metric=bugs)](https://sonarcloud.io/summary/new_code?id=hckrnews_openapi-dereference) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=hckrnews_openapi-dereference&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=hckrnews_openapi-dereference) [![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=hckrnews_openapi-dereference&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=hckrnews_openapi-dereference) [![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=hckrnews_openapi-dereference&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=hckrnews_openapi-dereference)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=hckrnews_openapi-dereference&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=hckrnews_openapi-dereference) [![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=hckrnews_openapi-dereference&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=hckrnews_openapi-dereference) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=hckrnews_openapi-dereference&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=hckrnews_openapi-dereference)

Dereference $ref pointers in JSONSchema or OpenAPI documents.

Zero dependencies. Synchronous core. Handles circular refs.

## Installation

`npm install @hckrnews/openapi-dereference`
or
`yarn add @hckrnews/openapi-dereference`

## Test the package

`npm run test`
or
`yarn test`

## How to use


```javascript
npm i @hckrnews/openapi-dereference

```

```javascript
import { dereferenceSync } from 'dereference-json-schema';

const schemaWithRefs = {
  schemas: {
    Person: {
      type: 'object',
      properties: {
        name: {
          $ref: '#/schemas/Name',
        },
      },
    },
    Name: {
      type: 'string',
    },
  },
};

const schemaWithNoRefs = dereferenceSync(schemaWithRefs);


[npm-url]: https://www.npmjs.com/package/@hckrnews/openapi-dereference
[npm-image]: https://img.shields.io/npm/v/@hckrnews/openapi-dereference.svg
