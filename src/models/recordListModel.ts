const localStorageKeyName = 'recordList';
const recordListModel = {
    data: [] as RecordItem[],
    clone(data: RecordItem[] | RecordItem) {
        return JSON.parse(JSON.stringify(data));
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