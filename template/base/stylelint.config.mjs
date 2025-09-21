export default {
  extends: ['stylelint-config-standard', 'stylelint-config-rational-order'],
  plugins: ['stylelint-order', 'stylelint-declaration-block-no-ignored-properties'],
  rules: {
    'comment-empty-line-before': null,
    'function-name-case': ['lower', { ignoreFunctions: ['/colorPalette/'] }],
    'no-invalid-double-slash-comments': null,
    'no-descending-specificity': null,
    'declaration-empty-line-before': null,
    'selector-pseudo-element-no-unknown': null,
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep', 'global'],
      },
    ],
    'at-rule-no-unknown': [true, { ignoreAtRules: ['mixin', 'include', 'extend'] }],
  },
  overrides: [
    {
      files: ['**/*.{vue,html}'], // 针对 Vue / HTML 文件
      customSyntax: 'postcss-html',
    },
  ],
}
