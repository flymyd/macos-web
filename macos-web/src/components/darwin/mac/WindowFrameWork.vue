<template>
  <Vue3DraggableResizable :initW="110" :initH="110" v-model:x="xCoor" v-model:y="yCoor" v-model:w="dragWidth"
    :parent="true" @drag-end="onDragEnd" v-model:h="dragHeight" v-model:active="active" :draggable="true"
    :class="active ? ['mac-window-activated'] : []" :resizable="true" @activated="switchActivated(true)"
    @deactivated="switchActivated(false)" @resizing="onResizing">
    <div class="mac-window-frame" :ref="appInstances.appName + 'Ref'">
      <div class="mac-window-frame-bar">
        <div class="mac-window-frame-btn-group">
          <button class="mac-window-frame-btn-close" @mousedown.stop="clickBar(0)">
            <span>x</span>
          </button>
          <button class="mac-window-frame-btn-min" @mousedown.stop="clickBar(1)">
            <span>-</span>
          </button>
          <button class="mac-window-frame-btn-max" @mousedown.stop="clickBar(2)">
            <span>+</span>
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
import { computed, getCurrentInstance, nextTick, onMounted, ref, VueElement, watchEffect } from "vue";
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
const xCoor = ref((document.documentElement.clientWidth / 2) * 0.8);
const yCoor = ref((document.documentElement.clientHeight / 2) * 0.8);
const dragWidth = ref(100);
const dragHeight = ref(100);
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
      }
    }, 500)
  })
})
const windowSizeHandle = computed(() => {
  if (windowWidth.value === 0 || windowHeight.value === 0) {
    return {}
  } else {
    return { width: windowWidth.value - 4 + 'px', height: windowHeight.value - 49 + 'px' }
  }
})
const onResizing = () => {
  windowWidth.value = dragWidth.value;
  windowHeight.value = dragHeight.value;
}
const clickBar = (action: number) => {
  if (action === 0) appStore.removeApplication(props.appInstances as any);
}
// const isOutOfSafeRange = ref(false);
// const cancelDragging = () => {
//   const ref = props.appInstances.appName + 'Ref';
//   const vDom = vm!.refs[ref] as HTMLDivElement;
//   let event = document.createEvent('MouseEvents')
//   event.initEvent('mouseup', true, true)
//   vDom.dispatchEvent(event)
// }
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
@import "@/assets/css/mac/WindowFrameWork.scss"
</style>
