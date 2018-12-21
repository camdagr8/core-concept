const apiConfig = {};

if (typeof window !== 'undefined') {
    apiConfig['parseAppId'] = window.parseAppId;
    apiConfig['restAPI'] = window.restAPI;
} else {
    apiConfig['parseAppId'] = process.env.PARSE_APP_ID || 'Actinium';
    apiConfig['restAPI'] = process.env.REST_API_URL || '/api';
}

export default apiConfig;
