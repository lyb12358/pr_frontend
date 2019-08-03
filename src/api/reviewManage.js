import { service } from 'src/boot/axios'


export function getReviewSeasonList(searchForm) {
    return service({
        url: '/reviewSeasons',
        method: 'post',
        data: searchForm
    })
}

