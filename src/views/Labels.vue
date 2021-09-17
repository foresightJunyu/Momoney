<template>
  <div>
    <Layout>
      <div class="label">
        <ul class="tags">
          <li v-for="tag in tags" :key="tag">
            <span>{{ tag }}</span>
            <Icon name="right"/>
          </li>

        </ul>
        <div class="createTag-wrapper">
          <button class="createTag" @click="createTag">新建标签</button>
        </div>
      </div>
    </Layout>
  </div>

</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from "vue-property-decorator";
import tagListModel from "@/models/tagListModel";

tagListModel.fetch();

@Component
export default class Labels extends Vue {
  tags = tagListModel.data;

  createTag() {
    const name = window.prompt('请输入标签名');
    if (name) {
      const message = tagListModel.create(name);
      if (message === 'duplicated') {
        window.alert('重复标签名');
      } else if (message === 'success') {
        window.alert('添加成功');
      }
    }
  }
}

</script>

<style lang="scss" scoped>
.label {
  font-size: 16px;

  .tags {
    background: white;
    padding-left: 16px;

    > li {
      min-height: 44px;
      display: flex;
      align-items: center;
      flex-grow: 1;
      justify-content: space-between;
      border-bottom: 1px solid #e6e5e8;

      > svg {
        $h: 18px;
        width: $h;
        height: $h;
        color: #666;
        margin-right: 16px;
      }
    }

    .icon {
    }
  }

  .createTag-wrapper {
    // 按钮是内联元素，所以它的要加在它的父节点上，在外面的 div
    text-align: center;
    padding: 20px;
    margin-top: 44-16px;

    .createTag {
      background: #767676;
      color: white;
      border: none;
      border-radius: 4px;
      height: 40px;
      padding: 0 16px;
    }
  }
}

</style>