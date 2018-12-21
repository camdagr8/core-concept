import apiConfig from './config';

// Isomorphic Parse
let Parse = null;
let liveQueryClient = null;

if (typeof window !== 'undefined') {
    Parse = require('parse');
} else {
    Parse = require('parse/node');
}
if (Parse) {
    Parse.initialize(apiConfig.parseAppId);
    Parse.serverURL = apiConfig.restAPI;

    const liveQueryServerURL = `ws://${window.location.hostname}:9000${
        apiConfig.restAPI
    }`;

    liveQueryClient = new Parse.LiveQueryClient({
        applicationId: apiConfig.parseAppId,
        serverURL: liveQueryServerURL,
    });

    liveQueryClient.open();
}

export default Parse;
export const LiveQueryClient = liveQueryClient;
