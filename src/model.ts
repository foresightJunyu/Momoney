const localStorageKeyName = 'recordList';
const model = {

    clone(data: RecordItem[] | RecordItem) {
        return JSON.parse(JSON.stringify(data));
    },
    fetch() {
        return JSON.parse(window.localStorage.getItem('localStorageKeyName') || '[]') as RecordItem[];
    },
    save(data: RecordItem[]) {
        window.localStorage.setItem('localStorageKeyName', JSON.stringify(data));
    }
};

export default model;
/* 用默认导出，在 Money.vue 里就使用 const model = require('@/model.js').model 导入*/
// 因为直接 import 是不能在 .js 到 .ts 的