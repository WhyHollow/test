const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "@/styles/scss/main.scss";'
      }
    },
    modules: true,
    extract: false
  },
});
