import deps from 'dependencies';

const actions = {
    mount: () => dispatch => {
        dispatch({
            type: deps.actionTypes.CATEGORY_MOUNT,
        });

        dispatch(deps.actions.Categories.refresh());
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
