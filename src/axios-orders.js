import axios from 'axios';



const instance = axios.create({
	baseURL: 'https://react-burger-8b91a.firebaseio.com/'
});

instance.interceptors.response.use(config => {
    // Do something before request is sent
    console.log(config);
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

export default instance;