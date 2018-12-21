/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React from 'react';

/**
 * -----------------------------------------------------------------------------
 * Functional Component: CartHeader
 * -----------------------------------------------------------------------------
 */
const CartHeader = ({ onClick }) => {
    return (
        <div className='cart-header'>
            <button
                type='button'
                className='btn-cart-close'
                title='close cart'
                onClick={onClick}>
                &times;
            </button>
            <h4>Your Order</h4>
        </div>
    );
};

export default CartHeader;
