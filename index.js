#!/usr/bin/env node

'use strict';

// Imports
const path = require('path');
const chalk = require('chalk');
const moment = require('moment');
const nodemon = require('nodemon');
const { spawn } = require('child_process');
const ActionSequence = require('action-sequence');

let app;

const formatter = buffer => {
    let output = String(buffer.toString());

    if (output.indexOf('Access URLs') > -1) {
        return;
    }

    output = output.replace(/\n/, '');

    if (output.length < 12) {
        return;
    }

    const regex = /\[(\d+\:\d+\:\d+\.?)\]/;

    if (!regex.test(output)) {
        return;
    }

    const timestamp = `[${chalk.magenta(
        moment().format('HH:mm:ss'),
    )}] [${chalk.cyan('REACTIUM')}]`;
    output = output.replace(regex, timestamp);

    return output;
};

const actions = {
    adapter: () => {
        const timestamp = `\n\n\n\n\n[${chalk.magenta(
            moment().format('HH:mm:ss'),
        )}] [${chalk.cyan('CORE')}]`;

        console.log(timestamp, chalk.bgGreen('  Started  '));

        return new Promise(resolve => {
            const p = path.normalize('./adapter/src/index.js');

            nodemon({
                script: p,
            });

            nodemon.on('start', () => {
                resolve(' Adapter started!');
            });
        });
    },
    reactium: () => {
        const p = path.normalize(`${__dirname}/webapp/gulpfile.js`);
        app = spawn('gulp', ['local', '--gulpfile', p]);

        app.stdout.on('data', data => {
            const msg = formatter(data);
            if (msg) {
                console.log(msg);
            }
        });

        app.stderr.on('data', data => {
            const msg = formatter(data);
            if (msg) {
                console.log(msg);
            }
        });

        app.on('close', code => {
            console.log(
                `[${chalk.gray(moment().format('HH:mm:ss'))}]`,
                `[${chalk.cyan('REACTIUM')}]`,
                `Exited with code ${code}`,
            );
        });

        return Promise.resolve('  Reactium started!');
    },
    process: () => {
        process.on('SIGINT', () => {
            try {
                app.kill();
            } catch (err) {}

            const timestamp = `\n\n\n\n\n[${chalk.magenta(
                moment().format('HH:mm:ss'),
            )}] [${chalk.cyan('CORE')}]`;

            console.log(timestamp, chalk.bgRed('  Exited  '), '\n\n\n\n');
            process.exit(0);
        });

        return Promise.resolve('  Startup Complete!');
    },
};

ActionSequence({ actions })
    .then(success => {
        console.log('\n', success.join('\n'), '\n');
    })
    .catch(err => {
        console.log('\n', err.join('\n'), '\n');
        process.exit();
    });
