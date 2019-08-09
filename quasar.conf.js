// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js

module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: [
      'i18n',
      'axios',
      'vuelidate',
      'route-permission'
    ],

    css: [
      'app.styl'
    ],

    extras: [
      // 'ionicons-v4',
      'mdi-v3',
      // 'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons' // optional, you are not bound to it
    ],

    framework: {
      iconSet: 'mdi-v3',
      lang: 'zh-hans', // Quasar language

      // all: true, // --- includes everything; for dev only!

      components: [
        'QLayout',
        'QHeader',
        'QFooter',
        'QPageSticky',
        'QPageScroller',
        'QDrawer',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QList',
        'QItem',
        'QItemSection',
        'QItemLabel',
        'QCard',
        'QCardSection',
        'QCardActions',
        'QImg',
        'QIcon',
        'QExpansionItem',
        'QField',
        'QSelect',
        'QInput',
        'QRadio',
        'QCheckbox',
        'QToggle',
        'QOptionGroup',
        'QTime',
        'QDate',
        'QBadge',
        'QCarousel',
        'QCarouselControl',
        'QCarouselSlide',
        'QChatMessage',
        'QDialog',
        'QMenu',
        'QPagination',
        'QSeparator',
        'QTable',
        'QTh',
        'QTr',
        'QTd',
        'QUploader',
        'QAvatar',
        'QScrollArea',
        'QFab',
        'QFabAction',
        'QTabs',
        'QTab',
        'QRouteTab',
        'QBadge',
        'QSpace',
        'QChatMessage',
        'QCarousel',
        'QCarouselControl',
        'QCarouselSlide',
        'QBtnGroup',
        'QBtnDropdown',
        'QForm',
        'QUploader'
      ],

      directives: [
        'Ripple',
        'ClosePopup'
      ],

      // Quasar plugins
      plugins: [
        'Notify',
        'LocalStorage',
        'SessionStorage',
        'Dialog',
        'AppFullscreen',
        'Loading'
      ],
      config: {
        notify: {
          position: 'right',
          timeout: 2000
        },
        cordova: {
          iosStatusBarPadding: true, // add the dynamic top padding on iOS mobile devices
          backButtonExit: false  // Quasar handles app exit on mobile phone back button
        }
      },
    },

    supportIE: true,

    build: {
      scopeHoisting: true,
      vueRouterMode: 'hash',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack(cfg) {
      },
      env: ctx.dev
        ? { // so on dev we'll have
          API: JSON.stringify('/api')
        }
        : { // and on build (production):
          API: JSON.stringify('http://11.12.1.164:8080')
        }
    },

    devServer: {
      // https: true,
      port: 9090,
      open: true,// opens browser window automatically
      proxy: {
        // proxy all requests starting with /api to jsonplaceholder
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    },

    animations: 'all', // --- includes all animations
    //animations: [],

    ssr: {
      pwa: false
    },

    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {}, // only for NON InjectManifest
      manifest: {
        // name: 'product review',
        // short_name: 'product review',
        // description: 'a product review app',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },

    cordova: {
      // id: 'beyond.product.review.app',
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    electron: {
      // bundler: 'builder', // or 'packager'

      extendWebpack(cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'pr_frontend'
      }
    }
  }
}
