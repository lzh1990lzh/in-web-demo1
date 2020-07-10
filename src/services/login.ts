import request from '@/utils/request';

export interface LoginParamsType {
  userNumber: string;
  userPassword: string;
  
}
//inspectgetway/login
export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/inspect-getway/login', {
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
