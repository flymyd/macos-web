<template>
  <div class="mac-launchpad" @click.stop="hideLaunchPad">
    <div class="mac-launchpad-spotlight">
      <div class="mac-launchpad-spotlight-box">
        🔍
        <input @click.stop="isClickSearch = true" :class="isClickSearch ? 'search-clicked' : ''" placeholder="搜索" />
      </div>
    </div>
    <div class="mac-launchpad-btn-group">
      <div class="mac-launchpad-btn" @click.stop="clickApp()" v-for="item in 15" :key="item">
        <div class="mac-launchpad-btn-icon"></div>
        <span class="mac-launchpad-btn-name">appName</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useStore } from "@/store"
import { ref } from "vue";

const windowStore = useStore();
const hideLaunchPad = () => {
  useStore().changeShowLaunchPad(false);
}
const isClickSearch = ref(false);
const clickApp = ()=>{}
</script>
<style lang="scss" scoped name="LaunchPad">
$btn-side: 10vw;
$btn-margin-right: 3vw;
$btn-box-padding: 100-(6*$btn-side)-(6*$btn-margin-right);

input {
  outline: none;
  background: none;
  width: 30%;
  padding-left: 0.5vw;
}

.search-clicked {
  animation: clickSearch 0.2s;
  width: 100%;
}

.mac-launchpad-spotlight {
  @apply flex flex-row justify-center items-center;
  height: 5vh;
  margin-bottom: 4vh;
  margin-top: 2vh;


  .mac-launchpad-spotlight-box {
    @apply flex flex-row justify-center items-center;
    padding-left: 1vw;
    width: 250px;
    height: 25px;
    background: rgba(85, 85, 85, 0.2);
    border: solid 1px rgba(153, 153, 153, 0.5);
    border-radius: 4px;
    color: #BBB;
  }
}

.mac-launchpad-btn-group {
  @apply flex flex-row flex-wrap;
  padding-left: calc($btn-box-padding/2)+$btn-margin-right;
  padding-right: calc($btn-box-padding/2)-$btn-margin-right;
  padding-top: 0vh;
  padding-bottom: 10vh;
  width: 100%;
  height: 100%;
}

.mac-launchpad-btn {
  @apply flex flex-col items-center;
  width: $btn-side;
  margin-right: $btn-margin-right;
}
.mac-launchpad-btn-icon {
  margin-bottom: 1vh;
  width: inherit;
  height: $btn-side;
  border-radius: 30px;
  background: #666;
}
.mac-launchpad-btn-name{
  color: white;
}

.mac-launchpad {
  z-index: 100;
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-image: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F84%2F82%2Fa3%2F8482a30fbca5c1a58f4cef30abe0348d.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655969175&t=6730bc5aee73f841fa5f3e98dae3bb74");
  background-size: 100% 100%;
  animation: blurFadeIn 0.2s ease-in backwards;
}

.mac-launchpad::before {
  content: '';
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-image: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F84%2F82%2Fa3%2F8482a30fbca5c1a58f4cef30abe0348d.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655969175&t=6730bc5aee73f841fa5f3e98dae3bb74");
  background-size: 100% 100%;
  filter: blur(7px);
  z-index: -1;
}

@keyframes blurFadeIn {
  0% {
    opacity: 0;
    transform: scale(1.3);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes clickSearch {
  0% {
    width: 50%;
  }

  100% {
    width: 100%;
  }
}
</style>