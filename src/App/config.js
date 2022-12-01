export const GET_SERVER_URL = () => {
    const apiUrl = process.env.NODE_ENV === 'production' ? 'https://actuarit-server.azurewebsites.net': 'http://localhost:7000';

    return apiUrl;
} 