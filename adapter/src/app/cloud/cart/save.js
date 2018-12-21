const save = (req, res) => {
    const { cartID, data } = req.params;

    const obj = new Parse.Object('Cart');
    if (cartID) {
        obj.set('objectId', cartID);
    }
    obj.set('state', data);
    obj.save()
        .then(result => res.success(result.toJSON()))
        .catch(error => res.error(400, error.message));
};

Parse.Cloud.define('cart-save', save);
