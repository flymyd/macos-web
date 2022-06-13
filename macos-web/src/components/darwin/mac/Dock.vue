<template>
  <div class="mac-dock-container flex flex-row justify-center">
    <div class="mac-dock flex flex-row justify-center items-center">
      <div class="mac-dock-item-container flex flex-col items-center"
        :style="{ animationPlayState: i === leftClickItem ? 'running' : 'paused' }" v-for="(item, i) in dockItems.items"
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
import { AppDescriber } from "@/factory/AppStore";
import { useAppStore, useStore } from "@/store";
import { getAppAssetsFile } from "@/utils/getAssets";
import { reactive, ref } from "vue";
const hoverItem = ref(-1);
const leftClickItem = ref(-1);
const windowStore = useStore();
const defaultDockItems = [
  { name: '访达', icon: '/img/finder.png', action: '' },
  {
    name: '启动台', icon: '/img/launchpad.png', action: () => {
      windowStore.changeShowLaunchPad(true);
    }, showDot: false
  },
  // { name: 'App Store', icon: '/img/appstore.png', action: '' },
  // { name: 'iMessage信息', icon: '/img/message.png', action: '' },
  // { name: 'Siri', icon: '/img/siri-big.png', action: '' },
];
const dockItems = reactive({ items: [...defaultDockItems] }) as any;
const appStore = useAppStore();
appStore.$subscribe((mutation, state) => {
  let dockApps = [...defaultDockItems] as any;
  Object.keys(state.appDescribers).forEach(k => {
    const appDes = state.appDescribers[k];
    dockApps.push({
      name: appDes.name,
      appName: appDes.appName,
      icon: getAppAssetsFile(appDes.appName),
      action: '',
      isOpen: true
    })
  })
  dockItems.items = [...dockApps]
})
const onHoverDock = (i: number) => {
  hoverItem.value = i;
}
const onLeftClick = (i: number) => {
  const item = dockItems.items[i];
  leftClickItem.value = i;
  if (item.hasOwnProperty('showDot')) {
    if (item.showDot === false) {
      item.isOpen = false;
    } else item.isOpen = true;
  } else item.isOpen = true;
  if (item.hasOwnProperty('action')) {
    if (typeof item.action === "function") {
      item.action();
    } else {
      appStore.newApplication(new AppDescriber(item.appName, item.appName))
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
