/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import { connect } from 'react-redux';
import ProductDetail from './ProductDetail';
import deps from 'dependencies';

/**
 * -----------------------------------------------------------------------------
 * Inject Redux State and Actions into React Component: ProductDetail
 * -----------------------------------------------------------------------------
 */
const mapStateToProps = (state, props) => ({
    ...state.ProductDetail,
    ...props,
});

const mapDispatchToProps = dispatch => ({
    mount: data => dispatch(deps.actions.ProductDetail.mount(data)),
    add: data => dispatch(deps.actions.Cart.add(data)),
    remove: data => dispatch(deps.actions.Cart.remove(data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProductDetail);
