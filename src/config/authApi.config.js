import axios from 'axios';
import { getAuthTokens } from '../libraries/auth';

// const [accessToken, refreshToken] = getAuthTokens();

// console.log('bb :>> ', accessToken);
const api = axios.create({
	baseURL: process.env.REACT_APP_API_URL + '/api',
	timeout: 15000,
	// headers: {
	// 	Authorization: 'Bearer ' + accessToken,
	// 	refreshtoken: refreshToken,
	// },
});

api.interceptors.request.use((config) => {
	// Add configurations here
	const accessToken = getAuthTokens();
	config.headers = {
		Authorization: 'Bearer ' + accessToken,
	};
	return config;
});

api.interceptors.response.use((res) => {
	// Add configurations here
	// console.log('res', res);
	// const accesstoken = res?.data?.meta?.accesstoken || '';
	// const refreshtoken = res?.data?.meta?.refreshtoken || '';

	// // console.log('accesstoken inceptor', accesstoken);
	// if (accesstoken && refreshtoken) {
	// 	setAuthTokens(accesstoken, refreshtoken);
	// }
	// if (res?.data?.status === 401) {
	// 	window.location.href = '/';
	// 	// console.log('accesstoken :>> ', accesstoken);
	// }
	return res;
},(error) => {
    if (error.response && error.response.status === 401) {
      // Handle 401 error (e.g., redirect to login page or refresh token)
    //   console.log('Unauthorized - Redirecting to login...');
      // Replace with your authentication logic
	  window.location.href = '/';
    }
	return error.response
    // return Promise.reject(error);
  });
export default api;
