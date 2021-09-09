<template>
  <div class="nav">
    <!--在vue提供的router-link中就能够实现类似于a标签的功能，点哪去哪-->
    <router-link to="/money">
      <Icon name="money"/>
      记账
    </router-link>
    |
    <router-link to="/labels">
      <Icon name="label"/>
      标签
    </router-link>
    |
    <router-link to="/statistics">
      <Icon name="statistics"/>
      统计
    </router-link>
  </div>
</template>

<script lang="ts">


import Icon from "@/components/Icon.vue";

export default {
  name: "Nav",
  components: {Icon}
}
</script>

<style lang="scss" scoped>
.nav {
  border: 1px solid red;
}
</style>