/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React from 'react';

/**
 * -----------------------------------------------------------------------------
 * Functional Component: CartItem
 * -----------------------------------------------------------------------------
 */
const CartItem = ({ category, id, image, index, name, onRemove }) => {
    return (
        <li className='cart-item'>
            <div className='cart-item-image'>
                <img src={image} />
            </div>
            <div className='cart-item-title'>
                <a href={`/category/${category}/${id}`}>{name}</a>
            </div>
            <button
                className='cart-item-remove'
                data-product={id}
                data-index={index}
                data-category={category}
                onClick={onRemove}>
                &times;
            </button>
        </li>
    );
};

export default CartItem;
