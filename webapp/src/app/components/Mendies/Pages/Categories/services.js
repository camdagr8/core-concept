import Parse from 'appdir/api';

const fetch = params => Parse.Cloud.run('categories', params);

export default {
    fetch,
};
