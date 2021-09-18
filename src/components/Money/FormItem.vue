<template>
  <div class="formItem-wrapper">
    <label class="formItem">
      <span class="name">{{ this.fieldName }}</span>
      <input type="text"
             v-model="value"
             :placeholder="this.placeholder">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from "vue-property-decorator";


@Component
export default class FormItem extends Vue {
  @Prop({default: ''}) value!:string

  @Prop({required: true}) fieldName!: string;
  @Prop() placeholder?: string;

  @Watch('value')
  onChildChanged(val: string, oldVal: string) {
    this.$emit('update:value', val);
  }
}
</script>

<style lang="scss" scoped>

.formItem {
  font-size: 14px;
  display: block;
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