import { userStore } from '../user/UserStore';
import { User } from '../user/User'
import { api, get, post } from './api';

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
export const uploadImageApi = async (data) => {
  return await post('v1/primetrust/upload_documents', data).then(
    function (response) {
      return 'success';
    })
    .catch(function (error) {
      return error.response.data.message;
    });
}
