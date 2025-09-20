export default function getData() {
  return {
    importers: [
      `import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'`,
      `import path from 'path'`,
    ],
    plugins: [
      `VueI18nPlugin({
      include: [path.resolve(__dirname, './locales/**')],
      compositionOnly: true,
    }),`,
    ],
  };
}
