import api from "../config/frontApi.config";

export const loginService = async (data) => {
	try {
		const response = await api.post('/login', data);
		return response;
	} catch (error) {
		return error.response;
	}
};