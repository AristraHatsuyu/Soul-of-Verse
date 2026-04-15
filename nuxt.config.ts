export default defineNuxtConfig({
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },
  app: {
    baseURL: '/',
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  modules: [
    '@vueuse/nuxt',
  ],

  runtimeConfig: {
    public: {
      deepseekApiKey: process.env.NUXT_PUBLIC_DEEPSEEK_API_KEY || ''
    }
  },

  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },

  css: [
    '@/assets/css/global.css',
  ]
})