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

const version = window.localStorage.getItem('version') || '0';
const recordList: Record[] = JSON.parse(window.localStorage.getItem('recordList') || '[]');
if (version === '0.0.1') {
  // 数据库升级，也叫数据迁移
  recordList.forEach(record => {
    record.createAt = new Date(2021, 1, 1);
  });
  // 保存数据
  window.localStorage.setItem('recordList', JSON.stringify(recordList));
}
window.localStorage.setItem('version', '0.0.2');

type Record = {
  tags: string[]
  notes: string
  type: string
  amount: number // 数据类型 object | string
  createAt?: Date // 类 / 构造函数（这是比类型更小的一个分类）
}

@Component({
  components: {Tags, Notes, Types, NumberPad},
})

export default class Money extends Vue {
  tags = ['衣', '食', '住', '行'];
  recordList: Record[] = recordList;
  record: Record = {
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
    const deepClone: Record = JSON.parse(JSON.stringify(this.record));
    deepClone.createAt = new Date();
    this.recordList.push(deepClone);
    // 上面这出了一个bug，这样写 this.recordList.push(this.record);
    // this.record 只是一个引用，而没有复制出一个新的，所以提交多少次都是一样的数据在localstorage里面
  }

  @Watch('recordList')
  onRecordListChange() {
    window.localStorage.setItem('recordList', JSON.stringify(this.recordList));

  }
}
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
