import { getStorageToken, setStorageToken, removeStorageToken } from 'src/utils/storageControl'
import { login, logout, getInfoByToken } from 'src/api/auth'

export function Login({ commit }, userInfo) {
  return new Promise((resolve, reject) => {
    login(userInfo).then(response => {
      const result = response.data
      setStorageToken(result.data)
      commit('SetToken', result.data)
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

export function GetInfo({ commit, state }) {
  return new Promise((resolve, reject) => {
    getInfoByToken(state.token).then(response => {
      const data = response.data.data
      commit('SetPermissions', data.permissions)
      commit('SetCheckCodePermission', data.checkCodePermission)
      commit('SetUpdateCodePermission', data.updateCodePermission)
      commit('SetCheckStylePermission', data.checkStylePermission)
      commit('SetUpdateStylePermission', data.updateStylePermission)
      commit('SetMaintainProductPermission', data.maintainProductPermission)
      commit('SetUserInfo', data)
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

//deprecated
export function Logout({ commit, state }) {
  return new Promise((resolve, reject) => {
    logout(state.token).then(() => {
      commit('SetToken', '')
      commit('SetPermissions', [])
      commit('SetCheckCodePermission', [])
      commit('SetUpdateCodePermission', [])
      commit('SetCheckStylePermission', [])
      commit('SetUpdateStylePermission', [])
      commit('SetMaintainProductPermission', [])
      commit('SetUserInfo', {})
      removeStorageToken()
      resolve()
    }).catch(error => {
      reject(error)
    })
  })
}

export function FedLogout({ commit }) {
  return new Promise(resolve => {
    commit('SetToken', '')
    commit('SetPermissions', [])
    commit('SetCheckCodePermission', [])
    commit('SetUpdateCodePermission', [])
    commit('SetCheckStylePermission', [])
    commit('SetUpdateStylePermission', [])
    commit('SetMaintainProductPermission', [])
    commit('SetUserInfo', {})
    removeStorageToken()
    resolve()
  })
}