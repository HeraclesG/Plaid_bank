import { api, get, post, fileUpload } from './api';
import { successmoney, transferfunding,transferasset } from '../../redux/actions/user';

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

export const depositFundApi = async (data,dispatch) => {
  return await post('v1/primetrust/deposit_fund', data).then(
    function (response) {
      console.log(response.data);
      dispatch(successmoney({
        midprice: data.amount,
      }));
      return {
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
export const transferFundApi = async (data,dispatch) => {
  return await post('v1/primetrust/transfer_fund', data).then(
    function (response) {
      dispatch(transferfunding({
        midprice: data.amount,
      }));
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
export const transferAssetApi = async (data) => {
  return await post('v1/primetrust/transfer_asset', data).then(
    function (response) {
      dispatch(transferasset({
        midprice: data.amount,
      }));
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
      let val = 0;
      if (response.data.data.length != 0) {
        val = response.data.data[0].attributes.disbursable;
      }
      return {
        message: true,
        value: val,
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

export const depositAssetApi = async () => {
  return await post('v1/primetrust/deposit_asset', {}).then(
    function (response) {
      console.log(response.data);
      return {
        value: response.data.address,
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
export const tranSHistoryApi = async () => {
  return await post('v1/primetrust/asset_simple_transaction_history', {}).then(
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
export const tranHistoryApi = async () => {
  return await post('v1/primetrust/asset_transaction_history', {}).then(
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