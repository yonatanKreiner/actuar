export const GET_SERVER_URL = () => {
    const azureBackendURL = 'https://actuarit-service.azurewebsites.net'
    const railwayBackendURL = 'https://actuar-services-production.up.railway.app'
    const apiUrl = process.env.NODE_ENV === 'production' ? railwayBackendURL : 'http://localhost:7000/interest';

    return apiUrl;
} 