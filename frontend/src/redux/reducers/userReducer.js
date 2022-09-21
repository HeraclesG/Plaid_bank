import { LOGIN,SETSORT,FUNDSTRANSFER,LOGOUT,SUCCESSMONEY,SETTRANSFER,TRANSFERFUNDING, TRANSFERFASSERT, REGISTER } from "../constant";

const initialState = {
  id:'',
  contactId:'',
  email:'',
  authToken:'',
  username:'',
  midvalue:'',
  midprice:0,
  cash_num:true,
  accountId:'',
  permission:0
};
 
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        ...action.payload
      };
    case SETSORT:
      return {
        ...state,
        ...action.payload
      };
    case FUNDSTRANSFER:
      return {
        ...state,
        ...action.payload
      };
    case SUCCESSMONEY:
      return {
        ...state,
        ...action.payload
      };
    case TRANSFERFUNDING:
      return {
        ...state,
        ...action.payload
      };
    case TRANSFERFASSERT:
      return {
        ...state,
        ...action.payload
      };
    case SETTRANSFER:
      return {
        ...state,
        ...action.payload
      };
    case LOGOUT:
      return {
        ...state,
      permission:0,
      };
    case REGISTER:
      return {
        ...state,
      permission:0,
      };
    default:
      return state;
  }
};