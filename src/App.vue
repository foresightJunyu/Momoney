<template>
  <!--  <div id="app">-->
  <!--    <div id="nav">-->
  <!--      <router-link to="/">Home</router-link> |-->
  <!--      <router-link to="/about">About</router-link>-->
  <!--    </div>-->
  <!--    <router-view/>-->
  <!--  </div>-->

  <div id="app">
    <!--相当于容器container，让component能定位到这里来显示-->
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/helper.scss";

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  line-height: 1.5;
  font-family: $font-hei;
  font-size: 16px;
  background: #f5f5f5;
}
</style>
