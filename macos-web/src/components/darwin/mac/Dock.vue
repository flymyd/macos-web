<template>
  <div class="mac-dock-container flex flex-row justify-center">
    <div class="mac-dock flex flex-row justify-center items-center">
      <div class="mac-dock-item-container flex flex-col items-center"
           :style="{animationPlayState: i===clickItem?'running':'paused'}"
           v-for="(item,i) in dockItems"
           @mouseover="onHoverDock(i)" @mouseout="onHoverDock(-1)" @click="clickDock(i)">
        <div class="mac-dock-bubble" v-if="i===hoverItem">{{ item.name }}</div>
        <img :src="item.icon">
        <span v-if="item.isOpen===true">•</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dock",
  data: () => ({
    hoverItem: -1,
    clickItem: -1,
    dockItems: [
      {name: '访达', icon: '../../src/assets/img/finder.png', action: ''},
      {name: 'App Store', icon: '../../src/assets/img/appstore.png', action: ''},
      {name: 'iMessage信息', icon: '../../src/assets/img/message.png', action: ''},
      {name: 'Siri', icon: '../../src/assets/img/siri-big.png', action: ''},
    ]
  }),
  methods: {
    onHoverDock(i) {
      this.hoverItem = i;
    },
    clickDock(i) {
      this.clickItem = i;
      this.dockItems[i].isOpen = true;
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/css/mac/Dock";
</style>
