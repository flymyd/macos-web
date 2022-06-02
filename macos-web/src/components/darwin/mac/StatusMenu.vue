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
import {useAppStore, useStore} from "@/store";
import {storeToRefs} from "pinia";
import {AppDescriber} from "@/factory/AppStore";

const props = defineProps({
  menuItems: {
    type: Array as PropType<Array<MenuItem>>,
    required: true
  },
  menuOffset: {
    // type: Object as PropType<MenuOffsetStyle>,
    type: Object,
    default: {
      marginTop: 0
    }
  }
})
const store = useStore();
const appStore = useAppStore();
const {clickStatusBarItemIndex} = storeToRefs(store)
const doAction = (item: MenuItem) => {
  console.log(item)
  const app1 = new AppDescriber('TestApplication1', '测试应用1')
  const app2 = new AppDescriber('TestApplication2', '测试应用2', '测试标题2')
  if (item.action == 114) {
    appStore.newApplication(app1);
  } else if (item.action == 514) {
    appStore.newApplication(app2)
    // appStore.changeApplication("TestApplication1","name","田所")
  } else {
    appStore.removeApplication(app2)
  }

}
</script>

<style scoped lang="scss">
@import "../../../assets/css/mac/StatusBar";
</style>

