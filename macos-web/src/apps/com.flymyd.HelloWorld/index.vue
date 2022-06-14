<template>
  <div class="mac-app-container com-flymyd-HelloWorld" @click="refresh">

  </div>
</template>

<script lang="ts" setup name="com.flymyd.HelloWorld">
import { ref } from '@vue/reactivity';
const refresh: any = () => {
  (function(){
    console.log(114)
  })()
}
</script>

<style scoped lang="scss">
@import "@/assets/css/mac/AppDefault.scss";

.com-flymyd-HelloWorld {}
</style>
