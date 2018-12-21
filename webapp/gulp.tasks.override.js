'use strict';
const run = require('gulp-run');

module.exports = tasks => {
    // const env = process.env.NODE_ENV || 'development';

    const newTasks = {
        local: done => {
            let watch = new run.Command(
                'cross-env SSR_MODE=off NODE_ENV=development REST_API_URL="http://localhost:9000/api" PARSE_APP_ID="Actinium" gulp',
                { verbosity: 3 },
            );
            let babel = new run.Command(
                'cross-env SSR_MODE=off NODE_ENV=development DEBUG=off REST_API_URL="http://localhost:9000/api" PARSE_APP_ID="Actinium" nodemon ./.core/index.js --exec babel-node',
                { verbosity: 0 },
            );

            watch.exec();
            babel.exec();
            done();
        },
    };

    return { ...tasks, ...newTasks };
};
