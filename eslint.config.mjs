import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import tseslint from "typescript-eslint";


export default [
  { ignores: ["dist/*", "node_modules/*", "temp/*"] },
  { rules: {
        "sort-imports": [
          "error",
          {
            "ignoreCase": false,
            "ignoreDeclarationSort": false,
            "ignoreMemberSort": false,
            "memberSyntaxSortOrder": ["none", "all", "multiple", "single"],
            "allowSeparatedGroups": false
        }
        ],
        "comma-dangle": "off",
        "no-nested-ternary": "warn",
        "no-dupe-class-members": "off",
        "no-undef": "off",
        "no-array-constructor": "off",
        "no-use-before-define": "off",
        "no-unused-vars": "off",
        "no-useless-constructor": "off",
        "no-shadow": "off",
        "no-await-in-loop": "warn",
        "no-restricted-globals": "warn",
        "triple-slash-reference": 0,
        "no-plusplus": "warn",
        "no-param-reassign": "warn",
        "class-methods-use-this": "off",
        "no-void": "warn",
        "react/prop-types": "off",
        "react/display-name": "off",
        "react/jsx-filename-extension": [
          1,
          {
            "extensions": [".js", ".jsx", ".ts", ".tsx"]
          }
        ],
        "jsx-quotes": ["error", "prefer-double"],
        "no-restricted-syntax": "warn",
        "no-continue": "warn",
        "no-prototype-builtins": "warn",
        "operator-assignment": "warn",
        "no-underscore-dangle": "off",
        "lines-between-class-members": "off",
        "prefer-object-spread": "warn",
        "max-classes-per-file": "warn",
        "global-require": "warn",
        "spaced-comment": "warn",
        "function-paren-newline": "off",
        "prefer-regex-literals": "warn",
        "quote-props": ["error", "consistent"],
        "no-useless-escape": "warn",
        "no-self-compare": "warn",
        "space-infix-ops": "warn",
        "no-template-curly-in-string": "warn",
        "linebreak-style": "off",
        "dot-notation": "off",
        "strict": "off",
        "object-curly-newline": "off",
        "no-unused-expressions": "off",
        "arrow-body-style": ["warn", "as-needed"],
        "arrow-parens": ["error", "as-needed"],
        "arrow-spacing": ["error"],
        "no-var": "error",
        "object-curly-spacing": ["error", "always"],
        "array-bracket-spacing": ["off"],
        "block-spacing": ["error", "always"],
        "camelcase": [
          "error",
          {
            "properties": "never",
            "allow": ["child_process"]
          }
        ],
        "space-before-function-paren": "off",
        "space-in-parens": [
          "off",
          "never",
          {
            "exceptions": ["()"]
          }
        ],
        "padding-line-between-statements": [
          "warn",
          {
            "blankLine": "always",
            "prev": "directive",
            "next": "*"
          },
          {
            "blankLine": "any",
            "prev": "directive",
            "next": "directive"
          },
          {
            "blankLine": "always",
            "prev": "import",
            "next": "*"
          },
          {
            "blankLine": "any",
            "prev": "import",
            "next": "import"
          },
          {
            "blankLine": "always",
            "prev": "*",
            "next": ["const", "let", "var", "export"]
          },
          {
            "blankLine": "always",
            "prev": ["const", "let", "var", "export"],
            "next": "*"
          },
          {
            "blankLine": "any",
            "prev": ["const", "let", "var", "export"],
            "next": ["const", "let", "var", "export"]
          },
          {
            "blankLine": "always",
            "prev": "*",
            "next": ["if", "class", "for", "do", "while", "switch", "try"]
          },
          {
            "blankLine": "always",
            "prev": ["if", "class", "for", "do", "while", "switch", "try"],
            "next": "*"
          },
          {
            "blankLine": "always",
            "prev": "*",
            "next": "return"
          }
        ],
        "max-len": "off"
    } },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];
