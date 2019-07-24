import { service } from 'src/boot/axios'

export function getProdLogList(type, id) {
    return service({
        url: '/prodLogs/' + type + '/' + id,
        method: 'get',
    })
}