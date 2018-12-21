/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React from 'react';

/**
 * -----------------------------------------------------------------------------
 * Functional Component: CartFooter
 * -----------------------------------------------------------------------------
 */
const CartFooter = ({ onClick }) => {
    return (
        <div className='cart-footer'>
            <button
                type='button'
                className='btn-default-lg-pill btn-block'
                onClick={onClick}>
                Check Out
            </button>
        </div>
    );
};

export default CartFooter;
