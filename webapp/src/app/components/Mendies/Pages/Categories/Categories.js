/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component } from 'react';
import op from 'object-path';
import Template from 'components/Mendies/Template';
import Card from 'components/Mendies/Card';

/**
 * -----------------------------------------------------------------------------
 * React Component: Categories
 * -----------------------------------------------------------------------------
 */

export default class Categories extends Component {
    componentDidMount() {
        this.props.mount();
    }

    render() {
        const { error, products } = this.props;

        return (
            <Template title="Order Online | Mendie\'s" className='categories'>
                <main className='main-content px-20' role='main'>
                    <h1 className='mb-10 mt-md-20 mt-lg-20 center left-md'>
                        Menu
                    </h1>
                    {error && op.has(error, 'message') && (
                        <div className='error'>{error.message}</div>
                    )}
                    <div className='row' style={{ marginBottom: 10 }}>
                        {products &&
                            products.map((item, i) => {
                                let { name, image, id } = item;
                                if (id === 1) {
                                    name = null;
                                }
                                return (
                                    <div
                                        className={
                                            'col-xs-12 col-sm-6 col-md-4 col-lg-3'
                                        }
                                        key={`category-${i}`}>
                                        <Card
                                            footer={name}
                                            url={`/category/${id}`}
                                            image={image}
                                            className={`card-${id}`}
                                            title={`Browse ${item.name}`}
                                        />
                                    </div>
                                );
                            })}
                    </div>
                </main>
            </Template>
        );
    }
}
