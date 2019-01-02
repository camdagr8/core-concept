/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Template from 'components/Mendies/Template';
import { Link } from 'react-router-dom';
import _ from 'underscore';
import op from 'object-path';
import CategoryItem from './CategoryItem';
import Category404 from './Category404';

/**
 * -----------------------------------------------------------------------------
 * React Component: Category
 * -----------------------------------------------------------------------------
 */

const noop = () => {};

export default class Category extends Component {
    static propTypes = {
        category: PropTypes.any,
        favorites: PropTypes.array,
        products: PropTypes.array,
    };

    constructor(props) {
        super(props);
        this.onOrderClick = this.onOrderClick.bind(this);
    }

    componentDidMount() {
        this.props.mount(this.props);
    }

    onOrderClick(e) {
        const { add = noop } = this.props;
        const { product, category } = e.currentTarget.dataset;
        add({ product, category });
    }

    render() {
        let { products, favorites = [] } = this.props;
        const category = Number(op.get(this, 'props.match.params.category', 0));

        products = !Array.isArray(products) ? [] : products;

        if (category === 0) {
            return <Category404 {...this.props} />;
        }

        let cat = _.findWhere(products, { id: category });

        if (!cat && products.length > 0) {
            return <Category404 {...this.props} />;
        }

        if (!cat) {
            cat = {};
        }

        const { name: categoryName = '...', menuItems = [] } = cat;
        const title = `${categoryName} | Mendie's`;

        return (
            <Template title={title} className={'category'}>
                <main className={'main-content px-20'} role='main'>
                    <h1 className={'mb-10 mt-md-20 mt-lg-20'}>
                        <div className={'row center-xs center-sm start-md end'}>
                            <Link
                                to={'/categories'}
                                title={'go back to the main menu'}>
                                Menu
                            </Link>
                            <span className={'px-10'}>/</span>
                            <span
                                className={'mb-6'}
                                style={{ fontSize: '.5em' }}
                                title={`${categoryName} menu items`}
                                tabIndex={0}>
                                {categoryName}
                            </span>
                        </div>
                    </h1>
                    <div className={'row'}>
                        {menuItems.map(item => (
                            <CategoryItem
                                key={`category-item-${item.id}`}
                                {...item}
                                addFavorite={this.props.addFavorite}
                                removeFavorite={this.props.removeFavorite}
                                onOrderClick={this.onOrderClick}
                                category={category}
                                favorites={favorites}
                            />
                        ))}
                    </div>
                </main>
            </Template>
        );
    }
}
