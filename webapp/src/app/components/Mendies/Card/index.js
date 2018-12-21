/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * -----------------------------------------------------------------------------
 * React Component: Card
 * -----------------------------------------------------------------------------
 */
const Container = ({ url, className, title, children }) => {
    return url ? (
        <Link to={url} className={`card ${className}`} title={title}>
            {children}
        </Link>
    ) : (
        <div className={`card ${className}`}>{children}</div>
    );
};

const Card = ({ url, title, footer, image, className }) => (
    <Container url={url} className={className} title={title || footer}>
        {image && (
            <span
                className={'card-body'}
                style={{ backgroundImage: `url('${image}')` }}
            />
        )}
        {footer && (
            <span className={'card-footer'}>
                <h3>{footer}</h3>
            </span>
        )}
    </Container>
);

export default Card;
