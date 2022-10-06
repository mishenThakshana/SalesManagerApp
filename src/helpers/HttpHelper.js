import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const BaseURL = 'https://9916-113-59-209-102.ap.ngrok.io/api';

export const http = axios.create({
  baseURL: BaseURL,
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
});

export const protectedHttp = axios.create({
  baseURL: BaseURL,
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
});

protectedHttp.interceptors.request.use(async config => {
  let value = await AsyncStorage.getItem('app_user_token');
  value = value.replace(/['"]+/g, '');
  if (value !== null) {
    config.headers['Authorization'] = 'Bearer ' + value;
  }
  return config;
});
