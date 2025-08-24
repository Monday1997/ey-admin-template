// uno.config.ts
import presetWind from '@unocss/preset-wind3'
import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import { defineConfig } from 'unocss'

export default defineConfig({
    rules: [
        [
            'm-safe',
            {
                'margin-top': 'env(safe-area-inset-top)',
                'margin-right': 'env(safe-area-inset-right)',
                'margin-bottom': 'env(safe-area-inset-bottom)',
                'margin-left': 'env(safe-area-inset-left)',
            },
        ],
    ],
    presets: [presetWind()],
    transformers: [
        transformerDirectives(),
        //  // hover:bg-gray-400 hover:font-medium font-light font-mono
        // ->hover:(bg-gray-400 font-medium) font-(light mono)
        transformerVariantGroup(),
    ],
})
