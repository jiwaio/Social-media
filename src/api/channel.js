/*
* 操作频道
* */
import request from '../utils/request'

/*
* 删除指定用户频道
* */
export const delMyChannel = (target) => {
  return request({
    method:'DELETE',
    url:`/v1_0/user/channels/${target}`
  })
}

/*
* 设置用户的频道（部分覆盖）
* */
export const addMyChannel = channel => {
  return request({
    method:'PATCH',
    url:`/v1_0/user/channels`,
    data:{
      channels:[channel]
    }
  })
}
