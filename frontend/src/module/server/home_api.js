import { userStore } from '../user/UserStore';
import { User } from '../user/User'
import { api, get, post, fileUpload } from './api';

export const fundBalanceApi = async () => {
  return await post('v1/primetrust/get_fund_balance', {}).then(
    function (response) {
      return {
        value: response.data.data[0].attributes.disbursable,
        message: true
      };
    })
    .catch(function (error) {
      console.log(error);
      return {
        value: error.response.data.message,
        message: false
      };
    });
}

export const depositFundApi = async (data) => {
  return await post('v1/primetrust/deposit_fund', data).then(
    function (response) {
      console.log(response.data);
      const loginResponse = {
        ...userStore.user,
        midprice: data.amount,
      }
      const user = User.fromJson(loginResponse, loginResponse.email);
      userStore.setUser(user);
      return {
        // value: response.data.attributes.disbursable,
        message: true
      };
    })
    .catch(function (error) {
      console.log(error);
      return {
        value: error.response.data.message.split(',')[0],
        message: false
      };
    });
}
export const searchUserApi = async (data) => {
  return await post('v1/user/searchUser', data).then(
    function (response) {
      return {
        value: response.data,
        message: true
      };
    })
    .catch(function (error) {
      console.log(error);
      return {
        value: error.response.data.message,
        message: false
      };
    });
}
export const transferFundApi = async (data) => {
  return await post('v1/primetrust/transfer_fund', data).then(
    function (response) {
      return {
        message: true
      };
    })
    .catch(function (error) {
      console.log(error);
      return {
        value: error.response.data.message,
        message: false
      };
    });
}

export const getAssetBalanceApi = async () => {
  return await post('v1/primetrust/get_asset_balance', {}).then(
    function (response) {
      console.log(response.data);
      return {
        message: true
      };
    })
    .catch(function (error) {
      console.log(error);
      return {
        value: error.response.data.message,
        message: false
      };
    });
}
export const fundSHistoryApi = async () => {
  return await post('v1/primetrust/fund_simple_transaction_history', {}).then(
    function (response) {
      console.log(response.data);
      return {
        value: response.data,
        message: true
      };
    })
    .catch(function (error) {
      console.log(error);
      return {
        value: error.response.data.message,
        message: false
      };
    });
}
export const fundHistoryApi = async () => {
  return await post('v1/primetrust/fund_transaction_history', {}).then(
    function (response) {
      console.log(response.data);
      return {
        value: response.data,
        message: true
      };
    })
    .catch(function (error) {
      console.log(error);
      return {
        value: error.response.data.message,
        message: false
      };
    });
}