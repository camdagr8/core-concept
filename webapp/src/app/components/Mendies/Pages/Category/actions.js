import deps from 'dependencies';
import op from 'object-path';

const actions = {
    mount: data => (dispatch, getState) => {
        const newData = { ...data };

        const products = op.get(getState(), 'Categories.products') || [];

        if (products.length < 1) {
            newData['fetching'] = true;
            dispatch(deps.actions.Categories.refresh());
        } else {
            newData['products'] = products;
        }

        dispatch({
            type: deps.actionTypes.CATEGORY_MOUNT,
            data: newData,
        });
    },

    addFavorite: product => dispatch => {
        dispatch({
            type: deps.actionTypes.CATEGORY_FAVORITE_ADD,
            product,
        });
    },

    removeFavorite: product => dispatch => {
        dispatch({
            type: deps.actionTypes.CATEGORY_FAVORITE_REMOVE,
            product,
        });
    },
};

export default actions;
