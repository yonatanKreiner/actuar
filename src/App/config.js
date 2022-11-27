export const GET_SERVER_URL = () => {
    const apiUrl = process.env.NODE_ENV === 'production' ? '': 'http://localhost:7000';

    return apiUrl;
} 