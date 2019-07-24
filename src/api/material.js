import { service } from 'src/boot/axios'

//material
export function getMatList(searchForm) {
    return service({
        url: '/mats',
        method: 'post',
        data: searchForm
    })
}
export function getMatById(id) {
    return service({
        url: '/mat/id/' + id,
        method: 'get',
    })
}
export function addMat(material) {
    return service({
        url: '/mat',
        method: 'post',
        data: material
    })
}
export function updateMat(material) {
    return service({
        url: '/mat',
        method: 'put',
        data: material
    })
}
//记数
export function matCount() {
    return service({
        url: '/mat/count',
        method: 'get',
    })
}










