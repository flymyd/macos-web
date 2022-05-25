<template>
  <div v-if="clickStatusBarItemIndex!==-2&&menuItems.length>0"
       class="mac-status-bar-menu flex flex-col"
       :style="menuOffset">
    <template v-for="(menuItem,j) in menuItems">
      <div v-if="menuItem.type===0"
           class="mac-status-bar-menu-item"
           @click.stop="doAction(menuItem)">{{ menuItem.name }}
      </div>
      <div v-if="menuItem.type===1" class="mac-status-bar-menu-divider"></div>
      <div v-if="menuItem.type===2" class="flex flex-row justify-between mac-status-bar-menu-item">
        <span class="mac-status-bar-menu-has-sub">{{ menuItem.name }}</span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">


import {PropType} from "vue";
import {MenuItem, MenuOffsetStyle} from "@/declare/StatusMenu";
import {useStore} from "@/store";
import {storeToRefs} from "pinia";

const props = defineProps({
  menuItems: {
    type: Array as PropType<Array<MenuItem>>,
    required: true
  },
  menuOffset: {
    type: Object as PropType<MenuOffsetStyle>,
    default: {}
  }
})
const store = useStore();
const {clickStatusBarItemIndex} = storeToRefs(store)
const doAction = (item: MenuItem) => {
  console.log(item)
}
</script>

<style scoped lang="scss">
@import "../../../assets/css/mac/StatusBar";
</style>

