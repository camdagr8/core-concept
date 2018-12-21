const path        = require('path');
const globby      = require('globby').sync;
const clouddir    = path.normalize(`${appdir}/cloud`);

// Load cloud functions
globby([`${clouddir}/**/*.js`]).forEach(item => {
    const p = path.relative(__dirname, path.normalize(`/${item}`));
    log('Cloud functions loading:', chalk.cyan(p));
    require(p);
});
