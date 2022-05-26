<template>
  <div class="mac-status-bar-container" @click="onClickBarItem(-2)">
    <div class="mac-status-bar flex flex-row items-center justify-between">
      <div class="flex flex-row items-center">
        <div :class="['mac-status-bar-item','mac-logo',clickStatusBarItemIndex===-1?'item-clicked':'']"
             ref="statusIcon"
             @mouseover="clickStatusBarItemIndex!==-2?onHoverBarItem(-1):''"
             @click.stop="onClickBarItem(-1)">
          
        </div>
        <div :class="['mac-status-bar-item',i===clickStatusBarItemIndex?'item-clicked':'']" v-for="(item,i) in barItems"
             :ref="'statusIcon'+i"
             @mouseover="clickStatusBarItemIndex!==-2?onHoverBarItem(i):''"
             @click.stop="onClickBarItem(i)">
          {{ item.name }}
        </div>
      </div>
      <div class="flex flex-row-reverse items-center">
        <div class="mac-status-bar-item">{{ nowClock }}</div>
        <img src="@/assets/img/siri-small.png"/>
        <img src="@/assets/img/wlan.png"/>
      </div>
    </div>
    <StatusMenu :menu-items="menuItems" :menu-offset="getMenuOffsetX"></StatusMenu>
  </div>
</template>
<script setup lang="ts">
import StatusMenu from './StatusMenu.vue'
import {computed, getCurrentInstance, markRaw, onMounted, PropType, reactive, readonly, ref, watchEffect} from "vue";
import {AppleMenuItems, BarItem} from "@/declare/StatusMenu";
import {useStore} from "@/store";
import {storeToRefs} from "pinia";

const props = defineProps({
  barItems: {
    type: Array as PropType<Array<BarItem>>,
    default: []
  }
})
const store = useStore();
const vm = getCurrentInstance();
const {clickStatusBarItemIndex} = storeToRefs(store)
const clickItemIndex = ref(-2);
const appleMenuItems = markRaw(AppleMenuItems);
const menuItems = ref([]);
const onClickBarItem = (index: number) => {
  if (clickItemIndex.value === index) {
    clickItemIndex.value = -2;
  } else {
    clickItemIndex.value = index;
  }
  useStore().changeStatusBarItemIndex(clickItemIndex.value)
};
const onHoverBarItem = (index: number) => {
  clickItemIndex.value = index;
  useStore().changeStatusBarItemIndex(clickItemIndex.value)
};
const getMenuOffsetX = computed(() => {
  let refDom;
  if (clickItemIndex.value === -2) {
    return {};
  } else if (clickItemIndex.value === -1) {
    refDom = vm!.refs.statusIcon;
  } else {
    const refs: any = vm!.refs
    refDom = refs[`statusIcon${clickItemIndex.value}`][0];
  }
  return {marginLeft: refDom.getBoundingClientRect().x + 'px'}
})
watchEffect(() => {
  const newVal = clickItemIndex.value;
  if (newVal === -1) {
    menuItems.value = appleMenuItems as any;
  } else if (newVal !== -2) {
    menuItems.value = props.barItems[newVal].items as any
  } else {
    menuItems.value = [];
  }
})
//系统时钟
const fixZero = (num: number) => {
  if (num < 10) {
    return '0' + num;
  } else return num;
}
const nowClock = ref('');
const refreshClock = () => {
  window.requestAnimationFrame(() => {
    const date = new Date();
    let month = date.getMonth() + 1;
    let day = "周" + "日一二三四五六".charAt(date.getDay());
    nowClock.value = `${month}月${date.getDate()}日 ${day} ${fixZero(date.getHours())}:${fixZero(date.getMinutes())}`
    refreshClock()
  })
}
onMounted(() => {
  refreshClock()
})
</script>


<style scoped lang="scss">
@import "../../../assets/css/mac/StatusBar";
</style>
