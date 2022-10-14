import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const BaseURL = 'https://5bce-113-59-213-56.in.ngrok.io/api';

export const ImgURL = 'https://5bce-113-59-213-56.in.ngrok.io/images';

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

export const mediaHttp = axios.create({
  baseURL: BaseURL,
  headers: {
    'Content-Type': 'multipart/form-data',
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

mediaHttp.interceptors.request.use(async config => {
  let value = await AsyncStorage.getItem('app_user_token');
  value = value.replace(/['"]+/g, '');
  if (value !== null) {
    config.headers['Authorization'] = 'Bearer ' + value;
  }
  return config;
});
