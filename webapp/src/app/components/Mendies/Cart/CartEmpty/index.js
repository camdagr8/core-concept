/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * -----------------------------------------------------------------------------
 * Functional Component: CartEmpty
 * -----------------------------------------------------------------------------
 */
const CartEmpty = () => {
    return (
        <li className='cart-item'>
            <div className='px-20' style={{ width: '100%' }}>
                <Link className='btn-primary-pill btn-block' to='/categories'>
                    Start your order
                </Link>
            </div>
        </li>
    );
};

export default CartEmpty;
