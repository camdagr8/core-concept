//------------------------------------------------------------------------------
// index.js application init
//------------------------------------------------------------------------------

// Global vars
global.basedir = __dirname; // ref to this directory as root
global.env = require('./boot').environment;
global.appdir = basedir + '/app';
global._ = require('lodash');
global.moment = require('moment');
global.chalk = require('chalk');

global.log = (...args) => {
    if (env.LOG !== true && env.LOG !== 'true') {
        return;
    }
    let time = `[${chalk.magenta(moment().format('HH:mm:ss'))}]`;
    let name = `[${chalk.cyan(String(env.APP_NAME))}]`;
    console.log(time, name, ...args);
};

// Node modules
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const cors = require('cors');
const ParseDashboard = require('parse-dashboard');
const ParseServer = require('parse-server').ParseServer;
const morgan = require('morgan');
const path = require('path');

// Runtime configuration
const port = env.APP_PORT || env.PORT;

// Parse API setup
const apiConfig = {
    appId: env.APP_ID,
    sessionLength: 31536000000,
    appName: env.APP_NAME,
    masterKey: env.MASTER_KEY,
    databaseURI: env.DATABASE_URI,
    cloud: path.normalize(`${__dirname}/../.core/cloud.js`),
    publicServerURL: env.PUBLIC_SERVER_URI + env.PARSE_MOUNT,
    serverURL: env.SERVER_URI + env.PARSE_MOUNT,
    liveQuery: {
        classNames: env.PARSE_LQ_CLASS_NAMES,
    },
};
if (env.LOG === true || env.LOG === 'true') {
    log('Startup Environment');
    // Object.keys(env).map(key => log(key, env[key]));

    if (env.LOG_METHOD !== 'stdout') {
        apiConfig['loggerAdapter'] = {
            options: { logLevel: env.LOG_LEVEL || 'error' },
            module: 'parse-server/lib/Adapters/Logger/WinstonLoggerAdapter',
        };
    } else {
        apiConfig['loggerAdapter'] = {
            options: { logLevel: env.LOG_LEVEL || 'error' },
            module: appdir + '/lib/StdOutLoggerAdapter',
        };
    }
}
const api = new ParseServer(apiConfig);

// Express app setup
const app = express();

app.set('views', appdir + '/view');
app.set('view engine', 'ejs');
app.set('x-powered-by', false);

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    cookieSession({
        name: '4lqaOOlW1',
        keys: ['Q2FtZXJvbiBSdWxlcw', 'vT3GtyZKbnoNSdWxlcw'],
    }),
);
app.use(env.PARSE_MOUNT, api);

// Parse Dashboard setup
if (env.PARSE_DASHBOARD === true || env.PARSE_DASHBOARD === 'true') {
    let users =
        typeof env.PARSE_DASHBOARD_USERS === 'string'
            ? JSON.parse(env.PARSE_DASHBOARD_USERS)
            : env.PARSE_DASHBOARD_USERS;
    let dashboard = new ParseDashboard(
        {
            trustProxy: 1,
            users: users,
            apps: [
                {
                    appId: env.APP_ID,
                    appName: env.APP_NAME,
                    masterKey: env.MASTER_KEY,
                    serverURL: env.PUBLIC_SERVER_URI + env.PARSE_MOUNT,
                },
            ],
        },
        {
            allowInsecureHTTP:
                env.PARSE_DASHBOARD_ALLOW_INSECURE_HTTP === true ||
                env.PARSE_DASHBOARD_ALLOW_INSECURE_HTTP === 'true',
        },
    );

    app.use(env.PARSE_DASHBOARD_MOUNT, dashboard);
}

// Initialize a LiveQuery server instance, app is the express app of your Parse Server
const httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    log('Actinium running on port:', port);
});

ParseServer.createLiveQueryServer(httpServer);
