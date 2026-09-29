
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "preload": [
      "chunk-JWKRIRDE.js",
      "chunk-EECNFWAX.js",
      "chunk-TWA2LKMR.js"
    ],
    "route": "/"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-VHXHJ3TG.js",
      "chunk-UALAI5OR.js",
      "chunk-TWA2LKMR.js"
    ],
    "route": "/contacto"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-Y2PFBATU.js",
      "chunk-TWA2LKMR.js"
    ],
    "route": "/nosotros"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-DTVJLJH5.js",
      "chunk-EECNFWAX.js",
      "chunk-TWA2LKMR.js"
    ],
    "route": "/casos"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-ZHYGSSX5.js",
      "chunk-QIKSPQQ6.js",
      "chunk-UALAI5OR.js",
      "chunk-EECNFWAX.js",
      "chunk-TWA2LKMR.js"
    ],
    "route": "/desarrollo-web"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-VFJ5MXGA.js",
      "chunk-QIKSPQQ6.js",
      "chunk-UALAI5OR.js",
      "chunk-EECNFWAX.js",
      "chunk-TWA2LKMR.js"
    ],
    "route": "/desarrollo-apps"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-PJVCYAUB.js",
      "chunk-QIKSPQQ6.js",
      "chunk-UALAI5OR.js",
      "chunk-EECNFWAX.js",
      "chunk-TWA2LKMR.js"
    ],
    "route": "/consultoria"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 11438, hash: '1d0a8f71a26da2088d7b78a8964b74682101a5f0eca1e9191ac41c066772f68a', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 3819, hash: '2189185e7ed59036922db9e380abe638a032b35c36c10fe3b265f2a3a23a129d', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 92241, hash: '3108e135f10d05a38d0c08094dede821903e01f623f1957a7bbccdfd3fbf3989', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'consultoria/index.html': {size: 187947, hash: '8db48623323805bcc3bc3e1f2a11416a0c0767b89bbe0b97e7f5778a3db183f5', text: () => import('./assets-chunks/consultoria_index_html.mjs').then(m => m.default)},
    'contacto/index.html': {size: 77817, hash: '8f1c11494f696cbe456f42beac05726a17b1b6f39cf72d438c0a852b435f26d6', text: () => import('./assets-chunks/contacto_index_html.mjs').then(m => m.default)},
    'desarrollo-apps/index.html': {size: 166212, hash: '15d4014475a9b1d6b4a3ab0015e47909d272b8c16b69d4120402fbc6ad2af245', text: () => import('./assets-chunks/desarrollo-apps_index_html.mjs').then(m => m.default)},
    'nosotros/index.html': {size: 95295, hash: '4271209c55ded5778977dfc1c38d88c3ea69bbfc2cd082a67ce09b34529b93ba', text: () => import('./assets-chunks/nosotros_index_html.mjs').then(m => m.default)},
    'casos/index.html': {size: 87615, hash: '6d083e9f3ec137516ce1488516916d2c23bf34c4172e4032eae18a2800a8161a', text: () => import('./assets-chunks/casos_index_html.mjs').then(m => m.default)},
    'desarrollo-web/index.html': {size: 162778, hash: '95181de062f4e9ca880df40f7a2d7fccebc393e85b83ec864afda3ddd3a9b9f0', text: () => import('./assets-chunks/desarrollo-web_index_html.mjs').then(m => m.default)},
    'styles-KWP232CV.css': {size: 58192, hash: 'Y0e+WOfUIEA', text: () => import('./assets-chunks/styles-KWP232CV_css.mjs').then(m => m.default)}
  },
};
