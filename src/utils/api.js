//export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3333/api'
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (isLocalhost
	? 'http://localhost:3333/api'
	: 'https://ruprecht-backend.onrender.com/api');