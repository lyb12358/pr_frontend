import { service } from 'src/boot/axios'

// product_cat品类
// 获取商品品类列表(全部)
export function getProdCatOptions() {
    return service({
        url: '/prodCats/options',
        method: 'get'
    })
}
// 获取品类列表(对应大类)
export function getProdCatOptionsByParent(id) {
    return service({
        url: '/prodCats/CatType/' + id,
        method: 'get',
    })
}
export function getProdCatListByParent(id) {
    return service({
        url: '/prodCats/list/' + id,
        method: 'get',
    })
}
// 添加商品品类
export function addProdCat(prodCat) {
    return service({
        url: '/prodCat',
        method: 'post',
        data: prodCat
    })
}
// 修改商品品类
export function updateProdCat(prodCat) {
    return service({
        url: '/prodCat',
        method: 'put',
        data: prodCat
    })
}
// product_class类别
// 获取商品类别列表(全级别)
export function getProdClassOptions() {
    return service({
        url: '/prodClasses/options',
        method: 'get'
    })
}
// 获取商品类别树(全级别)
export function getProdClassTree() {
    return service({
        url: '/prodClasses/tree',
        method: 'get'
    })
}
// 获取商品类别树(到大类)
export function getProdClassTreeOnBigType() {
    return service({
        url: '/prodClasses/tree/bigType',
        method: 'get'
    })
}
// 获取商品类别(对应父类)
export function getProdClassOptionsByParent(id) {
    return service({
        url: '/prodClasses/ClassType/' + id,
        method: 'get',
    })
}
// 添加商品类别
export function addProdClass(prodClass) {
    return service({
        url: '/prodClass',
        method: 'post',
        data: prodClass
    })
}
// 修改商品类别
export function updateProdClass(prodClass) {
    return service({
        url: '/prodClass',
        method: 'put',
        data: prodClass
    })
}
// product_param参数
// 获取商品参数列表(全部)
export function getProdParamOptions() {
    return service({
        url: '/prodParams/options',
        method: 'get'
    })
}
// 获取商品参数树(全部)
export function getProdParamTree() {
    return service({
        url: '/prodParams/tree',
        method: 'get'
    })
}
// 获取商品参数(对应父类)
export function getProdParamOptionsByParent(id) {
    return service({
        url: '/prodParams/ParamType/' + id,
        method: 'get',
    })
}
export function getProdParamListByParent(id) {
    return service({
        url: '/prodParams/list/' + id,
        method: 'get',
    })
}
// 添加商品参数
export function addProdParam(prodParam) {
    return service({
        url: '/prodParam',
        method: 'post',
        data: prodParam
    })
}
// 修改商品参数
export function updateProdParam(prodParam) {
    return service({
        url: '/prodParam',
        method: 'put',
        data: prodParam
    })
}
// product_spe规格
// 获取商品规格列表(全部)
export function getProdSpeOptions() {
    return service({
        url: '/prodSpes/options',
        method: 'get'
    })
}
// 获取规格列表(对应大类)
export function getProdSpeOptionsByParent(id) {
    return service({
        url: '/prodSpes/speType/' + id,
        method: 'get',
    })
}
// 获取规格列表(对应大类)
export function getProdSpeListByParent(id) {
    return service({
        url: '/prodSpes/list/' + id,
        method: 'get',
    })
}
// 添加商品品类
export function addProdSpe(prodSpe) {
    return service({
        url: '/prodSpe',
        method: 'post',
        data: prodSpe
    })
}
// 修改商品品类
export function updateProdSpe(prodSpe) {
    return service({
        url: '/prodSpe',
        method: 'put',
        data: prodSpe
    })
}





