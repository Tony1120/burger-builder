import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://react-burger-8b91a.firebaseio.com/'
});

export default instance;