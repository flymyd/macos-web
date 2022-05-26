<template>
  <div class="mac-desktop-container">
    <button @click="addInstance(1)">点击添加实例1</button>
<!--    <button @click="addInstance(2)">点击添加实例2</button>-->
    <keep-alive>
      <component v-for="item in componentInstances" :is="item.componentInstance"></component>
    </keep-alive>
  </div>
</template>

<script setup lang="ts">

import {defineAsyncComponent, markRaw, reactive} from "vue";

const componentInstances = reactive({} as any)
const addInstance = (type: number) => {
  componentInstances[`TestApplication${type}`] = {
    name: `测试应用${type}`,
    componentInstance: markRaw(defineAsyncComponent(() =>
      import(/* @vite-ignore */`/src/apps/TestApplication${type}/index.vue`)
    ))
  };
}
</script>

<style scoped lang="scss">
button {
  background: white;
  margin-right: 20px;
}

.mac-desktop-container {
  background: transparent;
  //border: solid 1px red;
  height: 100%;
}
</style>
