/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component } from 'react';
import CartEmpty from './CartEmpty';
import CartFooter from './CartFooter';
import CartHeader from './CartHeader';
import CartItem from './CartItem';

/**
 * -----------------------------------------------------------------------------
 * React Component: Cart
 * -----------------------------------------------------------------------------
 */

export default class Cart extends Component {
    componentDidMount() {
        this.props.mount(this.props);
    }

    onRemove(e) {
        const { product, category, index } = e.currentTarget.dataset;
        this.props.remove({ index, product, category });
    }

    render() {
        const { visible = false, items = [], hide } = this.props;
        const className =
            visible === true ? 'cart cart-visible' : 'cart cart-hide';

        return (
            <aside className={className} id='cart'>
                <div className='cart-backdrop' onClick={hide} />
                <div className='cart-list' id='cart-list'>
                    <CartHeader onClick={hide} />
                    <ul className='cart-items'>
                        {items.length < 1 ? (
                            <CartEmpty />
                        ) : (
                            items.map((item, i) => (
                                <CartItem
                                    {...item}
                                    index={i}
                                    key={`cart-item-${i}`}
                                    onRemove={this.onRemove.bind(this)}
                                />
                            ))
                        )}
                    </ul>
                    {items.length > 0 && <CartFooter />}
                </div>
            </aside>
        );
    }
}
