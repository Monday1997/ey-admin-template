function getData() {
  return {
    importers: [`import tailwindcss from '@tailwindcss/vite'`],
    plugins: [`tailwindcss()`],
  };
}
export default getData;
