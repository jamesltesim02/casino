import Vue from 'vue'
import VueTouch from 'vue-touch'
import Vue2Toast from 'vue2-toast'
import 'vue2-toast/lib/toast.css'

import simpleDateFormat from '@/utils/simpleDateFormat'

import RestREM from './plugins/ResetREM'
import AppInitial from './plugins/AppInitial'

import App from './App.vue'
import router from './router'

import './assets/styles/reset.css'
import './assets/styles/common.less'
import './registerServiceWorker'

Vue.config.productionTip = false

// App 初始化动作
Vue.use(AppInitial)
// 初始化REM值插件
Vue.use(RestREM)
// vue-touch 触摸事件
Vue.use(VueTouch, { name: 'v-touch' })
// vue-toast 弹窗
Vue.use(Vue2Toast, {
  type: 'center',
  duration: 3000,
  wordWrap: true
})

// 时间日期格式化
Vue.filter('dateFormat', (source, pattern) => simpleDateFormat(source, pattern))

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
