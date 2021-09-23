<template>
  <div class="formItem-wrapper">
    <label class="formItem">
      <span class="name">{{ this.fieldName }}</span>
      <input type="text"
             :value="value"
             @input="onChildChanged($event.target.value)"
             :placeholder="placeholder">
    </label>
  </div>
</template>
<!--             v-model="value"-->

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from "vue-property-decorator";

@Component
export default class FormItem extends Vue {
  @Prop({default: ''}) readonly value!: string;

  @Prop({required: true}) fieldName!: string;
  @Prop() placeholder?: string;

  onChildChanged(val: string):void {
    this.$emit('update:value', val);
  }
}
</script>

<style lang="scss" scoped>

.formItem {
  font-size: 14px;
  padding-left: 16px;
  display: flex;
  align-items: center;

  .name {
    padding-right: 16px;
  }

  input {
    height: 40px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>