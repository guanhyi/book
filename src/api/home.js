import request from '@/utils/request'

// 生产环境api路径

// export function getData (data) {
//   return request({
//     data: data,
//     url: '/api/manage/countinfo',
//     method: 'post'
//   })
// }

// 开发环境api路径

export function getData (data) {
  return request({
    data: data,
    url: 'api/api/manage/countinfo',
    method: 'post'
  })
}
