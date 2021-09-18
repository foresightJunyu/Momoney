<template>

  <Layout>
    <div>
      <div class="label">
        <div class="tags">
          <router-link class="item" v-for="tag in tags" :key="tag.id"
                       :to="`/labels/edit/${tag.id}`">
            <span>{{ tag.name }}</span>
            <Icon name="right"/>
          </router-link>

        </div>
        <div class="createTag-wrapper">
          <Button class="createTag" @click="createTag">新建标签</Button>
        </div>
      </div>
    </div>
  </Layout>


</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from "vue-property-decorator";
import tagListModel from "@/models/tagListModel";
import Button from "@/components/Button.vue";

tagListModel.fetch();
@Component({
  components: {Button}
})
export default class Labels extends Vue {
  tags = tagListModel.data;

  createTag(): void {
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

    .item {
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
  }

  //.createTag {
  //  background: #767676;
  //  color: white;
  //  border: none;
  //  border-radius: 4px;
  //  height: 40px;
  //  padding: 0 16px;
  //  &-wrapper {
  //    text-align: center;
  //    padding: 20px;
  //    margin-top: 44-16px;
  //  }
  //}
}



</style>