import {defineNuxtConfig} from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    shim: false
  },
  css: [
    'normalize.css/normalize.css',
    'assets/css/tailwind.css',
    '@/assets/css/main.css'
  ],
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          'postcss-import':{},
          tailwindcss: {},
          autoprefixer: {
            overrideBrowserslist: [
              "Android 4.1",
              "iOS 7.1",
              "Chrome > 31",
              "ff > 31",
              "ie >= 8",
              "last 10 versions", // 所有主流浏览器最近10版本用
            ],
            grid: true,
          },
        },
      }
    }
  },
  head: [
    {
      charset: 'utf-8'
    },
    {
      name: 'viewport',
      content:
        'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
    }
  ],
  buildModules: ['@nuxtjs/tailwindcss']
})
