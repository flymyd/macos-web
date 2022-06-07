<template>
  <div class="test1">
    <span style="background-color: blue" @click="test">1145141919</span>
  </div>
</template>

<script>
export default {
  name: "TestApplication1",
  methods:{
    test(){
      console.log(114)
    }
  }
}
</script>

<style scoped lang="scss">
.test1 {
  width: 200px;
  height: 200px;
  color: white;
  background-color: purple;
}
</style>
