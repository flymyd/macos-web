<template>
  <div class="mac-dock-container flex flex-row justify-center">
    <div class="mac-dock flex flex-row justify-center items-center">
      <div class="mac-dock-item-container flex flex-col items-center"
        :style="{ animationPlayState: i === leftClickItem ? 'running' : 'paused' }" v-for="(item, i) in dockItems"
        :key="i" @mouseover="onHoverDock(i)" @mouseout="onHoverDock(-1)" @click="onLeftClick(i)"
        @contextmenu="onRightClick(i)">
        <div class="mac-dock-bubble" v-if="i === hoverItem">{{ item.name }}</div>
        <img :src="item.icon">
        <span v-if="item.isOpen === true">•</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Dock">
import { useStore } from "@/store";
import { reactive, ref } from "vue";
import { AppDescriber } from "../../../factory/AppStore";
const hoverItem = ref(-1);
const leftClickItem = ref(-1);
const windowStore = useStore();
const dockItems = reactive([
  { name: '访达', icon: '/img/finder.png', action: '' },
  {
    name: '启动台', icon: '/img/appstore.png', action: () => {
      windowStore.changeShowLaunchPad(true);
    }, showDot: false
  },
  { name: 'App Store', icon: '/img/appstore.png', action: '' },
  { name: 'iMessage信息', icon: '/img/message.png', action: '' },
  { name: 'Siri', icon: '/img/siri-big.png', action: '' },
]) as any;
const onHoverDock = (i: number) => {
  hoverItem.value = i;
}
const onLeftClick = (i: number) => {
  leftClickItem.value = i;
  if (dockItems[i].hasOwnProperty('showDot')) {
    if (dockItems[i].showDot === false) {
      dockItems[i].isOpen = false;
    } else dockItems[i].isOpen = true;
  } else dockItems[i].isOpen = true;
  if (dockItems[i].hasOwnProperty('action')) {
    if (typeof dockItems[i].action === "function") {
      dockItems[i].action();
    }
  }
}
const onRightClick = (i: number) => {
  console.log(i)
}
</script>

<style scoped lang="scss">
@import "src/assets/css/mac/Dock";
</style>
