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
  background-image: url("//mydblog.obs.cn-east-3.myhuaweicloud.com/mojave.jpg");
  background-size: 100% 100%;
}
</style>
