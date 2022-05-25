import {defineStore} from 'pinia'

export const useStore = defineStore('darwin-macos',{
  state: () => ({
    clickStatusBarItemIndex: -2,  //状态栏当前点击的按钮索引，-2为空，-1为Apple Logo，其它自定义
  }),
  getters: {},
  actions: {},
})
