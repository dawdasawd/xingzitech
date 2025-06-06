import http from '../common/request.js'

export function login(data) {
  return http({
    url: '/login',
    method: 'post',
    data
  })
}

export function getUserInfo() {
  return http({
    url: '/getUserInfo',
    method: 'post',
  })
}
