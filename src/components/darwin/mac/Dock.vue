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
import { DockItem } from "@/types/Dock";
import { AppDescriber } from "@/factory/AppStore";
import { useAppStore, useStore } from "@/store";
import { getAppAssetsFile } from "@/utils/getAssets";
import { storeToRefs } from "pinia";
import { computed, reactive, ref, watch } from "vue";
const hoverItem = ref(-1);
const leftClickItem = ref(-1);
const windowStore = useStore();
const dockItems: Array<DockItem> = reactive([
  { name: '访达', appName: '', icon: '/img/finder.png', action: 'none' },
  {
    name: '启动台', appName: 'launchpad', icon: '/img/launchpad.png', action: () => {
      windowStore.changeShowLaunchPad(true);
    }, showDot: false
  },
]);
const appStore = useAppStore();
const appKeys = computed(() => {
  return Object.keys(appStore.appDescribers)
})
watch(appKeys, (newVal, oldVal) => {
  let v1 = [] as any;
  let v2 = [] as any;
  if (newVal.length > oldVal.length) {
    v1 = newVal;
    v2 = oldVal;
  } else {
    v1 = oldVal;
    v2 = newVal;
  }
  let diffAppKeys = [...v1].filter(item => [...v2].every(i => i !== item));
  diffAppKeys.forEach(k => {
    const appDes = appStore.appDescribers[k]
    if (newVal.length > oldVal.length) {
      dockItems.push({
        name: appDes.name,
        appName: appDes.appName,
        icon: getAppAssetsFile(appDes.appName),
        action: '',
        isOpen: true,
        showDot: true
      })
    } else if (newVal.length < oldVal.length) {
      dockItems.forEach((dock, index) => {
        if (dock.appName == k) {
          dockItems.splice(index, 1)
        }
      })
    }
  })
})
const onHoverDock = (i: number) => {
  hoverItem.value = i;
}
const onLeftClick = (i: number) => {
  const item = dockItems[i];
  if (item.hasOwnProperty('showDot') && item.showDot && !item.isOpen) {
    item.isOpen = true;
    leftClickItem.value = i;
  }
  if (item.hasOwnProperty('action')) {
    if (typeof item.action === "function") {
      item.action();
    } else if (item.action != 'none') {
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
