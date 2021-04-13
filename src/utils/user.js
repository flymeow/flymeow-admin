const TokenKey = 'token'
const userInfoKey = 'userInfo'
export function getToken() {
  return sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
  return sessionStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return sessionStorage.removeItem(TokenKey)
}

export function getUserInfo() {
  return sessionStorage.getItem(userInfoKey)
    ? JSON.parse(sessionStorage.getItem(userInfoKey))
    : ''
}

export function setUserInfo(userInfo) {
  const localInfo = JSON.stringify(userInfo)
  return sessionStorage.setItem(userInfoKey, localInfo)
}

export function removeUserInfo() {
  return sessionStorage.removeItem(userInfoKey)
}
