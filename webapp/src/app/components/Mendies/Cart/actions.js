import deps from 'dependencies';
import TweenMax, { Power2 } from 'gsap';

const actions = {
    add: data => dispatch => {
        dispatch({
            type: deps.actionTypes.CART_ADD,
            data,
        });

        dispatch(actions.show());

        setTimeout(() => {
            dispatch(actions.save());
        }, 0.75);
    },

    hide: () => dispatch => {
        let body = document.body;
        let cart = document.getElementById('cart');
        let cont = document.getElementById('cart-list');

        let rect = cont.getBoundingClientRect();

        let w = rect.width;
        let right = `-${w}px`;
        let ease = Power2.easeInOut;

        TweenMax.to(cont, 0.125, {
            right,
            ease,
            onComplete: () => {
                body.style.overflow = 'auto';
                TweenMax.set(cart, { display: 'none' });
                TweenMax.set(cont, {
                    display: 'flex',
                    transform: 'translateX(-100%)',
                    right: 0,
                });
                dispatch({
                    type: deps.actionTypes.CART_HIDE,
                });
            },
        });
    },

    load: () => (dispatch, getState) => {
        const { cartID } = getState()['Cart'];
        deps.services.Cart.load({ cartID })
            .then(result =>
                dispatch({
                    type: deps.actionTypes.CART_LOAD,
                    result,
                }),
            )
            .catch(error => console.log(error));
    },

    mount: data => dispatch => {
        dispatch({
            type: deps.actionTypes.CART_MOUNT,
            data,
        });

        dispatch(deps.actions.Categories.refresh()).then(() => {
            dispatch(actions.load());
            dispatch(actions.subscribe());
        });
    },

    remove: data => dispatch => {
        dispatch({
            type: deps.actionTypes.CART_REMOVE,
            data,
        });

        dispatch(actions.save());
    },

    save: () => (dispatch, getState) => {
        const { cartID, items } = getState()['Cart'];
        const data = { items };

        deps.services.Cart.save({ data, cartID })
            .then(result =>
                dispatch({
                    type: deps.actionTypes.CART_SAVED,
                    result,
                }),
            )
            .catch(error => console.log(error));
    },

    show: () => dispatch => {
        let body = document.body;
        let cart = document.getElementById('cart');
        let cont = document.getElementById('cart-list');

        body.style.overflow = 'hidden';

        TweenMax.set(cart, { display: 'block' });
        TweenMax.set(cont, { display: 'flex', transform: 'none' });

        dispatch({
            type: deps.actionTypes.CART_SHOW,
        });

        let rect = cont.getBoundingClientRect();

        let w = rect.width;
        let right = `-${w}px`;
        let ease = Power2.easeInOut;

        TweenMax.from(cont, 0.125, { right, ease });
    },

    subscribe: () => (dispatch, getState) => {
        const { cartID } = getState()['Cart'];
        const sub = deps.services.Cart.subscribe({ cartID });

        sub.on('create', result =>
            dispatch({
                type: deps.actionTypes.CART_LOAD,
                result: result.toJSON(),
            }),
        );

        sub.on('update', result =>
            dispatch({
                type: deps.actionTypes.CART_LOAD,
                result: result.toJSON(),
            }),
        );
    },
};

export default actions;
