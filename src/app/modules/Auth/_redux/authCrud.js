import axios from "axios";

export const LOGIN_URL = "Security/login";
export const REGISTER_URL = "user/register";
export const REQUEST_PASSWORD_URL = "auth/forgot-password";
export const REQUEST_VERIFYCODE_URL = "Security/LoginRequest";

export const ME_URL = "user/current";

// export function login(email, password) {
//   return axios.post(LOGIN_URL, { username:email, password: password });
// }

export function login(mobileNo, verifyCode) {
  return axios.post(LOGIN_URL, {
    MobileNumber: mobileNo,
    ActiveCode: verifyCode,
  });
}

export function loginWithPassword(mobileNo, verifyCode) {
  return axios.post(LOGIN_URL, { Username: mobileNo, Password: verifyCode });
}

export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, { email, fullname, username, password });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function requestVerfyCode(mobileNo) {
  return axios.post(REQUEST_VERIFYCODE_URL, { MobileNumber: mobileNo });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}
