'use strict';

/**
 * -----------------------------------------------------------------------------
 * Includes
 * -----------------------------------------------------------------------------
 */

import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PlugableProvider } from 'reactium-core/components/Plugable';
import Router from 'reactium-core/components/Router';
import storeCreator from 'reactium-core/storeCreator';
import deps, { getComponents } from 'dependencies';

// Placeholder for the bindable elements
const bindPoints = [];

// <Component /> DOM Elements array
const elements =
    typeof document !== 'undefined'
        ? Array.prototype.slice.call(document.querySelectorAll('component'))
        : [];

if (elements.length > 0) {
    let types = [];

    let elms = elements.map(elm => {
        let path = elm.getAttribute('path');
        let type = elm.getAttribute('type');

        types.push(type);

        return { path, type };
    });

    let components = getComponents(elms);

    elements.forEach(elm => {
        // Get the component type
        let type = elm.getAttribute('type');

        if (!components.hasOwnProperty(type)) {
            return;
        }

        // Get parameters from container element
        let params = {};
        let exclude = ['type', 'path'];
        Object.entries(elm.attributes).forEach(([key, attr]) => {
            key = String(key).toLowerCase();
            if (exclude.indexOf(key) < 0) {
                return;
            }
            params[attr.name] = attr.value;
        });

        // Get the children from the element and pass them to the component
        let children = elm.innerHTML;
        if (children) {
            params['children'] = children;
        }

        // Create the React element and apply parameters
        let cmp = React.createElement(components[type], params);
        bindPoints.push({ component: cmp, element: elm });
    });
}

/**
 * -----------------------------------------------------------------------------
 * @function App()
 * @description Scan DOM for <Component> elements and render React components
 * inside of them.
 * -----------------------------------------------------------------------------
 */
// Create the Redux store
export const store = storeCreator();
deps.init();

export const App = () => {
    if (typeof document !== 'undefined') {
        // Render the React Components
        if (bindPoints.length > 0) {
            bindPoints.forEach(item => {
                ReactDOM.render(
                    <Provider store={store}>
                        <PlugableProvider>
                            <Fragment>{item.component}</Fragment>
                        </PlugableProvider>
                    </Provider>,
                    item.element,
                );
            });
        }

        // Get the router target DOM Element
        let routerTarget = document.getElementById('router');
        if (routerTarget) {
            // ensure router DOM Element is on the page

            if (window && 'ssr' in window && window.ssr) {
                // Reactium SSR Mode

                console.log('[Reactium] SSR Mode: Hydrating Reactium.');

                // Hydrate the Routed component
                ReactDOM.hydrate(
                    <Provider store={store}>
                        <PlugableProvider>
                            <Fragment>
                                <Router />
                            </Fragment>
                        </PlugableProvider>
                    </Provider>,
                    routerTarget,
                );
            } else {
                // Reactium FE Mode

                console.log('[Reactium] FE Mode: Binding Reactium.');

                // Bind the Routed component
                ReactDOM.render(
                    <Provider store={store}>
                        <PlugableProvider>
                            <Fragment>
                                <Router />
                            </Fragment>
                        </PlugableProvider>
                    </Provider>,
                    routerTarget,
                );
            }
        }
    }
};

export const AppError = error => {
    const RedBox = require('redbox-react');

    ReactDOM.render(
        <RedBox error={error} />,
        document.getElementById('router'),
    );
};

export const updateReducer = rootReducer => {
    if (module.hot) {
        store.replaceReducer(rootReducer);
    }
};
