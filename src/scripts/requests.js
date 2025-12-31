import AsyncStorage from '@react-native-async-storage/async-storage';

async function apiRequest(endpoint, method = 'GET', data = null, headers = {}) {
	// const baseUrl = 'https://vakwetoweya-back.onrender.com';
	const baseUrl = 'http://192.168.18.5:2022';

	const token = await AsyncStorage.getItem('token');

	const config = {
		method,
		headers: {
			'Content-Type': 'application/json',
			...headers,
			'Authorization': token ? `Bearer ${token}` : ''
		},
	};

	if (data && method !== 'GET') {
		config.body = JSON.stringify(data);
	}

	try {
		const response = await fetch(`${baseUrl}${endpoint}`, config);
		const jsonResponse = await response.json();

		// Check for authentication errors
		if (!jsonResponse.success && jsonResponse.auth === true) {
			console.warn('Authentication expired or invalid (no handler)');
			return jsonResponse;
		}

		return jsonResponse;
	} catch (error) {
		console.error('Request error:', error);
		throw error;
	}
}

export default apiRequest;
