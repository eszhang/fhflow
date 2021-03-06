
const eslintrc = {
    extends: 'airbnb',
    env: {
        browser: true,
        node: true,
        es6: true
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: {
            jsx: true,
            experimentalObjectRestSpread: true
        }
    },
    // plugins: [
    //     'react',
    //     'babel'
    // ],
    rules: {
        indent: [
            'error',
            4,
            {
                SwitchCase: 1
            }
        ],
        'func-names': 0,
        'no-plusplus': 0,
        'no-console': 0,
        'max-len': 0,
        'one-var': 0,
        'comma-dangle': [
            'error',
            'never'
        ],
        'linebreak-style': [
            'error',
            'windows'
        ],
        'global-require': 0,
        'prefer-destructuring': 0,
        'no-buffer-constructor': 0,
        'no-param-reassign': 0,
        'no-unused-expressions': 0,
        'no-loop-func': 0,
        'import/first': 0,
        'no-restricted-syntax': 0,
        'guard-for-in': 1,
        'import/no-extraneous-dependencies': 0,
        'import/no-dynamic-require': 0,
        'react/jsx-indent': [
            'error',
            4
        ],
        'react/jsx-indent-props': [
            'error',
            4
        ],
        "react/forbid-prop-types": [
            2,
            {
                "forbid": [
                    "any"
                ]
            }
        ],
        'react/prop-types': 0,
        'react/jsx-first-prop-new-line': 0,
        'react/no-array-index-key': 0,
        'jsx-a11y/no-static-element-interactions': 0,
        'jsx-a11y/anchor-has-content': 0,
        'jsx-a11y/click-events-have-key-events': 0,
        'jsx-a11y/anchor-is-valid': 0,
        'jsx-a11y/href-no-hash': 0,
        'jsx-a11y/no-noninteractive-element-interactions': 0
    }
}

module.exports = eslintrc;