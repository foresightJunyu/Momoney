<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click="goBack"/>
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem :value="tag.name"
                @update:value="update($event)"
                field-name="编辑标签"
                placeholder="请输入标签名"/>
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>
  </Layout>

</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from "vue-property-decorator";
import tagListModel from "@/models/tagListModel";
import FormItem from "@/components/Money/FormItem.vue";
import Button from "@/components/Button.vue";

@Component({
  components: {Button, FormItem}
})
export default class EditLabel extends Vue {
  tag?: { id: string, name: string } = undefined;

  created() {
    const id = this.$route.params.id;
    tagListModel.fetch();
    const tags = tagListModel.data;
    const tag = tags.filter(t => t.id === id)[0];
    if (tag) {
      this.tag = tag;
    } else {
      this.$router.replace('/404');
    }
  }

  update(name: string) {
    if (this.tag) {
      tagListModel.update(this.tag.id, name);
    }
  }

  remove() {
    if (this.tag) {
      if (tagListModel.remove(this.tag.id)) {
        this.$router.back();
      } else {
        window.alert('删除失败');
      }
    }
  }

  goBack() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > .leftIcon {
    height: 20px;
    width: 20px;
  }

  > .rightIcon {
    height: 20px;
    width: 20px;

  }

  > .title {
  }

}

.form-wrapper {
  background: white;
  margin-top: 10px;
}

.button-wrapper {
  margin-top: 24px;
  display: flex;
  justify-content: center;
}
</style>