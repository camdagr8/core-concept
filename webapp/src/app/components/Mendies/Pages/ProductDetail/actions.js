import deps from 'dependencies';
import op from 'object-path';

export default {
    mount: data => (dispatch, getState) => {
        dispatch(deps.actions.Cart.hide());

        const products = op.get(getState(), 'Categories.products') || [];

        if (products.length < 1) {
            data['fetching'] = true;
            dispatch(deps.actions.Categories.refresh());
        } else {
            data['products'] = products;
        }

        dispatch({
            type: deps.actionTypes.PRODUCTDETAIL_MOUNT,
            data,
        });
    },
};
