import { service } from 'src/boot/axios'

//product
export function getProductList(searchForm) {
    return service({
        url: '/products',
        method: 'post',
        data: searchForm
    })
}
// export function getProdCodeById(id) {
//     return service({
//         url: '/prodCode/id/' + id,
//         method: 'get',
//     })
// }
// export function addProdCode(product, thirdFlag) {
//     return service({
//         url: '/prodCode/' + thirdFlag,
//         method: 'post',
//         data: product
//     })
// }
// export function updateProdCode(product, thirdFlag) {
//     return service({
//         url: '/prodCode/' + thirdFlag,
//         method: 'put',
//         data: product
//     })
// }
// export function switchBind(oldId, newId, codeId) {
//     return service({
//         url: '/prodCodes/styleId/' + oldId + '/' + newId + '/' + codeId,
//         method: 'put',
//     })
// }


// //productStyle
// export function getProdStyleList(searchForm) {
//     return service({
//         url: '/prodStyles',
//         method: 'post',
//         data: searchForm
//     })
// }
// export function getProdStyleOptions(productStyle) {
//     return service({
//         url: '/prodStyles/options',
//         method: 'post',
//         data: productStyle
//     })
// }
// export function getProdStyleById(id) {
//     return service({
//         url: '/prodStyle/id/' + id,
//         method: 'get',
//     })
// }
// export function addProdStyle(productStyle) {
//     return service({
//         url: '/prodStyle',
//         method: 'post',
//         data: productStyle
//     })
// }
// export function updateProdStyle(productStyle) {
//     return service({
//         url: '/prodStyle',
//         method: 'put',
//         data: productStyle
//     })
// }
// export function deleteProdStyle(id) {
//     return service({
//         url: '/prodStyle/' + id,
//         method: 'delete',
//     })
// }
// //记数
// export function codeCount() {
//     return service({
//         url: '/prodCode/count',
//         method: 'get',
//     })
// }
// export function styleCount() {
//     return service({
//         url: '/prodStyle/count',
//         method: 'get',
//     })
// }










