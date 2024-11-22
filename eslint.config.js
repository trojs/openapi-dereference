import globals from 'globals'
import pluginJs from '@eslint/js'
import stylisticPlugin from '@stylistic/eslint-plugin'
import stylisticJsPlugin from '@stylistic/eslint-plugin-js'
import importPlugin from 'eslint-plugin-import'
import jsdocPlugin from 'eslint-plugin-jsdoc'
import nodePlugin from 'eslint-plugin-n'
import promisePlugin from 'eslint-plugin-promise'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import sonarjsPlugin from 'eslint-plugin-sonarjs'

export default [
    { languageOptions: { globals: globals.node } },
    pluginJs.configs.recommended,
    // stylisticPlugin.configs['recommended-flat'],
    importPlugin.flatConfigs.recommended,
    jsdocPlugin.configs['flat/recommended'],
    nodePlugin.configs['flat/recommended-script'],
    promisePlugin.configs['flat/recommended'],
    prettierConfig,
    // sonarjsPlugin.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module'
        },
        settings: {
            jsdoc: {
                mode: 'typescript'
            }
        },
        plugins: {
            stylistic: stylisticPlugin,
            '@stylistic/js': stylisticJsPlugin,
            jsdoc: jsdocPlugin,
            n: nodePlugin,
            promise: promisePlugin,
            prettier: prettierPlugin,
            sonarjs: sonarjsPlugin
        },
        rules: {
            indent: [
                'error',
                4,
                {
                    ignoredNodes: ['TemplateLiteral']
                }
            ],
            camelcase: [
                'error',
                {
                    properties: 'never'
                }
            ],
            'max-params': ['warn', 5],
            'max-depth': ['warn', 4],
            'max-statements': ['warn', 20],
            'linebreak-style': ['warn', 'unix'],
            'class-methods-use-this': 'off',
            'comma-style': ['warn', 'last'],
            'no-mixed-spaces-and-tabs': ['warn'],
            'no-prototype-builtins': 'off',

            'no-return-assign': ['error', 'except-parens'],
            'no-restricted-syntax': [
                'error',
                'ForInStatement',
                'LabeledStatement',
                'WithStatement'
            ],
            'no-unused-vars': [
                'error',
                {
                    ignoreRestSiblings: true,
                    argsIgnorePattern: 'res|next|^err'
                }
            ],
            'prefer-const': [
                'error',
                {
                    destructuring: 'all'
                }
            ],
            'arrow-body-style': ['error', 'as-needed'],
            'no-unused-expressions': [
                'error',
                {
                    allowTaggedTemplates: true
                }
            ],
            'max-len': [
                'error',
                {
                    code: 120,
                    comments: 120,
                    tabWidth: 4
                }
            ],
            'no-shadow': [
                'error',
                {
                    hoist: 'all',
                    allow: [
                        'resolve',
                        'reject',
                        'done',
                        'next',
                        'err',
                        'error'
                    ]
                }
            ],
            quotes: [
                'error',
                'single',
                {
                    avoidEscape: true,
                    allowTemplateLiterals: true
                }
            ],
            'vars-on-top': 'error',
            'block-scoped-var': 'error',
            complexity: [
                'error',
                {
                    max: 20
                }
            ],
            'consistent-return': 'error',
            'max-classes-per-file': ['error', 1],
            'no-alert': 'error',
            'no-caller': 'error',
            'no-extra-label': 'error',
            'no-labels': [
                'error',
                {
                    allowLoop: false,
                    allowSwitch: false
                }
            ],
            'no-loop-func': 'error',

            'no-return-await': 'error',
            'no-else-return': [
                'error',
                {
                    allowElseIf: false
                }
            ],
            'no-multi-assign': ['error'],
            'no-console': 'warn',
            'no-param-reassign': [
                'error',
                {
                    props: true,
                    ignorePropertyModificationsFor: [
                        'acc',
                        'accumulator',
                        'e',
                        'req',
                        'request',
                        'res',
                        'response'
                    ]
                }
            ],
            'no-useless-concat': 'error',
            'no-nested-ternary': 'error',
            radix: 'error',
            'for-direction': 'error',
            'getter-return': [
                'error',
                {
                    allowImplicit: true
                }
            ],
            'no-await-in-loop': 'error',
            'no-inner-declarations': 'error',
            'no-var': 'error',
            'no-lonely-if': 'error',
            'prefer-arrow-callback': [
                'error',
                {
                    allowNamedFunctions: false,
                    allowUnboundThis: true
                }
            ],
            'prefer-destructuring': [
                'error',
                {
                    VariableDeclarator: {
                        array: false,
                        object: true
                    },
                    AssignmentExpression: {
                        array: true,
                        object: false
                    }
                },
                {
                    enforceForRenamedProperties: false
                }
            ],
            'prefer-rest-params': 'error',
            'prefer-spread': 'error',
            'prefer-template': 'error',
            'require-yield': 'error',
            'operator-assignment': ['error', 'always'],
            'prefer-object-spread': 'error',
            'no-delete-var': 'error',

            'stylistic/semi': ['error', 'never'],
            '@stylistic/js/comma-dangle': ['error', 'never'],

            'import/prefer-default-export': 'off',
            'import/no-unresolved': [
                'error',
                {
                    caseSensitive: true,
                    ignore: ['\\.ts$']
                }
            ],
            'import/named': 'error',
            'import/no-named-as-default': 'error',
            'import/no-named-as-default-member': 'error',
            'import/no-mutable-exports': 'error',
            'import/order': [
                'error',
                {
                    groups: [['builtin', 'external', 'internal']]
                }
            ],
            'import/no-self-import': 'error',
            'import/no-cycle': [
                'error',
                {
                    maxDepth: '∞'
                }
            ],
            'import/no-useless-path-segments': [
                'error',
                {
                    commonjs: true
                }
            ],
            'import/extensions': [
                'error',
                'ignorePackages',
                {
                    js: 'always'
                }
            ],

            'jsdoc/check-access': 'off',
            'jsdoc/check-alignment': 'error',
            'jsdoc/check-examples': 'off',
            'jsdoc/check-indentation': 'error',
            'jsdoc/check-line-alignment': 'off',
            'jsdoc/check-param-names': 'error',
            'jsdoc/check-property-names': 'error',
            'jsdoc/check-syntax': 'off',
            'jsdoc/check-tag-names': 'error',
            'jsdoc/check-types': [
                'error',
                {
                    unifyParentAndChildTypeChecks: true
                }
            ],
            'jsdoc/check-values': 'error',
            'jsdoc/empty-tags': 'error',
            'jsdoc/implements-on-classes': 'error',
            'jsdoc/match-description': 'off',
            'jsdoc/multiline-blocks': 'error',
            'jsdoc/no-bad-blocks': 'off',
            'jsdoc/no-defaults': 'off',
            'jsdoc/no-missing-syntax': 'off',
            'jsdoc/no-multi-asterisks': 'error',
            'jsdoc/no-restricted-syntax': 'off',
            'jsdoc/no-types': 'off',
            'jsdoc/no-undefined-types': 'error',
            'jsdoc/require-asterisk-prefix': 'off',
            'jsdoc/require-description': 'off',
            'jsdoc/require-description-complete-sentence': 'off',
            'jsdoc/require-example': 'off',
            'jsdoc/require-file-overview': 'off',
            'jsdoc/require-hyphen-before-param-description': 'off',
            'jsdoc/require-jsdoc': 'off',
            'jsdoc/require-param': 'error',
            'jsdoc/require-param-description': 'off',
            'jsdoc/require-param-name': 'error',
            'jsdoc/require-param-type': 'error',
            'jsdoc/require-property': 'error',
            'jsdoc/require-property-description': 'off',
            'jsdoc/require-property-name': 'error',
            'jsdoc/require-property-type': 'error',
            'jsdoc/require-returns': 'error',
            'jsdoc/require-returns-check': 'error',
            'jsdoc/require-returns-description': 'off',
            'jsdoc/require-returns-type': 'error',
            'jsdoc/require-throws': 'off',
            'jsdoc/require-yields': 'error',
            'jsdoc/require-yields-check': 'error',
            'jsdoc/tag-lines': 'error',
            'jsdoc/valid-types': 'warn',

            'sonarjs/anchor-precedence': 'error',
            'sonarjs/argument-type': 'error',
            'sonarjs/arguments-order': 'error',
            'sonarjs/arguments-usage': 'off',
            'sonarjs/array-callback-without-return': 'error',
            'sonarjs/array-constructor': 'off',
            'sonarjs/arrow-function-convention': 'off',
            'sonarjs/assertions-in-tests': 'error',
            'sonarjs/aws-apigateway-public-api': 'error',
            'sonarjs/aws-ec2-rds-dms-public': 'error',
            'sonarjs/aws-ec2-unencrypted-ebs-volume': 'error',
            'sonarjs/aws-efs-unencrypted': 'error',
            'sonarjs/aws-iam-all-privileges': 'error',
            'sonarjs/aws-iam-all-resources-accessible': 'off',
            'sonarjs/aws-iam-privilege-escalation': 'error',
            'sonarjs/aws-iam-public-access': 'error',
            'sonarjs/aws-opensearchservice-domain': 'error',
            'sonarjs/aws-rds-unencrypted-databases': 'error',
            'sonarjs/aws-restricted-ip-admin-access': 'error',
            'sonarjs/aws-s3-bucket-granted-access': 'error',
            'sonarjs/aws-s3-bucket-insecure-http': 'error',
            'sonarjs/aws-s3-bucket-public-access': 'error',
            'sonarjs/aws-s3-bucket-server-encryption': 'off',
            'sonarjs/aws-s3-bucket-versioning': 'error',
            'sonarjs/aws-sagemaker-unencrypted-notebook': 'error',
            'sonarjs/aws-sns-unencrypted-topics': 'error',
            'sonarjs/aws-sqs-unencrypted-queue': 'error',
            'sonarjs/bitwise-operators': 'error',
            'sonarjs/bool-param-default': 'off',
            'sonarjs/call-argument-line': 'error',
            'sonarjs/certificate-transparency': 'error',
            'sonarjs/chai-determinate-assertion': 'error',
            'sonarjs/class-name': 'error',
            'sonarjs/class-prototype': 'off',
            'sonarjs/code-eval': 'error',
            'sonarjs/cognitive-complexity': 'error',
            'sonarjs/comma-or-logical-or-case': 'error',
            'sonarjs/comment-regex': 'off',
            'sonarjs/concise-regex': 'error',
            'sonarjs/conditional-indentation': 'off',
            'sonarjs/confidential-information-logging': 'error',
            'sonarjs/constructor-for-side-effects': 'error',
            'sonarjs/content-length': 'error',
            'sonarjs/content-security-policy': 'error',
            'sonarjs/cookie-no-httponly': 'error',
            'sonarjs/cookies': 'off',
            'sonarjs/cors': 'error',
            'sonarjs/csrf': 'error',
            'sonarjs/cyclomatic-complexity': 'off',
            'sonarjs/declarations-in-global-scope': 'off',
            'sonarjs/deprecation': 'error',
            'sonarjs/destructuring-assignment-syntax': 'off',
            'sonarjs/different-types-comparison': 'error',
            'sonarjs/disabled-auto-escaping': 'error',
            'sonarjs/disabled-resource-integrity': 'error',
            'sonarjs/disabled-timeout': 'error',
            'sonarjs/dns-prefetching': 'off',
            'sonarjs/duplicates-in-character-class': 'error',
            'sonarjs/elseif-without-else': 'off',
            'sonarjs/empty-string-repetition': 'error',
            'sonarjs/encryption': 'off',
            'sonarjs/encryption-secure-mode': 'error',
            'sonarjs/enforce-trailing-comma': 'off',
            'sonarjs/existing-groups': 'error',
            'sonarjs/expression-complexity': 'off',
            'sonarjs/file-header': 'off',
            'sonarjs/file-name-differ-from-class': 'off',
            'sonarjs/file-permissions': 'error',
            'sonarjs/file-uploads': 'error',
            'sonarjs/fixme-tag': 'error',
            'sonarjs/for-in': 'off',
            'sonarjs/for-loop-increment-sign': 'error',
            'sonarjs/frame-ancestors': 'error',
            'sonarjs/function-inside-loop': 'error',
            'sonarjs/function-name': 'off',
            'sonarjs/function-return-type': 'error',
            'sonarjs/future-reserved-words': 'error',
            'sonarjs/generator-without-yield': 'error',
            'sonarjs/hashing': 'error',
            'sonarjs/hidden-files': 'error',
            'sonarjs/hook-use-state': 'error',
            'sonarjs/in-operator-type-error': 'error',
            'sonarjs/inconsistent-function-call': 'error',
            'sonarjs/index-of-compare-to-positive-number': 'error',
            'sonarjs/insecure-cookie': 'error',
            'sonarjs/insecure-jwt-token': 'error',
            'sonarjs/inverted-assertion-arguments': 'error',
            'sonarjs/jsx-key': 'error',
            'sonarjs/jsx-no-constructed-context-values': 'error',
            'sonarjs/label-position': 'error',
            'sonarjs/link-with-target-blank': 'error',
            'sonarjs/max-switch-cases': 'error',
            'sonarjs/max-union-size': 'off',
            'sonarjs/misplaced-loop-counter': 'error',
            'sonarjs/mouse-events-a11y': 'error',
            'sonarjs/nested-control-flow': 'off',
            'sonarjs/new-operator-misuse': 'error',
            'sonarjs/no-all-duplicated-branches': 'error',
            'sonarjs/no-alphabetical-sort': 'error',
            'sonarjs/no-angular-bypass-sanitization': 'error',
            'sonarjs/no-array-delete': 'error',
            'sonarjs/no-array-index-key': 'error',
            'sonarjs/no-associative-arrays': 'error',
            'sonarjs/no-async-constructor': 'error',
            'sonarjs/no-built-in-override': 'off',
            'sonarjs/no-case-label-in-switch': 'error',
            'sonarjs/no-clear-text-protocols': 'error',
            'sonarjs/no-code-after-done': 'error',
            'sonarjs/no-collapsible-if': 'off',
            'sonarjs/no-collection-size-mischeck': 'error',
            'sonarjs/no-commented-code': 'error',
            'sonarjs/no-dead-store': 'error',
            'sonarjs/no-delete-var': 'error',
            'sonarjs/no-deprecated-react': 'error',
            'sonarjs/no-duplicate-in-composite': 'error',
            'sonarjs/no-duplicate-string': ['error', { threshold: 3 }],
            'sonarjs/no-duplicated-branches': 'error',
            'sonarjs/no-element-overwrite': 'error',
            'sonarjs/no-empty-after-reluctant': 'error',
            'sonarjs/no-empty-alternatives': 'error',
            'sonarjs/no-empty-collection': 'error',
            'sonarjs/no-empty-group': 'error',
            'sonarjs/no-empty-test-file': 'error',
            'sonarjs/no-equals-in-for-termination': 'error',
            'sonarjs/no-exclusive-tests': 'error',
            'sonarjs/no-extra-arguments': 'error',
            'sonarjs/no-for-in-iterable': 'off',
            'sonarjs/no-function-declaration-in-block': 'off',
            'sonarjs/no-global-this': 'error',
            'sonarjs/no-globals-shadowing': 'error',
            'sonarjs/no-gratuitous-expressions': 'error',
            'sonarjs/no-hardcoded-credentials': 'error',
            'sonarjs/no-hardcoded-ip': 'error',
            'sonarjs/no-hook-setter-in-body': 'error',
            'sonarjs/no-identical-conditions': 'error',
            'sonarjs/no-identical-expressions': 'error',
            'sonarjs/no-identical-functions': 'error',
            'sonarjs/no-ignored-exceptions': 'error',
            'sonarjs/no-ignored-return': 'error',
            'sonarjs/no-implicit-dependencies': 'off',
            'sonarjs/no-implicit-global': 'error',
            'sonarjs/no-in-misuse': 'error',
            'sonarjs/no-incomplete-assertions': 'error',
            'sonarjs/no-inconsistent-returns': 'off',
            'sonarjs/no-incorrect-string-concat': 'off',
            'sonarjs/no-internal-api-use': 'error',
            'sonarjs/no-intrusive-permissions': 'error',
            'sonarjs/no-invalid-await': 'error',
            'sonarjs/no-invariant-returns': 'error',
            'sonarjs/no-inverted-boolean-check': 'error',
            'sonarjs/no-ip-forward': 'error',
            'sonarjs/no-labels': 'error',
            'sonarjs/no-literal-call': 'error',
            'sonarjs/no-mime-sniff': 'error',
            'sonarjs/no-misleading-array-reverse': 'error',
            'sonarjs/no-mixed-content': 'error',
            'sonarjs/no-nested-assignment': 'error',
            'sonarjs/no-nested-conditional': 'error',
            'sonarjs/no-nested-functions': 'error',
            'sonarjs/no-nested-incdec': 'off',
            'sonarjs/no-nested-switch': 'off',
            'sonarjs/no-nested-template-literals': 'error',
            'sonarjs/no-one-iteration-loop': 'error',
            'sonarjs/no-os-command-from-path': 'error',
            'sonarjs/no-parameter-reassignment': 'error',
            'sonarjs/no-primitive-wrappers': 'error',
            'sonarjs/no-redundant-assignments': 'error',
            'sonarjs/no-redundant-boolean': 'error',
            'sonarjs/no-redundant-jump': 'error',
            'sonarjs/no-redundant-optional': 'error',
            'sonarjs/no-redundant-parentheses': 'off',
            'sonarjs/no-reference-error': 'off',
            'sonarjs/no-referrer-policy': 'error',
            'sonarjs/no-require-or-define': 'off',
            'sonarjs/no-return-type-any': 'off',
            'sonarjs/no-same-argument-assert': 'error',
            'sonarjs/no-same-line-conditional': 'error',
            'sonarjs/no-selector-parameter': 'error',
            'sonarjs/no-skipped-test': 'error',
            'sonarjs/no-small-switch': 'error',
            'sonarjs/no-tab': 'off',
            'sonarjs/no-table-as-layout': 'error',
            'sonarjs/no-try-promise': 'error',
            'sonarjs/no-undefined-argument': 'error',
            'sonarjs/no-undefined-assignment': 'off',
            'sonarjs/no-unenclosed-multiline-block': 'error',
            'sonarjs/no-uniq-key': 'error',
            'sonarjs/no-unsafe': 'error',
            'sonarjs/no-unsafe-unzip': 'error',
            'sonarjs/no-unstable-nested-components': 'error',
            'sonarjs/no-unthrown-error': 'error',
            'sonarjs/no-unused-collection': 'error',
            'sonarjs/no-unused-function-argument': 'off',
            'sonarjs/no-use-of-empty-return-value': 'error',
            'sonarjs/no-useless-catch': 'error',
            'sonarjs/no-useless-increment': 'error',
            'sonarjs/no-useless-intersection': 'error',
            'sonarjs/no-useless-react-setstate': 'error',
            'sonarjs/no-variable-usage-before-declaration': 'off',
            'sonarjs/no-vue-bypass-sanitization': 'error',
            'sonarjs/no-weak-cipher': 'error',
            'sonarjs/no-weak-keys': 'error',
            'sonarjs/no-wildcard-import': 'off',
            'sonarjs/non-existent-operator': 'error',
            'sonarjs/non-number-in-arithmetic-expression': 'off',
            'sonarjs/null-dereference': 'error',
            'sonarjs/object-alt-content': 'error',
            'sonarjs/operation-returning-nan': 'off',
            'sonarjs/os-command': 'error',
            'sonarjs/post-message': 'error',
            'sonarjs/prefer-default-last': 'error',
            'sonarjs/prefer-immediate-return': 'off',
            'sonarjs/prefer-object-literal': 'off',
            'sonarjs/prefer-promise-shorthand': 'error',
            'sonarjs/prefer-single-boolean-return': 'error',
            'sonarjs/prefer-type-guard': 'error',
            'sonarjs/prefer-while': 'error',
            'sonarjs/process-argv': 'off',
            'sonarjs/production-debug': 'error',
            'sonarjs/pseudo-random': 'error',
            'sonarjs/public-static-readonly': 'error',
            'sonarjs/publicly-writable-directories': 'error',
            'sonarjs/reduce-initial-value': 'error',
            'sonarjs/redundant-type-aliases': 'error',
            'sonarjs/regex-complexity': 'error',
            'sonarjs/regular-expr': 'off',
            'sonarjs/session-regeneration': 'error',
            'sonarjs/shorthand-property-grouping': 'off',
            'sonarjs/single-char-in-character-classes': 'error',
            'sonarjs/single-character-alternation': 'error',
            'sonarjs/slow-regex': 'error',
            'sonarjs/sockets': 'off',
            'sonarjs/sonar-block-scoped-var': 'error',
            'sonarjs/sonar-jsx-no-leaked-render': 'error',
            'sonarjs/sonar-max-lines': 'off',
            'sonarjs/sonar-max-lines-per-function': 'off',
            'sonarjs/sonar-no-control-regex': 'error',
            'sonarjs/sonar-no-empty-character-class': 'error',
            'sonarjs/sonar-no-fallthrough': 'error',
            'sonarjs/sonar-no-invalid-regexp': 'error',
            'sonarjs/sonar-no-magic-numbers': 'off',
            'sonarjs/sonar-no-misleading-character-class': 'error',
            'sonarjs/sonar-no-regex-spaces': 'error',
            'sonarjs/sonar-no-unused-class-component-methods': 'error',
            'sonarjs/sonar-no-unused-vars': 'error',
            'sonarjs/sonar-prefer-optional-chain': 'error',
            'sonarjs/sonar-prefer-read-only-props': 'error',
            'sonarjs/sonar-prefer-regexp-exec': 'error',
            'sonarjs/sql-queries': 'error',
            'sonarjs/stable-tests': 'error',
            'sonarjs/standard-input': 'off',
            'sonarjs/stateful-regex': 'error',
            'sonarjs/strict-transport-security': 'error',
            'sonarjs/strings-comparison': 'off',
            'sonarjs/super-invocation': 'error',
            'sonarjs/table-header': 'error',
            'sonarjs/table-header-reference': 'error',
            'sonarjs/test-check-exception': 'error',
            'sonarjs/todo-tag': 'error',
            'sonarjs/too-many-break-or-continue-in-loop': 'off',
            'sonarjs/unicode-aware-regex': 'off',
            'sonarjs/unused-import': 'error',
            'sonarjs/unused-named-groups': 'error',
            'sonarjs/unverified-certificate': 'error',
            'sonarjs/unverified-hostname': 'error',
            'sonarjs/updated-const-var': 'error',
            'sonarjs/updated-loop-counter': 'error',
            'sonarjs/use-type-alias': 'error',
            'sonarjs/useless-string-operation': 'off',
            'sonarjs/values-not-convertible-to-numbers': 'off',
            'sonarjs/variable-name': 'off',
            'sonarjs/void-use': 'error',
            'sonarjs/weak-ssl': 'error',
            'sonarjs/web-sql-database': 'off',
            'sonarjs/x-powered-by': 'error',
            'sonarjs/xml-parser-xxe': 'error',
            'sonarjs/xpath': 'off',
            'sonarjs/sonar-max-params': 'error',
            'sonarjs/no-unused-private-class-members': 'error',
            'sonarjs/alt-text': 'error',
            'sonarjs/brace-style': 'off',
            'sonarjs/no-extra-semi': 'off',
            'sonarjs/no-empty-function': 'off',
            'sonarjs/switch-without-default': 'off',
            'sonarjs/semi': 'off',
            'sonarjs/sonar-no-dupe-keys': 'error',
            'sonarjs/no-unreachable': 'error',
            'sonarjs/default-param-last': 'error',
            'sonarjs/no-infinite-loop': 'error',
            'sonarjs/accessor-pairs': 'off',
            'sonarjs/new-cap': 'off',
            'sonarjs/use-isnan': 'error',
            'sonarjs/no-redeclare': 'error',
            'sonarjs/object-shorthand': 'off',
            'sonarjs/no-var': 'error',
            'sonarjs/prefer-template': 'off',
            'sonarjs/no-throw-literal': 'error',
            'sonarjs/no-empty-interface': 'off',
            'sonarjs/media-has-caption': 'error',
            'sonarjs/prefer-for-of': 'error',
            'sonarjs/prefer-namespace-keyword': 'error',
            'sonarjs/no-accessor-field-mismatch': 'off',
            'sonarjs/no-this-alias': 'off',
            'sonarjs/html-has-lang': 'error',
            'sonarjs/unnecessary-character-escapes': 'error',
            'sonarjs/no-misused-promises': 'error',
            'sonarjs/no-base-to-string': 'error',
            'sonarjs/prefer-string-starts-ends-with': 'error',
            'sonarjs/no-redundant-type-constituents': 'error',
            'sonarjs/prefer-enum-initializers': 'error',
            'sonarjs/prefer-function-type': 'error',
            'sonarjs/prefer-nullish-coalescing': 'error',
            'sonarjs/no-extend-native': 'off',
            'sonarjs/no-useless-constructor': 'error',
            'sonarjs/no-lonely-if': 'error',
            'sonarjs/prefer-object-spread': 'error',
            'sonarjs/prefer-spread': 'error',
            'sonarjs/no-useless-call': 'error',
            'sonarjs/no-self-compare': 'error',
            'sonarjs/no-unknown-property': 'error',
            'sonarjs/jsx-no-useless-fragment': 'error',
            'sonarjs/no-find-dom-node': 'error',
            'sonarjs/anchor-has-content': 'error',
            'sonarjs/anchor-is-valid': 'error',
            'sonarjs/label-has-associated-control': 'error',
            'sonarjs/no-self-import': 'error',
            'sonarjs/no-unused-expressions': 'off',
            'sonarjs/rules-of-hooks': 'error'
        }
    }
]
