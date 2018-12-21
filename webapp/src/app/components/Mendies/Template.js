/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component, Fragment } from 'react';
import Header from 'components/Mendies/Header';
import Footer from 'components/Mendies/Footer';
import Cart from 'components/Mendies/Cart';
import { Helmet } from 'react-helmet';

/**
 * -----------------------------------------------------------------------------
 * React Component: Template
 * -----------------------------------------------------------------------------
 */

export default class Template extends Component {
    render() {
        let { className, children, title } = this.props;
        return (
            <Fragment>
                <Helmet>
                    <title>{title}</title>
                    <html lang='en' />
                    <body className={className} />
                </Helmet>
                <div className='container-fluid'>
                    <Header />
                    {children}
                    <Footer />
                </div>
                <Cart />
            </Fragment>
        );
    }
}

Template.defaultProps = {
    title: 'Mendie\'s Burgers',
    className: 'home',
};
