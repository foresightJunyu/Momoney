import clone from "@/lib/clone";
const localStorageKeyName = 'recordList';
const recordListModel = {
    data: [] as RecordItem[],
    create(record:RecordItem){
        const deepClone: RecordItem = clone(record);
        deepClone.createAt = new Date();
        this.data.push(deepClone);
        // 上面这之前出了一个bug，这样写 this.recordList.push(this.record);
        // this.record 只是一个引用，而没有复制出一个新的，所以提交多少次都是一样的数据在localstorage里面
    },
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem('localStorageKeyName') || '[]') as RecordItem[];
        return this.data;
    },
    save() {
        window.localStorage.setItem('localStorageKeyName', JSON.stringify(this.data));
    }
};

export default recordListModel;
/* 用默认导出，在 Money.vue 里就使用 const model = require('@/model.js').model 导入*/
// 因为直接 import 是不能在 .js 到 .ts 的