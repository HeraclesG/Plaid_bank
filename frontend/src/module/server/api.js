import { userStore } from '../module/user/UserStore';
import { PRIME_TRUST_URL, SERVER_URL } from '@env';
import axios from 'axios';


export const api=axios.create({
  baseURL:SERVER_URL
});

export const get=(url)=>api.get(url);
export const post=(url, data)=>api.get(url,data);
