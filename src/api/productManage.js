import { service } from 'src/boot/axios'

//product
export function getProductList(searchForm) {
    return service({
        url: '/products',
        method: 'post',
        data: searchForm
    })
}
//获取单个产品
export function getProductById(id) {
    return service({
        url: '/product/' + id,
        method: 'get'
    })
}
//获取评审会产品
export function getProductByReviewSeasonId(id) {
    return service({
        url: '/product/reviewSeasonId/' + id,
        method: 'get'
    })
}
//添加/修改产品
export function addProduct(product) {
    return service({
        url: '/product',
        method: 'post',
        data: product
    })
}
//options
export function getPriceZoneOptions() {
    return service({
        url: '/priceZones/options',
        method: 'get'
    })
}
export function getPriceZoneList() {
    return service({
        url: '/priceZones',
        method: 'get'
    })
}
export function getMiddleTypeOptions() {
    return service({
        url: '/middleTypes/options',
        method: 'get'
    })
}
export function getMiddleTypeList() {
    return service({
        url: '/middleTypes',
        method: 'get'
    })
}
export function getSpeOptions() {
    return service({
        url: '/spes/options',
        method: 'get'
    })
}
export function getSpeList() {
    return service({
        url: '/spes',
        method: 'get'
    })
}
//param
export function addPriceZone(xx) {
    return service({
        url: '/priceZone',
        method: 'post',
        data: xx
    })
}
export function addMiddleType(xx) {
    return service({
        url: '/middleType',
        method: 'post',
        data: xx
    })
}
export function addSpe(xx) {
    return service({
        url: '/spe',
        method: 'post',
        data: xx
    })
}
export function getPriceZoneById(id) {
    return service({
        url: '/priceZone/' + id,
        method: 'get'
    })
}
export function getMiddleTypeById(id) {
    return service({
        url: '/middleType/' + id,
        method: 'get'
    })
}
export function getSpeById(id) {
    return service({
        url: '/spe/' + id,
        method: 'get'
    })
}











