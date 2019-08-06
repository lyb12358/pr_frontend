import { service } from 'src/boot/axios'


export function getReviewSeasonList(searchForm) {
    return service({
        url: '/reviewSeasons',
        method: 'post',
        data: searchForm
    })
}
//获取评审会
export function getReviewById(id) {
    return service({
        url: '/review/' + id,
        method: 'get'
    })
}
//添加/修改评审会
export function addReview(review) {
    return service({
        url: '/review',
        method: 'post',
        data: review
    })
}
//添加/修改评论
export function addResultComment(result) {
    return service({
        url: '/reviewResult/comment',
        method: 'post',
        data: result
    })
}
//options
export function getReviewOptions() {
    return service({
        url: '/reviews/options',
        method: 'get'
    })
}
//user result
export function getReviewResultByUserId(id) {
    return service({
        url: '/reviewResult/userId/' + id,
        method: 'get'
    })
}
export function getReviewResultByProdId(id) {
    return service({
        url: '/reviewResult/prodId/' + id,
        method: 'get'
    })
}
export function getReviewResultBySeasonId(id) {
    return service({
        url: '/reviewResult/seasonId/' + id,
        method: 'get'
    })
}
export function getReviewResultByUserIdAndProdId(id1, id2) {
    return service({
        url: '/reviewResult/userId/' + id1 + '/prodId/' + id2,
        method: 'get'
    })
}
export function getReviewResultBySeasonIdAndUserId(id1, id2) {
    return service({
        url: '/reviewResult/seasonId/' + id1 + '/userId/' + id2,
        method: 'get'
    })
}
export function getReviewResultBySeasonIdAndProdId(id1, id2) {
    return service({
        url: '/reviewResult/seasonId/' + id1 + '/prodId/' + id2,
        method: 'get'
    })
}
//添加修改评审结果
export function addReviewResult(list) {
    return service({
        url: '/reviewResults',
        method: 'post',
        data: list
    })
}
//获取用户评审会是否已评
export function getUserReviewStatus(id1, id2) {
    return service({
        url: '/reviewResult/isReview/seasonId/' + id1 + '/userId/' + id2,
        method: 'get'
    })
}

