export default function getData() {
  return {
    importers: ["import I18n from './modules/i18n'"],
    appUses: ["app.use(I18n)"],
  };
}
