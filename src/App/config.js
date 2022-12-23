export const GET_SERVER_URL = () => {
    const apiUrl = process.env.NODE_ENV === 'production' ? 'https://actuarit-service.azurewebsites.net': 'http://localhost:7000/interest';

    return apiUrl;
} 