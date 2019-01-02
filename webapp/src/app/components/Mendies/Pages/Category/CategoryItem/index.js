import React from 'react';
import { Link } from 'react-router-dom';
import HeartFullIcon from 'components/Mendies/Pages/Category/HeartFullIcon';
import HeartEmptyIcon from 'components/Mendies/Pages/Category/HeartEmptyIcon';

export default ({
    addFavorite,
    category,
    calories,
    favorites = [],
    id,
    image,
    name,
    onOrderClick,
    removeFavorite,
}) => (
    <div className={'col-xs-12 col-sm-6 col-md-4 col-lg-3'}>
        <div className={'card'}>
            <div className={'card-wrapper'}>
                <div className={'card-heading'}>
                    <div>
                        <Link to={`/category/${category}/${id}`}>{name}</Link>
                        <div>
                            <small className={'mt-8'}>{calories}</small>
                        </div>
                    </div>
                    {favorites.indexOf(id) > -1 ? (
                        <button
                            className={'btn-icon'}
                            onClick={e => {
                                removeFavorite(id);
                                e.currentTarget.blur();
                            }}>
                            <HeartFullIcon />
                        </button>
                    ) : (
                        <button
                            className={'btn-icon'}
                            onClick={e => {
                                addFavorite(id);
                                e.currentTarget.blur();
                            }}>
                            <HeartEmptyIcon />
                        </button>
                    )}
                </div>
                <div className={'card-body'}>
                    <Link
                        to={`/category/${category}/${id}`}
                        className={'center'}>
                        <img src={image} />
                    </Link>
                </div>
                <div className={'card-footer middle flex'}>
                    <button
                        type={'button'}
                        className={'btn-secondary-md-pill'}
                        data-category={category}
                        data-product={id}
                        onClick={onOrderClick}>
                        Add to Order
                    </button>
                </div>
            </div>
        </div>
    </div>
);
