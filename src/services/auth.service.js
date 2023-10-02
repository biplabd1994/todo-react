import api from "../config/authApi.config";

export const getAuthUserService = async () => {
	try {
		const response = await api.get('/auth/get-auth-user');
		return response;
	} catch (error) {
        // console.log('error', error)
		return error?.response;
	}
};

export const logoutFromAllService = async () => {
	try {
		const response = await api.post('/auth/logout-all');
		return response;
	} catch (error) {
        // console.log('error', error)
		return error?.response;
	}
};
