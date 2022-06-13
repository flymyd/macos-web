<template>
  <div class="mac-container antialiased">
    <status-bar :bar-items="barItems"></status-bar>
    <WindowServer></WindowServer>
    <Dock></Dock>
    <LaunchPad v-if="showLaunchPad"></LaunchPad>
  </div>
</template>

<script setup lang="ts">
import StatusBar from "@/components/darwin/mac/StatusBar.vue";
import Dock from "@/components/darwin/mac/Dock.vue";
import WindowServer from "@/components/darwin/mac/WindowServer.vue";
import LaunchPad from "@/components/darwin/mac/LaunchPad.vue";
import { reactive, ref } from "vue";
import { BarItem } from "@/declare/StatusMenu";
import { useStore } from "@/store";
// const showLaunchPad = ref(true);
const barItems = reactive([
  {
    name: '访达', items: [
      { type: 0, name: '关于本机', action: '114' },
      { type: 1 }
    ]
  },
  { name: '文件', items: [] },
  { name: '编辑', items: [] },
  { name: '显示', items: [] },
  { name: '前往', items: [] },
  { name: '窗口', items: [] },
  { name: '帮助', items: [] },
]) as any
const windowStore = useStore();
const showLaunchPad = ref(windowStore.$state.showLaunchPad);
const windowSubscribe = windowStore.$onAction(
  ({
    name,
    store,
    args,
  }) => {
    if (name == 'changeShowLaunchPad') {
      showLaunchPad.value = args[0] as boolean;
    }
  }
)
</script>

<style scoped lang="scss">
.mac-container {
  background-image: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F84%2F82%2Fa3%2F8482a30fbca5c1a58f4cef30abe0348d.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655969175&t=6730bc5aee73f841fa5f3e98dae3bb74");
  //background-image: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F7c%2Fcb%2Fb8%2F7ccbb87d1a0848dafd952b2343a4da9c.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655968979&t=b2ded994344079e54d59d1aa57e6e15c");
  background-size: 100% 100%;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  z-index: 1;
}
</style>
