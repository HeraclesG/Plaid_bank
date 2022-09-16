import { userStore } from '../user/UserStore';
import { User } from '../user/User'
import { api, get, post, fileUpload } from './api';

export const signUp = async (data) => {
  return await post('v1/auth/register', data).then(
    function (response) {
      console.log(response.data.id);
      const loginResponse = {
        id: response.data.id,
        contactId: '',
        authToken: '',
        username: '',
        midvalue: '',
        midprice: '',
        cash_num: 1,
        permission: 0,
      };
      const user = User.fromJson(loginResponse, data.email);
      userStore.setUser(user);
      return 'success';
    })
    .catch(function (error) {
      // console.log(error.response.data.message);
      return error.response.data.message;
    });
}
export const loginApi = async (data) => {
  return await post('v1/auth/login', data).then(
    function (response) {
      console.log(response.data);
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      // console.log(api.defaults.headers);
      const loginResponse = {
        id: response.data.currentUser.id,
        contactId: '',
        authToken: response.data.token,
        username: response.data.currentUser.userName,
        midvalue: '',
        midprice: '',
        cash_num: true,
        permission: 2,
      };
      const user = User.fromJson(loginResponse, data.email);
      userStore.setUser(user);
      return 'success';
    })
    .catch(function (error) {
      // console.log(error.response.data.message);
      return error.response.data.message;
    });
}
export const uploadImageApi = async (data) => {
  return await fileUpload('v1/primetrust/upload_documents', data).then(
    function (response) {
      return 'success';
    })
    .catch(function (error) {
      console.log(error);
      return error.response.data.message;
    });
}
