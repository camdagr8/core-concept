import deps from 'dependencies';
import op from 'object-path';

const actions = {
    mount: () => (dispatch, getState) => {
        dispatch({
            type: deps.actionTypes.CATEGORY_MOUNT,
        });

        const products = op.get(getState(), 'Categories.products') || [];

        if (products.length < 1) {
            dispatch(deps.actions.Categories.refresh());
        }
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
