<template>
  <div class="mac-launchpad" @click.stop="hideLaunchPad">
    <div class="mac-launchpad-spotlight">
      <div class="mac-launchpad-spotlight-box" @click.stop="isClickSearch = true">
        <Icon icon="carbon:search" />
        <input :class="isClickSearch ? 'search-clicked' : ''" placeholder="搜索" v-model="searchKey"
          ref="spotlightInput" />
      </div>
    </div>
    <div class="mac-launchpad-btn-group">
      <template v-for="item in plists" :key="item.appName">
        <div class="mac-launchpad-btn" @click.stop="clickApp(item)" v-if="isShowApp(item.name)">
          <img :src="getAppAssetsFile(item.appName)" class="mac-launchpad-btn-icon" />
          <span class="mac-launchpad-btn-name">{{ item.name }}</span>
        </div>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts" name="LaunchPad">
import { useAppStore, useStore } from "@/store"
import { getAppAssetsFile } from "@/utils/getAssets.js";
import { getCurrentInstance, onMounted, onUnmounted, ref } from "vue";
import { Icon } from '@iconify/vue';
import { plists } from "../../../../public/plist.js"
import { appDescriber } from "@/declare/WindowServer.js";
const windowStore = useStore();
const appStore = useAppStore();
const vm = getCurrentInstance();
const hideLaunchPad = () => {
  useStore().changeShowLaunchPad(false);
}
const clickApp = (item: appDescriber) => {
  appStore.newApplication(item);
  hideLaunchPad();
}
const isClickSearch = ref(false);
const searchKey = ref('');
const isShowApp = (name: string) => {
  return name.toLocaleLowerCase().indexOf(searchKey.value.toLocaleLowerCase()) !== -1;
}
onMounted(() => {
  document.onkeydown = function (event) {
    const e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.key == "Escape") {
      useStore().changeShowLaunchPad(false);
    } else if (e) {
      if (e.key.length === 1) {
        const vDom = vm!.refs.spotlightInput as HTMLDivElement;
        if (document.activeElement != vDom) {
          vDom.focus();
        }
      }
    }
  };
})
onUnmounted(() => {
  document.onkeydown = null;
})
</script>
<style lang="scss" scoped>
@import "@/assets/css/mac/LaunchPad.scss";
</style>