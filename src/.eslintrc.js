/*
 * This rules are not used by create-react-app development server.
 * But it can be used externally, by running a CLI command or by an editor integration.
 *
 * While create-react-app has a minimal set of rules focused on common mistakes
 *  and prevent real bugs, these rules are focused on code style.
 * Use 'error' only for mistakes that directly impact on code result.
 */
module.exports = {
  'rules': {

    // Enforce line breaks after opening and before closing array brackets
    // https://eslint.org/docs/rules/array-bracket-newline
    'array-bracket-newline': ['warn'],

    // Disallow or enforce spaces inside of brackets
    // https://eslint.org/docs/rules/array-bracket-spacing
    'array-bracket-spacing': ['warn', 'never'],

    // Require space before/after arrow function’s arrow
    // https://eslint.org/docs/rules/arrow-spacing
    'arrow-spacing': ['warn', {
      'before': true,
      'after': true,
    }],

    // Disallow or enforce spaces inside of blocks after opening block and before closing block
    // https://eslint.org/docs/rules/block-spacing
    'block-spacing': ['warn', 'always'],

    // Require Brace Style
    // https://eslint.org/docs/rules/brace-style
    'brace-style': ['warn', '1tbs', { 'allowSingleLine': true }],

    // Require Camelcase
    // https://eslint.org/docs/rules/camelcase
    camelcase: ['warn', { properties: 'never' }],

    // Require or disallow trailing commas
    // https://eslint.org/docs/rules/comma-dangle
    'comma-dangle': ['warn', {
      'arrays': 'always-multiline',
      'objects': 'always-multiline',
      'imports': 'always-multiline',
      'exports': 'always-multiline',
      'functions': 'always-multiline',
    }],

    // Enforces spacing around commas
    // https://eslint.org/docs/rules/comma-spacing
    'comma-spacing': ['warn', { before: false, after: true }],

    // Require or disallow newline at the end of files
    // https://eslint.org/docs/rules/eol-last
    'eol-last': ['warn', 'always'],

    // Require or disallow spacing between function identifiers and their invocations
    // https://eslint.org/docs/rules/func-call-spacing
    'func-call-spacing': ['warn'],

    // Enforce consistent line breaks inside function parentheses
    // https://eslint.org/docs/rules/function-paren-newline
    // 'function-paren-newline': ["warn", "multiline"],

    // Enforce consistent spacing around the asterisk in generator functions
    // https://eslint.org/docs/rules/generator-star
    'generator-star-spacing': ['warn'],

    // Ensure consistent use of file extension within the import path
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
    'import/extensions': ['warn', { 'js': 'never' }],

    // Enforce consistent indentation
    // https://eslint.org/docs/rules/indent
    'indent': ['warn', 2],

    // Enforce the consistent use of either double or single quotes in JSX attributes
    // https://eslint.org/docs/rules/jsx-quotes
    'jsx-quotes': ['warn', 'prefer-double'],

    // Enforce consistent spacing between keys and values in object literal properties
    // https://eslint.org/docs/rules/key-spacing
    'key-spacing': ['warn', { beforeColon: false, afterColon: true }],

    // Enforce consistent spacing before and after keywords
    // https://eslint.org/docs/rules/keyword-spacing
    'keyword-spacing': ['warn', {
      before: true,
      after: true,
      overrides: {
        return: { after: true },
        throw: { after: true },
        case: { after: true }
      }
    }],

    // Enforce consistent linebreak style
    // https://eslint.org/docs/rules/linebreak-style
    // Ps.: disabling because we are not confident about how git manages line ending
    // 'linebreak-style': ['warn', 'unix'],

    // Require or disallow an empty line between class members
    // https://eslint.org/docs/rules/lines-between-class-members
    // 'lines-between-class-members': ['warn', 'always'],

    // require a capital letter for constructors
    'new-cap': ['warn', {
      newIsCap: true,
      newIsCapExceptions: [],
      capIsNew: false,
      capIsNewExceptions: [],
    }],

    // Disallow bitwise operators
    // https://eslint.org/docs/rules/no-bitwise
    // Ps.: this is generally a programming error.
    'no-bitwise': ['error'],

    // Disallow mixed spaces and tabs for indentation
    // https://eslint.org/docs/rules/no-mixed-spaces-and-tabs
    'no-mixed-spaces-and-tabs': ['warn'],

    // Disallow Use of Chained Assignment Expressions
    // https://eslint.org/docs/rules/no-multi-assign
    'no-multi-assign': ['warn'],

    // Disallow multiple empty lines
    // https://eslint.org/docs/rules/no-multiple-empty-lines
    'no-multiple-empty-lines': ['warn', { max: 1}],

    // Enforce the location of single-line statements
    // https://eslint.org/docs/rules/nonblock-statement-body-position
    'nonblock-statement-body-position': ['warn', 'beside', { overrides: {} }],

    // Disallow all tabs
    // https://eslint.org/docs/rules/no-tabs
    'no-tabs': ['warn'],

    // Disallow trailing whitespace at the end of lines
    // https://eslint.org/docs/rules/no-trailing-spaces
    'no-trailing-spaces': ['warn'],

    // Disallow ternary operators when simpler alternatives exist
    // https://eslint.org/docs/rules/no-unneeded-ternary
    'no-unneeded-ternary': ['error', { defaultAssignment: false }],

    // Enforce consistent spacing inside braces
    // https://eslint.org/docs/rules/object-curly-spacing
    'object-curly-spacing': ['warn', 'always'],

    // Enforce consistent line breaks inside braces
    // https://eslint.org/docs/rules/object-curly-newline
    'object-curly-newline': ['warn', {
      ObjectExpression: { minProperties: 4, multiline: true, consistent: true },
      ObjectPattern: { minProperties: 4, multiline: true, consistent: true }
    }],

    // Enforce placing object properties on separate lines
    // https://eslint.org/docs/rules/object-property-newline
    'object-property-newline': ['warn', {
      allowMultiplePropertiesPerLine: true,
    }],

    // Enforce variables to be declared either together or separately in functions
    // https://eslint.org/docs/rules/one-var
    'one-var': ['warn', { 'initialized': 'never'}],

    // Require or disallow assignment operator shorthand where possible
    // https://eslint.org/docs/rules/operator-assignment
    'operator-assignment': ['warn', 'always'],

    // Enforce consistent linebreak style for operators
    // https://eslint.org/docs/rules/operator-linebreak
    'operator-linebreak': ['warn'],

    // Require or disallow padding within blocks
    // https://eslint.org/docs/rules/padded-blocks
    'padded-blocks': ['warn', 'never'],

    // https://eslint.org/docs/rules/prefer-template
    // Suggest using template literals instead of string concatenation
    'prefer-template': ['warn'],

    // Require quotes around object literal property names
    // https://eslint.org/docs/rules/quote-props.html
    'quote-props': ['warn', 'as-needed', { keywords: false, unnecessary: true, numbers: false }],

    // Enforce the consistent use of either backticks, double, or single quotes
    // https://eslint.org/docs/rules/quotes
    'quotes': ['warn', 'single', { avoidEscape: true }],

    // Validate closing bracket location in JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md
    'react/jsx-closing-bracket-location': ['warn', 'line-aligned'],

    // Configure the position of the first property
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-first-prop-new-line.md
    'react/jsx-first-prop-new-line': ['warn', 'multiline'],

    // Validate props indentation in JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent-props.md
    'react/jsx-indent-props': ['warn', 2],

    // Validate JSX indentation
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent.md
    'react/jsx-indent': ['warn', 2],

    // Prevent definitions of unused prop types
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unused-prop-types.md
    'react/no-unused-prop-types': ['warn'],

    // Enforce spacing before and after semicolons
    // https://eslint.org/docs/rules/semi-spacing
    'semi-spacing': ['warn'],

    // Enforce location of semicolons
    // https://eslint.org/docs/rules/semi-style
    'semi-style': ['warn', 'last'],

    // Require or disallow semicolons instead of ASI
    // https://eslint.org/docs/rules/semi
    'semi': ['warn', 'never'],

    // Require Or Disallow Space Before Blocks
    // https://eslint.org/docs/rules/space-before-blocks
    'space-before-blocks': ['warn'],

    // Require or disallow a space before function parenthesis
    // https://eslint.org/docs/rules/space-before-function-paren
    'space-before-function-paren': ['warn', {
      'anonymous': 'always',
      'named': 'never',
      'asyncArrow': 'always'
    }],

    // Require or disallow spaces before/after unary operators
    // https://eslint.org/docs/rules/space-unary-ops
    'space-unary-ops': ['warn', {
      words: true,
      nonwords: false,
      overrides: {
      },
    }],

    // Requires or disallows a whitespace (space or tab) beginning a comment
    // https://eslint.org/docs/rules/spaced-comment
    'spaced-comment': ['warn', 'always'],

    // Disallow or enforce spaces inside of parentheses
    // https://eslint.org/docs/rules/space-in-parens
    'space-in-parens': ['warn', 'never'],

    // Require spacing around infix operators
    // https://eslint.org/docs/rules/space-infix-ops
    'space-infix-ops': ['warn'],

    // Enforce spacing around colons of switch statements
    // https://eslint.org/docs/rules/switch-colon-spacing
    'switch-colon-spacing': ['warn', { after: true, before: false }],

    // Enforce Usage of Spacing in Template Strings
    // https://eslint.org/docs/rules/template-curly-spacing
    'template-curly-spacing': ['warn', 'never'],

    // Require or disallow spacing between template tags and their literals
    // https://eslint.org/docs/rules/template-tag-spacing
    'template-tag-spacing': ['warn', 'always'],
  },
}
