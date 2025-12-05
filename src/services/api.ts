import axios from 'axios';

const api = axios.create({
  //'http://10.0.2.2:8080/api' Emulador Android
  baseURL: 'http://10.0.2.2:8080/api', 
});

export default api;