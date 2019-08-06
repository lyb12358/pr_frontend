export const SetToken = (state, token) => {
  state.token = token
}
export const SetPermissions = (state, permissions) => {
  state.permissions = permissions
}
export const SetCheckCodePermission = (state, checkCodePermission) => {
  state.checkCodePermission = checkCodePermission
}
export const SetUpdateCodePermission = (state, updateCodePermission) => {
  state.updateCodePermission = updateCodePermission
}
export const SetCheckStylePermission = (state, checkStylePermission) => {
  state.checkStylePermission = checkStylePermission
}
export const SetUpdateStylePermission = (state, updateStylePermission) => {
  state.updateStylePermission = updateStylePermission
}
export const SetMaintainProductPermission = (state, maintainProductPermission) => {
  state.maintainProductPermission = maintainProductPermission
}
export const SetUserInfo = (state, userInfo) => {
  state.userInfo = userInfo
}
export const SetRp = (state, rp) => {
  state.rp = rp
}
export const SetRs = (state, rs) => {
  state.rs = rs
}
export const AddCompareProdList = (state, prod) => {
  for (let i = 0; i < state.compareProdList.length; i++) {
    if (state.compareProdList[i].id == prod.id) {
      return
    }
  }
  state.compareProdList.push(prod)
}
export const ReduceCompareProdList = (state, id) => {
  for (let i = 0; i < state.compareProdList.length; i++) {
    if (state.compareProdList[i].id == id) {
      state.compareProdList.splice(i, 1)
    }
  }

}