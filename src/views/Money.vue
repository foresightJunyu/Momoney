<template>
  <div>
    <Layout class-prefix="layout">
      <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
      <Types :value.sync="record.type"/>
      <div class="notes">
        <FormItem
            field-name="备注"
            placeholder="请输入备注"
            @update:value="onUpdateNotes"/>
      </div>
      <Tags :data-source.sync="tags"
            @update:value="onUpdateTags"/>
      {{ recordList }}
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import Tags from "@/components/Money/Tags.vue";
import FormItem from "@/components/Money/FormItem.vue";
import {Component, Watch} from 'vue-property-decorator';
import recordListModel from "@/models/recordListModel";
import tagListModel from "@/models/tagListModel";

// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const {model} = require('@/model.js');
// const recordList: Record[] = model.fetch();

const recordList = recordListModel.fetch();

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
  components: {Tags, FormItem, Types, NumberPad},
})

export default class Money extends Vue {
  tags = window.tagList;
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
    return recordListModel.create(this.record);
  }

  @Watch('recordList')
  onRecordListChange() {
    recordListModel.save();
  }
}
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.notes {
  padding: 12px 0;
}
</style>
