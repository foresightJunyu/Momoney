<template>
  <div>
    <Layout class-prefix="layout">
      <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
      <Types :value.sync="record.type"/>
      <Notes @update:value="onUpdateNotes"/>
      <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
      {{ recordList }}
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import Tags from "@/components/Money/Tags.vue";
import Notes from "@/components/Money/Notes.vue";
import {Component, Watch} from 'vue-property-decorator';
import recordListModel from "@/models/recordListModel";
import tagListModel from "@/models/tagListModel";

// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const {model} = require('@/model.js');
// const recordList: Record[] = model.fetch();

const recordList = recordListModel.fetch();
const tagList = tagListModel.fetch();

// 数据库版本
const version = window.localStorage.getItem('version') || '0';
if (version === '0.0.1') {
  // 数据库升级，也叫数据迁移
  recordList.forEach(record => {
    record.createAt = new Date(2021, 1, 1);
  });
  // 保存数据
  window.localStorage.setItem('recordList', JSON.stringify(recordList));
}
window.localStorage.setItem('version', '0.0.2');


@Component({
  components: {Tags, Notes, Types, NumberPad},
})

export default class Money extends Vue {
  tags = tagList;
  recordList: RecordItem[] = recordList;
  record: RecordItem = {
    tags: [], notes: '', type: '-', amount: 0
  };

  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }

  saveRecord() {
    const deepClone: RecordItem = recordListModel.clone(this.record);
    deepClone.createAt = new Date();
    this.recordList.push(deepClone);
    // 上面这出了一个bug，这样写 this.recordList.push(this.record);
    // this.record 只是一个引用，而没有复制出一个新的，所以提交多少次都是一样的数据在localstorage里面
  }

  @Watch('recordList')
  onRecordListChange() {
    recordListModel.save(this.recordList);
  }
}
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
