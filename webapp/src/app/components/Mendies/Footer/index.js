/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

/**
 * -----------------------------------------------------------------------------
 * React Component: Footer
 * -----------------------------------------------------------------------------
 */

const Footer = () => (
    <footer className='main-footer'>
        <div className='container px-20'>
            <div>
                <Link to='/'>
                    &copy; Mendie&rsquo;s &ndash; {new Date().getFullYear()}
                </Link>
            </div>
        </div>
    </footer>
);

export default Footer;
