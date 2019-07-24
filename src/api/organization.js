import { service } from 'src/boot/axios'

export function getOrgList() {
    return service({
        url: '/orgs',
        method: 'get'
    })
}