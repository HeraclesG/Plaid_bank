import {LOGIN,SETSORT,TRANSDETAIL,FUNDSTRANSFER,SUCCESSMONEY,LOGOUT,SETTRANSFER,TRANSFERFUNDING, TRANSFERFASSERT, REGISTER} from '../constant';
export const login = (data) => {
  return {
    type: LOGIN,
    payload:data
  };
};
 
export const setsort = (sort) => {
  return {
    type: SETSORT,
    payload:{cash_num:sort},
  };
};
export const fundstransfer = (data) => {
  return {
    type: FUNDSTRANSFER,
    payload:data,
  };
};

export const successmoney = (data) => {
  return {
    type: SUCCESSMONEY,
    payload:data,
  };
};

export const transferfunding = (data) => {
  return {
    type: TRANSFERFUNDING,
    payload:data,
  };
};

export const transferasset = (data) => {
  return {
    type: TRANSFERFASSERT,
    payload:data,
  };
};

export const settransfer = (data) => {
  return {
    type: SETTRANSFER,
    payload:data,
  };
};
export const logout = (data) => {
  return {
    type: LOGOUT,
    payload:data,
  };
};

export const transdetail = (data) => {
  return {
    type: TRANSDETAIL,
    payload:data,
  };
};

export const signup = (data) => {
  return {
    type: REGISTER,
    payload:data,
  };
};
