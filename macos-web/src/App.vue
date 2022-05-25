<template>
  <router-view></router-view>
</template>
<script setup lang="ts">
import {onMounted} from "vue";
import {useStore} from "@/store";

const store = useStore();
onMounted(() => {
  //劫持点击操作
  window.addEventListener("click", (e) => {
    //点击除状态栏按钮及选单外的区域，关闭状态栏选单
    store.$patch({
      clickStatusBarItemIndex: -2
    })
  })
  //全局劫持右键操作，需要用到右键菜单的地方监听@contextmenu
  window.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });
})
</script>
<style>
</style>
