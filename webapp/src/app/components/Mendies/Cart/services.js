import Parse, { LiveQueryClient } from 'appdir/api';

export const load = params => Parse.Cloud.run('cart-load', params);
export const save = params => Parse.Cloud.run('cart-save', params);
export const subscribe = ({ cartID }) => {
    const query = new Parse.Query('Cart');
    query.equalTo('objectId', cartID);

    return LiveQueryClient.subscribe(query);
};

export default {
    load,
    save,
    subscribe,
};
