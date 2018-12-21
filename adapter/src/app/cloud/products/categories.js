const axios = require('axios');

const categories = (req, res) => {
    axios
        .get('http://demo6466156.mockable.io/mendies/products')
        .then(({ data }) => {
            res.success({ data });
        })
        .catch(err => {
            res.error(400, err.message);
        });
};

Parse.Cloud.define('categories', categories);
