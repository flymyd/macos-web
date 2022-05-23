<template>
  <div class="mb-welcome antialiased flex flex-row justify-center items-center font-bold">
    <div class="mb-welcome-title-box">
      <span>Hey ya</span>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.mb-welcome {
  background-color: #0c1120;
  color: #293017;
  height: 100vh;
  width: 100vw;
}

.mb-welcome-title-box {
  width: 200px;
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  span {
    font-size: 60px;
    -webkit-text-fill-color: transparent;
  }
}

</style>
