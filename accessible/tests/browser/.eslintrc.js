"use strict";

module.exports = {
  "extends": [
    "plugin:mozilla/browser-test"
  ],
  "rules": {
    "mozilla/no-aArgs": "error",
    "mozilla/no-cpows-in-tests": "error",
    "mozilla/reject-importGlobalProperties": "error",
    "mozilla/var-only-at-top-level": "error",

    "block-scoped-var": "error",
    "camelcase": "error",
    "comma-dangle": ["error", "never"],
    "comma-style": ["error", "last"],
    "complexity": ["error", 20],
    "consistent-this": "off",
    "curly": ["error", "multi-line"],
    "default-case": "off",
    "dot-location": ["error", "property"],
    "dot-notation": "error",
    "eqeqeq": "off",
    "func-names": "off",
    "func-style": "off",
    "generator-star-spacing": "off",
    "handle-callback-err": ["error", "er"],
    "indent": ["error", 2, {"SwitchCase": 1}],
    "max-nested-callbacks": ["error", 4],
    "max-params": "off",
    "max-statements": "off",
    "new-cap": ["error", {"capIsNew": false}],
    "new-parens": "error",
    "no-array-constructor": "error",
    "no-bitwise": "off",
    "no-caller": "error",
    "no-catch-shadow": "error",
    "no-comma-dangle": "off",
    "no-console": "off",
    "no-constant-condition": "off",
    "no-continue": "off",
    "no-control-regex": "error",
    "no-div-regex": "off",
    "no-eval": "error",
    "no-extend-native": "error",
    "no-extra-parens": "off",
    "no-extra-semi": "error",
    "no-extra-strict": "off",
    "no-fallthrough": "error",
    "no-floating-decimal": "off",
    "no-inline-comments": "off",
    "no-mixed-requires": "off",
    "no-multi-str": "error",
    "no-multiple-empty-lines": ["error", {"max": 1}],
    "no-new-require": "off",
    "no-param-reassign": "off",
    "no-path-concat": "off",
    "no-plusplus": "off",
    "no-process-env": "off",
    "no-process-exit": "off",
    "no-proto": "error",
    "no-reserved-keys": "off",
    "no-restricted-modules": "off",
    "no-return-assign": "error",
    "no-script-url": "off",
    "no-sequences": "error",
    "no-shadow": "error",
    "no-space-before-semi": "off",
    "no-sparse-arrays": "error",
    "no-sync": "off",
    "no-ternary": "off",
    "no-throw-literal": "error",
    "no-underscore-dangle": "off",
    "no-undefined": "off",
    "no-unneeded-ternary": "error",
    "no-unused-vars": ["error", {"vars": "all", "args": "none"}],
    "no-use-before-define": "off",
    "no-var": "off",
    "no-warning-comments": "off",
    "object-shorthand": "off",
    "one-var": ["error", "never"],
    "padded-blocks": ["error", "never"],
    "quote-props": "off",
    "radix": "error",
    "semi": ["error", "always"],
    "semi-spacing": ["error", {"before": false, "after": true}],
    "sort-vars": "off",
    "space-in-brackets": "off",
    "space-in-parens": ["error", "never"],
    "space-unary-word-ops": "off",
    "strict": ["error", "global"],
    "valid-jsdoc": "off",
    "vars-on-top": "off",
    "wrap-iife": "off",
    "wrap-regex": "off",
    "yoda": "error",

    "guard-for-in": "off",
    "newline-after-var": "off",
    "no-alert": "off",
    "no-eq-null": "off",
    "no-func-assign": "off",
    "no-implied-eval": "off",
    "no-inner-declarations": "off",
    "no-invalid-regexp": "off",
    "no-irregular-whitespace": "off",
    "no-iterator": "off",
    "no-label-var": "off",
    "no-labels": "error",
    "no-lone-blocks": "off",
    "no-loop-func": "off",
    "no-negated-in-lhs": "off",
    "no-new": "off",
    "no-new-func": "off",
    "no-new-object": "off",
    "no-new-wrappers": "off",
    "no-obj-calls": "off",
    "no-octal-escape": "off",
    "no-undef-init": "error",
    "no-unexpected-multiline": "error",
    "object-curly-spacing": "off",
    "no-unused-expressions": "off",
    "no-void": "off",
    "no-wrap-func": "off",
    "operator-assignment": "off",
    "operator-linebreak": ["error", "after"]
  }
};
