<template>
  <svg class="icon">
    <use v-bind:xlink:href="'#'+name"/>
  </svg>
</template>

<script lang="ts">

// import svg1 from '@/assets/icons/money.svg'
// import svg2 from '@/assets/icons/label.svg'
// import svg3 from '@/assets/icons/statistics.svg'
//这个svg引入本来要报错的，在搜索了后发现是.ts的配置问题，在shims-vue.d.ts里加了4-6行代码就可以了
//并且我们需要的是svg 的使用，就要装svg-sprite-loader，先装，yarn add svg-sprite-loader -D
//是这个loader做的，这里有svg标签，所以我们在body里就能使用svg标签，第一步把这里的svg变成了一个symbol，然后把symbol放到svg里面

// console.log(svg1)
// console.log(svg2)
// console.log(svg3)

let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext)
//这里的报错：__WebpackModuleApi is not defined
//搜到方法：在.eslintrc.js > module.exports添加globals，成功提交代码。
//module.exports = {
// "globals":{
//   "__WebpackModuleApi":"writable"
// }
// }
//成功解决报错

try {
  importAll(require.context('../assets/icons', true, /\.svg$/))
} catch (error) {
  console.log(error)
}

// importAll(require.context('../assets/icons', true, /\.svg$/))


export default {
  props: ['name'],
  //接受一个name
  name: "Icon"
}
</script>

<style lang="scss" scoped>
.icon {
  width: 1em;
  height: 1em;
  // 正好就把 em 的单位用好了，不需要关注 icon 多大，放在字旁边和字差不多大就行了
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
// 执行git commit报错
// 'lint-staged' 不是内部或外部命令，也不是可运行的程序或批处理文件。
// 运行 npm i -D lint-staged
