const axios = require('axios');

const categories = (req, res) => {
    axios
        .get('http://demo6466156.mockable.io/mendies/products')
        .then(({ data }) => res.success({ data }))
        .catch(({ message }) => res.error(400, message));
};

Parse.Cloud.define('categories', categories);
