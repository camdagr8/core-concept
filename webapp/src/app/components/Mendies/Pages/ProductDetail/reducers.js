import deps from 'dependencies';

export default (state = {}, action) => {
    switch (action.type) {
    case deps.actionTypes.PRODUCTDETAIL_MOUNT:
        return { ...state, ...action.data };

    case deps.actionTypes.CATEGORIES_FETCH_COMPLETE:
        return {
            ...state,
            products: action.categories,
            updated: Date.now(),
            fetching: null,
        };

    default:
        return state;
    }
};
