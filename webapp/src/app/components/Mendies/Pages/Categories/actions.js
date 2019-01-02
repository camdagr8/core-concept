import deps from 'dependencies';
import moment from 'moment';

const actions = {
    mount: () => dispatch => {
        dispatch({
            type: deps.actionTypes.CATEGORIES_MOUNT,
        });

        dispatch(actions.refresh());
    },

    refresh: (params = {}) => (dispatch, getState) => {
        const { fetched, products } = getState()['Categories'];

        if (!fetched || !products) {
            return dispatch(actions.fetch(params));
        } else {
            const last = moment(fetched);
            const diff = moment().diff(last, 'minutes');
            if (diff >= 5) {
                return dispatch(actions.fetch(params));
            }
        }

        return Promise.resolve();
    },

    fetch: (params = {}) => dispatch => {
        dispatch({ type: deps.actionTypes.CATEGORIES_FETCH });

        return deps.services.Categories.fetch(params)
            .then(({ data }) => {
                dispatch({
                    type: deps.actionTypes.CATEGORIES_FETCH_COMPLETE,
                    categories: data,
                });
            })
            .catch(error => {
                dispatch({
                    type: deps.actionTypes.CATEGORIES_FETCH_ERROR,
                    error,
                });
            });
    },
};

export default actions;
