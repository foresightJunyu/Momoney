type RecordItem = {
    tags: string[]
    notes: string
    type: string
    amount: number // 数据类型 object | string
    createAt?: Date // 类 / 构造函数（这是比类型更小的一个分类）

}
type Tag = {
    id: string
    name: string
}
type TagListModel = {
    data: Tag[]
    fetch: () => Tag[]
    update: (id: string, name: string) => 'success' | 'not_found' | 'duplicated'
    create: (name: string) => 'success' | 'duplicated' // 联合类型
    save: () => void
    remove: (id: string) => boolean
}

interface Window {
    tagList: Tag[]
}