import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api', // this is my url of mongodb
});

export default instance;  // yrh bhar nikal liya 

