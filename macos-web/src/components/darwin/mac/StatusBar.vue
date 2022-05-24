<template>
  <div class="mac-status-bar-container">
    <div class="mac-status-bar flex flex-row items-center justify-between">
      <div class="flex flex-row items-center">
        <div :class="['mac-status-bar-item','mac-logo',clickItemIndex===-1?'item-clicked':'']" @click="onClickBarItem(-1)">
          
        </div>
        <div :class="['mac-status-bar-item',i===clickItemIndex?'item-clicked':'']" v-for="(item,i) in barItems"
             @click="onClickBarItem(i)">
          {{ item.name }}
        </div>
      </div>
      <div class="flex flex-row-reverse items-center">
        <div class="mac-status-bar-item">5月24日 周二 15:45</div>
        <img src="@/assets/img/siri-small.png" />
        <img src="@/assets/img/wlan.png" />
      </div>
    </div>
    <div class="flex flex-col mac-status-bar-menu" v-if="clickItemIndex!==-2">
      <span>关于本机</span>
      <div class="mac-status-bar-menu-divider"></div>
      <span>系统偏好设置</span>
      <span>App Store...</span>
      <div class="mac-status-bar-menu-divider"></div>
      <div class="flex flex-row justify-between">
        <span>最近使用的项目</span>
        <span style="font-weight: 600;margin-right: 5px;">></span>
      </div>
      <div class="mac-status-bar-menu-divider"></div>
      <span>睡眠</span>
      <span>重新启动...</span>
      <span>关机...</span>
      <div class="mac-status-bar-menu-divider"></div>
      <span>锁定屏幕</span>
      <span>退出登录"田所浩二"...</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "statusBar",
  props: {
    barItems: {
      type: Array,
      default: []
    }
  },
  data: () => ({
    clickItemIndex: -2,
  }),
  methods: {
    onClickBarItem(index) {
      this.clickItemIndex = index;
    },
  }
}
</script>


<style scoped lang="scss">
@import "../../../assets/css/mac/StatusBar";
</style>
