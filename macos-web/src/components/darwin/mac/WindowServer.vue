<template>
  <div class="mac-desktop-container">
    <WindowFrameWork v-for="item in appInstances" :app-instances="item" :key="item.name">
        <template v-slot:header v-if="item.name">
          <span class="mac-desktop-app-title">{{ item.name }}</span>
        </template>
      </WindowFrameWork>
  </div>
</template>

<script setup lang="ts" name="WindowServer">

import { defineAsyncComponent, markRaw, reactive } from "vue";
import { appDescriber, appInstance } from "@/declare/WindowServer";
import { storeToRefs } from "pinia";
import { useAppStore } from "@/store";
import WindowFrameWork from "@/components/darwin/mac/WindowFrameWork.vue";

//监听pinia中的appDescribers以实现对app实例的操作。app实例均会挂载在此组件(WindowServer)下
const appStore = useAppStore();
const { appDescribers } = storeToRefs(appStore);
let appInstances = reactive({} as any);  //app实例组
/**
 * 在WindowServer中创建app实例
 * @param appDescriber
 */
const createInstance = (appDescriber: appDescriber) => {
  if (typeof appInstances[appDescriber.appName] == "undefined") {
    appInstances[appDescriber.appName] = {
      name: appDescriber.name,
      appName: appDescriber.appName,
      componentInstance: markRaw(defineAsyncComponent(() =>
        import(/* @vite-ignore */`../../../apps/${appDescriber.appName}/index.vue`)
      ))
    } as appInstance;
  } else {
    //修改activate状态
  }
}
/**
 * 在WindowServer中移除app实例
 * @param appName
 */
const removeInstance = (appName: string) => {
  delete appInstances[appName]
}
const setInstance = (appName: string, props: string, value: any) => {
  console.log(appName)
  console.log(appInstances[appName])
  if (typeof appInstances[appName][props] !== "undefined") {
    if (appInstances[appName][props] == value) {
      return false;
    } else {
      appInstances[appName][props] = value;
    }
  } else appInstances[appName][props] = value;
}
/**
 * pinia中app实例组修改的状态监听
 */
const appSubscribe = appStore.$onAction(
  ({
    name,
    store,
    args,
  }) => {
    switch (name) {
      case 'newApplication':
        if (args.length === 1) {
          createInstance(args[0] as appDescriber)
        }
        break;
      case 'changeApplication':
        if (args.length === 3) {
          setInstance(args[0], args[1], args[2])
        }
        break;
      case 'removeApplication':
        if (args.length === 1) {
          const toDelete = args[0] as appDescriber;
          removeInstance(toDelete.appName);
        }
        break;
    }
  }
)

</script>

<style scoped lang="scss">
button {
  background: white;
  margin-right: 20px;
}

.mac-desktop-container {
  background: transparent;
  height: 100%;
  width: 100vw;
}

.mac-desktop-app-title {
  color: white;
  overflow: hidden;
  white-space: nowrap;
}
</style>
