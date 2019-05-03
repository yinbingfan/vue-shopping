import pkg from './package'

export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: 'vue-shopping',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: 'http://ims.dev.zjjc.com/passport/resource/img/favicon.ico' }]
  },
  // router: {
  //   middleware: 'stats',
  // },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  env: {
    NODE_ENV: process.env.NODE_ENV
  },
  /*
   ** Global CSS
   */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '~assets/css/normalize.css',
    '~assets/css/element-ui.css',
    '~assets/css/icon.css',
    '~assets/css/common.css'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/element-ui',
    '~plugins/cookie.js',
    '~plugins/axios.js',
    '~plugins/filters.js',
    '~plugins/route',
    { src: '~plugins/v-distpicker.js', ssr: true },
    // { src: '~plugins/cookie.js', ssr: false },
  ],

  /*
   ** Nuxt.js modules
   */

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
  ],
  axios: {
    credentials: true,
    retry: {retries: 3},
    prefix: '/api',
    proxy: true,
    // baseURL:'http://192.168.0.220:91',//开发环境地址
    // baseURL:'http://47.102.127.137:81',//测试地址
  },
  /*
  * 开启代理
  * */
  proxy: {
    // "/api/market": {
    //   // target: "http://47.102.127.137:81", // 测试接口的域名
    //   // target: "http://192.168.0.220:90", // 测试接口的域名
    //   pathRewrite: {
    //     "^/api/market": "/market"
    //   }
    // },
    // "/api/agent": {
    //   target: "http://192.168.0.144:55410", // 接口的域名
    //   pathRewrite: {
    //     "^/api/agent": "/agent"
    //   }
    // },
    "/api": {
      target: "http://192.168.0.220:90",
      // target: "http://47.102.127.137:81",
      // target: "http://192.168.0.146:55413", // 接口的域名
      // target: "192.168.0.218:81",
      pathRewrite: { "^/api/": "" }
    },

  },

  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    vendor: ['axios'],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
