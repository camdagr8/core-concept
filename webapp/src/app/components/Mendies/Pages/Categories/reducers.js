import deps from 'dependencies';

export default (state = {}, action) => {
    let newState;

    switch (action.type) {
    case deps.actionTypes.CATEGORIES_MOUNT:
        newState = {
            ...state,
            error: null,
        };
        return newState;

    case deps.actionTypes.CATEGORIES_FETCH:
        newState = {
            ...state,
            products: null,
            fetched: null,
            error: null,
        };
        return newState;

    case deps.actionTypes.CATEGORIES_FETCH_COMPLETE:
        newState = {
            ...state,
            products: action.categories,
            error: null,
            fetched: Date.now(),
        };
        return newState;

    case deps.actionTypes.CATEGORIES_FETCH_ERROR:
        newState = { ...state, products: null, error: action.error };

    default:
        return state;
    }
};
