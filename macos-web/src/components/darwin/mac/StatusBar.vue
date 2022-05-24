<template>
  <div class="mac-status-bar-container" @click="onClickBarItem(-2)">
    <div class="mac-status-bar flex flex-row items-center justify-between">
      <div class="flex flex-row items-center">
        <div :class="['mac-status-bar-item','mac-logo',clickItemIndex===-1?'item-clicked':'']"
             @click.stop="onClickBarItem(-1)">
          
        </div>
        <div :class="['mac-status-bar-item',i===clickItemIndex?'item-clicked':'']" v-for="(item,i) in barItems"
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
    <div class="flex flex-col mac-status-bar-menu" v-if="clickItemIndex!==-2">
      <template v-for="(menuItem,j) in menuItems">
        <span class="mac-status-bar-menu-item" v-if="menuItem.type===0" @click="doAction(menuItem)">{{
            menuItem.name
          }}</span>
        <div class="mac-status-bar-menu-divider" v-if="menuItem.type===1"></div>
        <div class="flex flex-row justify-between mac-status-bar-menu-item" v-if="menuItem.type===2">
          <span>{{ menuItem.name }}</span>
          <span class="mac-status-bar-menu-has-sub">></span>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
const fixZero = (num) => {
  if (parseInt(num) < 10) {
    return '0' + num;
  } else return num;
}
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
    nowClock: '',
    menuItems: [
      {type: 0, name: '关于本机', action: '114'},
      {type: 1},
      {type: 0, name: '系统偏好设置', action: '514'},
      {type: 0, name: 'App Store...', action: ''},
      {type: 1},
      {type: 2, name: '最近使用的项目', children: []},
      {type: 1},
      {type: 0, name: '睡眠', action: ''},
      {type: 0, name: '重新启动...', action: ''},
      {type: 0, name: '关机...', action: ''},
      {type: 1},
      {type: 0, name: '锁定屏幕', action: ''},
      {type: 0, name: '退出登录"田所浩二"...', action: ''},
    ]
  }),
  methods: {
    onClickBarItem(index) {
      this.clickItemIndex = index;
    },
    doAction(item) {
      console.log(item)
    },
    refreshClock() {
      window.requestAnimationFrame(() => {
        const date = new Date();
        let month = date.getMonth() + 1;
        let day = "周" + "日一二三四五六".charAt(date.getDay());
        this.nowClock = `${month}月${date.getDate()}日 ${day} ${fixZero(date.getHours())}:${fixZero(date.getMinutes())}`
        this.refreshClock()
      })
    }
  },
  mounted() {
    this.refreshClock()
  }
}
</script>


<style scoped lang="scss">
@import "../../../assets/css/mac/StatusBar";
</style>
