/*
* 用户相关请求模块
* */
import request from '../utils/request'

export const login = (data) => {
  return request({
    method:'POST',
    url:'/v1_0/authorizations',
    data
  })
}

/*
* 发送验证码
* */
export const sendSms = (mobile) => {
  return request({
    method:'get',
    url:`/v1_0/sms/codes/${mobile}`,
  })
}

/*
* my组件获取用户信息
* */
export const getMyMessage = () => {
  return request({
    method:'get',
    url:`/v1_0/user`,
  })
}

/**
 * 获取用户频道列表
 */
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}

/*
* 获取所有频道列表
* */
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}

/*
* 关注用户 , data 为用户id target:id
* */
export const FollowUser = (data) =>{
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data
  })
}

/*
* 取消关注
* */
export const notFollowUSer = (id) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${id}`,
  })
}
