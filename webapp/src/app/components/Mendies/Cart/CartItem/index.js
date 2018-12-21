/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React from 'react';
import { Link } from 'react-router-dom';

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
                <Link to={`/category/${category}/${id}`}>{name}</Link>
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
