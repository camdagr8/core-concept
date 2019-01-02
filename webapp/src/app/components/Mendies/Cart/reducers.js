import _ from 'underscore';
import op from 'object-path';
import deps from 'dependencies';
// import products from 'components/Mendies/products';

export default (state = {}, action) => {
    let newState, categoryID, productID, category, product, item, items, index;

    const { products } = state;

    switch (action.type) {
    case deps.actionTypes.CART_ADD:
        newState = { ...state };
        items = op.get(state, 'items', []);
        categoryID = Number(op.get(action.data, 'category', 0));
        productID = Number(op.get(action.data, 'product', 0));

        if (categoryID !== 0 && productID !== 0) {
            category = _.findWhere(products, { id: categoryID });

            if (category) {
                product = _.findWhere(category.menuItems, {
                    id: productID,
                });
                product['category'] = categoryID;
                if (product) {
                    items.push(product);
                    newState['items'] = items;
                }
            }
        }
        return newState;

    case deps.actionTypes.CART_HIDE:
        newState = { ...state, visible: false };
        return newState;

    case deps.actionTypes.CART_LOAD:
        newState = {
            ...state,
            items: op.get(action, 'result.state.items', []),
            updated: Date.now(),
        };

        return newState;

    case deps.actionTypes.CART_MOUNT:
        newState = { ...state, ...action.data };
        return newState;

    case deps.actionTypes.CART_REMOVE:
        newState = { ...state };

        index = Number(op.get(action.data, 'index', -1));
        if (index < 0) {
            return newState;
        }

        categoryID = Number(op.get(action.data, 'category', 0));
        productID = Number(op.get(action.data, 'product', 0));
        items = op.get(state, 'items', []);
        item = items[index];

        if (item.id === productID && item.category === categoryID) {
            items.splice(index, 1);
            newState['items'] = items;
            newState['update'] = Date.now();
        }

        return newState;

    case deps.actionTypes.CART_SHOW:
        newState = { ...state, visible: true };
        return newState;

    case deps.actionTypes.CART_SAVED:
        newState = {
            ...state,
            cartID: op.get(action, 'result.objectId'),
        };
        return newState;

    case deps.actionTypes.CATEGORIES_FETCH_COMPLETE:
        return {
            ...state,
            products: action.categories,
            updated: Date.now(),
        };

    default:
        return state;
    }
};
