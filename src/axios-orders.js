import axios from 'axios';

axios.create({
	baseURL: 'https://react-burger-8b91a.firebaseio.com/'
});

export default instance;