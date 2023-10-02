// import Cookies from 'universal-cookie';
// const cookies = new Cookies();
// import { setCookie, getCookie, deleteCookie } from 'cookies-next';

export const setAuthTokens = (accessToken = null) => {
	
	localStorage.setItem('todo_access_token',accessToken)
	return true;
};

export const getAuthTokens = () => {
	return localStorage.getItem('todo_access_token');
};

export const deleteAuthTokens = () => {
	localStorage.removeItem('todo_access_token')
};
