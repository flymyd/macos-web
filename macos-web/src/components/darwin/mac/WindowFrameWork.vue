<template>
  <Vue3DraggableResizable
    :initW="110"
    :initH="120"
    v-model:x="x"
    v-model:y="y"
    v-model:w="w"
    v-model:h="h"
    v-model:active="active"
    :draggable="true"
    :resizable="true"
    @activated="print('activated')"
    @deactivated="print('deactivated')"
    @drag-start="print('drag-start')"
    @resize-start="print('resize-start')"
    @dragging="print('dragging')"
    @resizing="print('resizing')"
    @drag-end="print('drag-end')"
    @resize-end="print('resize-end')"
  >
    <div class="mac-window-frame">
      <div class="mac-window-frame-bar">
        <div class="mac-window-frame-btn-group">
          <button class="mac-window-frame-btn-close">
            <span>x</span>
          </button>
          <button class="mac-window-frame-btn-min">
            <span>-</span>
          </button>
          <button class="mac-window-frame-btn-max">
            <span>+</span>
          </button>
        </div>
        <slot name="header"></slot>
      </div>
      <div class="mac-window-frame-container">
        <slot name="main"></slot>
      </div>
    </div>
  </Vue3DraggableResizable>
</template>

<script setup lang="ts" name="WindowFrameWork">
import Vue3DraggableResizable from 'vue3-draggable-resizable'
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
import {ref} from "vue";

const x = ref(100)
const y = ref(100)
const h = ref(100)
const w = ref(100)
const active = ref(false)
const print = (val: any) => {
  console.log(val)
}

</script>

<style scoped lang="scss">
.mac-window-frame {
  @apply flex flex-col;
  border: solid 2px rgba(70, 72, 75, 0.7);
  border-radius: 5px;
  background-color: #1e1e1e;
  width: fit-content;

  .mac-window-frame-bar {
    @apply flex flex-row items-center;
    height: 45px;
    background-color: #37343b;

    .mac-window-frame-btn-group {
      @apply flex flex-row items-center;
      margin-left: 20px;

      button {
        cursor: default;
        user-select: none;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background-color: #4f4953;
        margin-right: 6px;

        span {
          font-size: 16px;
          font-weight: 400;
          margin-top: -3px;
        }
      }

      .mac-window-frame-btn-close {
        @apply flex flex-row justify-center items-center;
        background-color: #ec6a5e;

        &:hover {

        }
      }

      .mac-window-frame-btn-min {
        @apply flex flex-row justify-center items-center;
        background-color: #f4bf4e;

        &:hover {

        }
      }

      .mac-window-frame-btn-max {
        @apply flex flex-row justify-center items-center;
        background-color: #5fc151;

        &:hover {

        }
      }
    }
  }

  .mac-window-frame-container {
    width: 100%;
    height: fit-content;
  }
}
</style>
