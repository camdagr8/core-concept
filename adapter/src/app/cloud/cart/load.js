const load = (req, res) => {
    const { cartID } = req.params;

    if (!cartID) {
        res.error(400, 'cart not found');
        return;
    }

    const obj = new Parse.Object('Cart');
    obj.set('objectId', cartID);
    obj.fetch()
        .then(result => res.success(result.toJSON()))
        .catch(error => res.error(400, error.message));
};

Parse.Cloud.define('cart-load', load);
