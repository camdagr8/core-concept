const assert = require('assert');

/**
 * Reads application configuration variables
 */
const boot = {
    get environment() {
        const file = environmentFile();
        const env = require(file);
        return Object.assign(env, process.env);
    }
};

function environmentFile() {
    const envFile = process.env.ACTINIUM_ENV_FILE;
    const envId = process.env.ACTINIUM_ENV_ID;
    if (envFile) {
        validateReactorEnvFile(envFile);
        return envFile;
    }
    else if (envId) {
        validateReactorEnvId(envId);
        return `${__dirname}/env.${envId}.json`;
    }
    else {
        return `${__dirname}/env.json`;
    }
}

function validateReactorEnvId(value) {
    const pattern = /^[A-Za-z0-9_-]+$/;
    assert(pattern.test(value), 'invalid value for ACTINIUM_ENV_ID');
}

function validateReactorEnvFile(value) {
    const pattern = /\.json$/;
    assert(pattern.test(value), 'invalid value for ACTINIUM_ENV_FILE');
}

module.exports = boot;
