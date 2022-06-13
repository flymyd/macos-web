<template>
  <div class="mac-app-container">
    <div class="test1">
      <span style="background-color: blue" @click="test">1145141919</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TestApplication1",
  methods: {
    test() {
      console.log(114)
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/css/mac/AppDefault.scss";

.test1 {
  width: 200px;
  height: 200px;
  color: white;
  /* background-color: purple; */
  background-image: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F84%2F82%2Fa3%2F8482a30fbca5c1a58f4cef30abe0348d.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655969175&t=6730bc5aee73f841fa5f3e98dae3bb74");
  background-size: 100% 100%;
}
</style>
