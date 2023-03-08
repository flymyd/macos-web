<template>
  <Vue3DraggableResizable :initW="initWidth" :initH="initHeight" v-model:x="xCoor" v-model:y="yCoor"
    v-model:w="dragWidth" :parent="true" @drag-end="onDragEnd" v-model:h="dragHeight" v-model:active="active"
    :draggable="draggable" :class="[active ? 'mac-window-activated' : '', isHidden ? 'mac-window-hide' : '']"
    :resizable="false" :handles="[]" @activated="switchActivated(true)" @deactivated="switchActivated(false)">
    <div class="mac-window-frame" :ref="appInstances.appName + 'Ref'">
      <div class="mac-window-frame-bar">
        <div class="mac-window-frame-btn-group">
          <button class="mac-window-frame-btn-close" @mousedown.stop="clickBar(0)">
            <Icon icon="ant-design:close-outlined" />
          </button>
          <button class="mac-window-frame-btn-min" @mousedown.stop="clickBar(1)">
            <Icon icon="ant-design:minus-outlined" />
          </button>
          <button class="mac-window-frame-btn-max" @mousedown.stop="clickBar(2)">
            <Icon icon="ant-design:arrows-alt-outlined" />
          </button>
        </div>
        <div class="flex flex-row justify-center" style="width: 70%;">
          <slot name="header"></slot>
        </div>
      </div>
      <div class="mac-window-frame-container" @mousedown.stop="onComponentClick">
        <component :is="appInstances.componentInstance" :style="windowSizeHandle"></component>
      </div>
    </div>
  </Vue3DraggableResizable>
</template>

<script setup lang="ts" name="WindowFrameWork">
import Vue3DraggableResizable from 'vue3-draggable-resizable'
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
import { Icon } from '@iconify/vue';
import { computed, getCurrentInstance, nextTick, onMounted, onUpdated, ref, VueElement, watchEffect } from "vue";
import { useAppStore, useStore } from '@/store';
import { storeToRefs } from 'pinia';
const appStore = useAppStore();
const windowStore = useStore();
const vm = getCurrentInstance();
const props = defineProps({
  appInstances: {
    required: true,
    type: Object
  }
})
const initWidth = window.innerWidth;
const initHeight = window.innerHeight;
const xCoor = ref((document.documentElement.clientWidth / 2) - Math.round(initWidth));
const yCoor = ref((document.documentElement.clientHeight / 2) - Math.round(initHeight));
const dragWidth = ref(initWidth);
const dragHeight = ref(initHeight);
const windowWidth = ref(0);
const windowHeight = ref(0);
watchEffect(() => {
  nextTick(() => {
    setTimeout(() => {
      if (props.appInstances.appName) {
        const ref = props.appInstances.appName + 'Ref';
        const vDom = vm!.refs[ref] as HTMLDivElement;
        const { height, width } = vDom.getBoundingClientRect();
        windowWidth.value = width;
        windowHeight.value = height;
        dragWidth.value = width;
        dragHeight.value = height;
        xCoor.value = (document.documentElement.clientWidth / 2) - width / 2;
        yCoor.value = (document.documentElement.clientHeight / 2) - height / 2;
      }
    }, 200)
  })
})
const windowSizeHandle = computed(() => {
  if (windowWidth.value === 0 || windowHeight.value === 0) {
    return {}
  } else {
    // return { width: windowWidth.value - 4 + 'px', height: windowHeight.value - 49 + 'px' }
    return { width: windowWidth.value + 'px', height: windowHeight.value - 49 + 'px' }
  }
})
const windowOriginInfo = { w: 0, h: 0, x: 0, y: 0 };
// const windowMaximumInfo = { w: window.innerWidth - 4, h: window.innerHeight - 86, x: 0, y: 27 };
const windowMaximumInfo = { w: window.innerWidth, h: window.innerHeight - 86, x: 0, y: 27 };
const draggable = ref(true);
const isHidden = ref(false);
const clickBar = (action: number) => {
  if (action === 0) appStore.removeApplication(props.appInstances as any);
  if (action === 1) isHidden.value = true;
  if (action === 2) {
    let { x, y, w, h } = windowMaximumInfo;
    if (windowWidth.value === w && windowHeight.value === h) {
      let { x, y, w, h } = windowOriginInfo;
      xCoor.value = x;
      yCoor.value = y;
      windowWidth.value = dragWidth.value = w;
      windowHeight.value = dragHeight.value = h;
      draggable.value = true;
    } else {
      windowOriginInfo.x = xCoor.value;
      windowOriginInfo.y = yCoor.value;
      windowOriginInfo.w = dragWidth.value;
      windowOriginInfo.h = dragHeight.value;
      xCoor.value = x;
      yCoor.value = y;
      windowWidth.value = dragWidth.value = w;
      windowHeight.value = dragHeight.value = h;
      draggable.value = false;
    }
  }
}
const onDragEnd = (e: any) => {
  if (e.y < 27) {
    yCoor.value = 27;
  }
}
//切换窗口激活状态
const { activatedApp } = storeToRefs(windowStore);
const isActive = computed(() => {
  if (props.appInstances.appName == activatedApp.value) {
    return true;
  } else return false;
})
const active = ref(true);
watchEffect(() => {
  active.value = isActive.value;
  if (active.value) {
    isHidden.value = false;
  }
})
const switchActivated = (e: any) => {
  if (e) {
    windowStore.changeActivatedApp(props.appInstances.appName);
  }
}
const onComponentClick = (e: any) => {
  windowStore.changeActivatedApp(props.appInstances.appName);
}
</script>

<style scoped lang="scss">
@import "@/assets/css/mac/WindowFrameWork.scss";
</style>
