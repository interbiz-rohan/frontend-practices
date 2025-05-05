// Configuration object
const config = {
    api: {
        // These values should be replaced with environment variables in production
        accountId: 'personal636779409',
        apiKey: '2cfql3jpr8dqto9ark47j9gjjk',
        baseUrl: 'https://xecdapi.xe.com/v1'
    }
};

// Function to get API configuration
const getApiConfig = () => {
    return {
        accountId: config.api.accountId,
        baseUrl: config.api.baseUrl
    };
};

// Function to get headers with API key
const getApiHeaders = () => {
    return {
        'Authorization': `Basic ${btoa(config.api.accountId + ':' + config.api.apiKey)}`,
        'Content-Type': 'application/json'
    };
};

// Export the functions
window.getApiConfig = getApiConfig;
window.getApiHeaders = getApiHeaders; 