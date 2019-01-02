/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component, Fragment } from 'react';
import Template from 'components/Mendies/Template';
import { Link } from 'react-router-dom';
import _ from 'underscore';

/**
 * -----------------------------------------------------------------------------
 * React Component: ProductDetail
 * -----------------------------------------------------------------------------
 */

const noop = () => {};

export default class ProductDetail extends Component {
    onOrderClick(e) {
        const { add = noop } = this.props;
        const { product, category } = e.currentTarget.dataset;
        add({ product, category });
    }

    render404({ title, className }) {
        return (
            <Template title={title} className={className}>
                <main className='main-content px-20' role='main'>
                    <h1 className='mb-10 mt-md-20 mt-lg-20 center left-md'>
                        404 <span className='px-10'>/</span> Page not found
                    </h1>
                </main>
            </Template>
        );
    }

    render() {
        let { className, category, fetching, product, products } = this.props;
        category = Number(category);
        product = Number(product);
        products = products || [];

        if ((!fetching && category === 0) || isNaN(category)) {
            return this.render404(this.props);
        }

        if ((!fetching && product === 0) || isNaN(product)) {
            return this.render404(this.props);
        }

        const cat = _.findWhere(products, { id: category });
        if (!fetching && !cat) {
            return this.render404(this.props);
        }

        const prod = cat ? _.findWhere(cat.menuItems, { id: product }) : null;
        if (!fetching && !prod) {
            return this.render404(this.props);
        }

        const categoryName = cat && !fetching ? cat.name : '...';
        const title = `${categoryName} | Mendie's`;

        return (
            <Template title={title} className={className}>
                <main className='container px-20' role='main'>
                    <h1 className='mb-10 mt-md-20 mt-lg-20'>
                        <div className='row center-xs center-sm start-md end'>
                            <Link
                                to='/categories'
                                title='go back to the main menu'>
                                Menu
                            </Link>
                            <span className='px-10'>/</span>
                            <Link
                                to={`/category/${category}`}
                                className='mb-6'
                                style={{ fontSize: '.5em' }}
                                title={`${categoryName} menu items`}
                                tabIndex={0}>
                                {categoryName}
                            </Link>
                        </div>
                    </h1>
                </main>
                <section className={`product-hero category-${category}`}>
                    <div className='product-hero-wrapper'>
                        <div className='product-hero-left'>
                            {prod && (
                                <Fragment>
                                    <h2>{prod.name}</h2>
                                    <p>
                                        {prod.description}
                                        <br />
                                        <small>{prod.calories}</small>
                                    </p>
                                    <button
                                        type='button'
                                        className='btn-primary-lg-pill'
                                        data-category={category}
                                        data-product={product}
                                        onClick={this.onOrderClick.bind(this)}>
                                        Add to Order
                                    </button>
                                </Fragment>
                            )}
                        </div>
                        <div className='product-hero-right'>
                            {prod && <img src={prod.image} />}
                        </div>
                    </div>
                </section>
            </Template>
        );
    }
}
