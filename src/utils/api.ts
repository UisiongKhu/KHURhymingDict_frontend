const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('token');
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ... (token ? { 'Authorization': `Bearer ${token}` } : {}), // Include Authorization header if token exists
        ...options.headers,
    };
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if(response.status === 401 ){ // Unauthorized, token might be invalid or expired
        localStorage.removeItem('token');
    }

    return response;
};