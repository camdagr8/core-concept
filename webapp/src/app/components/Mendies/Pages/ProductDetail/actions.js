import deps from 'dependencies';

export default {
    mount: data => dispatch => {
        dispatch(deps.actions.Cart.hide());
        dispatch({
            type: deps.actionTypes.PRODUCTDETAIL_MOUNT,
            data,
        });
    },
};
