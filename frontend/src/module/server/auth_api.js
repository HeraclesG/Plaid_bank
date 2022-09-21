import { api, get, post, fileUpload } from './api';
import { login } from '../../redux/actions/user';
import { signup } from '../../redux/actions/user';

export const signUp = async (data,dispatch) => {
  return await post('v1/auth/register', data).then(
    function (response) {
      
      dispatch(signup({
        id: response.data.id,
      }))
      return 'success';
    })
    .catch(function (error) {
      return error.response.data.message;
    });
}
export const loginApi = async (data,dispatch) => {
  return await post('v1/auth/login', data).then(
    function (response) {
      console.log(response.data);
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      dispatch(login(
        {
          id: response.data.currentUser.id,
          accountId:response.data.currentUser.accountId,
          username: response.data.currentUser.userName,
          permission: 2,
          email:response.data.currentUser.email
        }
      ));
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
