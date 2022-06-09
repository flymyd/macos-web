<template>
  <div class="mac-launchpad" @click.stop="hideLaunchPad">
    <div class="mac-launchpad-spotlight">
      <div class="mac-launchpad-spotlight-box" @click.stop="isClickSearch = true">
        <Icon icon="carbon:search" />
        <input :class="isClickSearch ? 'search-clicked' : ''" placeholder="搜索" v-model="searchKey" />
      </div>
    </div>
    <div class="mac-launchpad-btn-group">
      <template v-for="item in plists" :key="item.appName">
        <div class="mac-launchpad-btn" @click.stop="clickApp()" v-if="isShowApp(item.name)">
          <img :src="getAppAssetsFile(item.appName)" class="mac-launchpad-btn-icon" />
          <span class="mac-launchpad-btn-name">{{ item.name }}</span>
        </div>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts" name="LaunchPad">
import { useStore } from "@/store"
import { getAppAssetsFile } from "@/utils/getAssets.js";
import { onMounted, onUnmounted, ref } from "vue";
import { Icon } from '@iconify/vue';
import { plists } from "../../../../public/plist.js"
const windowStore = useStore();
const hideLaunchPad = () => {
  useStore().changeShowLaunchPad(false);
}
const clickApp = () => { console.log(plists) }
const getIcon = getAppAssetsFile;
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
    }
  };
})
onUnmounted(() => {
  document.onkeydown = null
})
</script>
<style lang="scss" scoped>
@import "@/assets/css/mac/LaunchPad.scss";
</style>