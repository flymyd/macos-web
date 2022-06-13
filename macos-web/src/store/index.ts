import { defineStore } from 'pinia'
import { appDescriber, appInstance } from "@/declare/WindowServer";

export const useStore = defineStore('darwin-macos', {
  state: () => ({
    clickStatusBarItemIndex: -2,  //状态栏当前点击的按钮索引，-2为空，-1为Apple Logo，其它自定义
    showLaunchPad: false,
    activatedApp: '',
  }),
  getters: {},
  actions: {
    changeStatusBarItemIndex(index: number) {
      this.clickStatusBarItemIndex = index;
    },
    changeShowLaunchPad(flag: boolean) {
      this.showLaunchPad = flag;
    },
    changeActivatedApp(appName: string) {
      this.activatedApp = appName;
    }
  },
})

export const useAppStore = defineStore('WindowServer', {
  state: () => ({
    appDescribers: {} as any,  //App实例描述
  }),
  getters: {},
  actions: {
    // 新建一个App实例
    newApplication(appDescriber: appDescriber) {
      if (Object.keys(this.appDescribers).includes(appDescriber.appName)) {
        console.log("app is already opened!")
      } else {
        this.appDescribers[appDescriber.appName] = appDescriber;
        useStore().clickStatusBarItemIndex = -2;
      }
    },
    // 修改App的状态
    changeApplication(appName: string, props: string, value: any) {
      this.appDescribers[appName][props] = value;
    },
    // 移除一个App实例
    removeApplication(appDescriber: appDescriber) {
      delete this.appDescribers[appDescriber.appName];
      useStore().clickStatusBarItemIndex = -2;
    },
  },
})
