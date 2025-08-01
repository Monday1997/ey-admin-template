import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import { globalIgnores } from 'eslint/config'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import pluginVue from 'eslint-plugin-vue'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
    {
        name: 'app/files-to-lint',
        files: ['**/*.{ts,mts,tsx,vue}'],
    },
    {
        plugins: {
            'simple-import-sort': simpleImportSort,
        },
        rules: {
            'simple-import-sort/imports': [
                'warn',
                {
                    groups: [
                        ['^\\u0000'],
                        ['^node:', '^vue', '^ant-design-vue', '^@ant-design', '^@?\\w'],
                        ['^'], // component那些
                        ['^\\.'],
                    ],
                },
            ],
            'simple-import-sort/exports': 'warn',
        },
    },
    globalIgnores(['node_modules/**', '**/dist/**', '**/dist-ssr/**', '**/coverage/**']),
    pluginVue.configs['flat/essential'],
    vueTsConfigs.recommended,
    skipFormatting,
    {
        rules: {
            'no-explicit-any': 'off',
            'vue/multi-word-component-names': 'off',
        },
    },
)
