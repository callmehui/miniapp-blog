import Vue from 'vue'
import App from './App'
import Tools from '@/common/js/tools.js' // 引入自定义的全局函数

Vue.use(Tools)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
