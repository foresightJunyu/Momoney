<template>
  <div class="tags">
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in dataSource" :key="tag"
          :class="selectedTags.indexOf(tag) >= 0 && 'selected'"
          @click="toggle(tag)"
      >{{ tag }}
      </li>

    </ul>
  </div>


</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from "vue-property-decorator";
import tagListModel from "@/models/tagListModel";

tagListModel.fetch();

@Component
export default class Tags extends Vue {
  @Prop() readonly dataSource: string[] | undefined;
  selectedTags: string[] = [];

  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit('update:value', this.selectedTags);
  }

  // create() {
  //   const name = window.prompt('请输入新标签名');
  //   if (name === '') {
  //     window.alert('标签名不能为空');
  //   } else {
  //     // if (this.dataSource) {
  //     //   this.dataSource.push(name!); // 不能直接去改外部数据！！！
  //     // }
  //     if (this.dataSource) {
  //       this.$emit('update:dataSource', [...this.dataSource, name]);
  //     }
  //     // 如果触发了这个事件，那就把这个更新的赋值给之前的dataSource，在Money.vue里加入了.sync语法糖才可以触发
  //   }
  // }
  create() {
    const name = window.prompt('请输入标签名');
    if (name) {
      const message = tagListModel.create(name);
      if (message === 'duplicated') {
        window.alert('重复标签名');
      } else if (message === 'success') {
        window.alert('添加成功');
      }
    }
    if (this.dataSource) {
      this.$emit('update:dataSource', [...this.dataSource, name]);
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  font-size: 14px;
  padding: 16px;
  background: white;
  > .current {
    display: flex;
    flex-wrap: wrap;
    overflow: auto;

    > li {
      $bg: #d8d9d9;
      background: $bg;
      $h: 24px;
      height: $h;
      line-height: $h;
      border-radius: $h/2;
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 4px;

      &.selected {
        background: darken($bg, 25%);
        color: white;
      }
    }
  }

  > .new {
    padding-top: 16px;

    button {
      background: transparent;
      border: none;
      border-bottom: 1px solid;
      color: #999999;
      padding: 0 3px;
    }
  }
}

</style>