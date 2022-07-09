import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import {createMemoryHistory} from 'history';


/* 1. Create a mount function to start up the app */

/**
 * We assume that this function is called with a html-element
 * and the app is rendered into the element.
 *
 * @param el HTMLElement, where the element should be rendered
 * @param onNavigate Callback that should be executed, when the app has navigated. So
 * we have to make to call the onNavigate function, when navigation happens.
 */
const mount = (el, {onNavigate}) => {
    // Create a memory-history for the react-router.
    const history = createMemoryHistory();

    /**
     * The history object has a listener, whenever navigation occurs.
     * We pass our onNavigate function, which is later executed, when the navigation of
     * the application changes.
     *
     * After the history is changed, the callback is executed.
     */
    if (onNavigate) {
        history.listen(onNavigate);
    }

    // Render the app-component as our root element
    ReactDom.render(
        <App history={history}/>,
        el
    )
}

// 2. Check if we are in development and in isolation, call mount immediately

/**
 * NODE_ENV will be replaced by webpack, when the app is built.
 */
if (process.env.NODE_ENV === 'development') {
    /* We look for the element, which is only present in the marketing app and not in the container app. */
    const devRoot = document.querySelector('#_marketing-dev-root');

    /** When the element is found. */
    if (devRoot) {
        mount(devRoot, {})
    }
}

// 3. We are running through container and we should export the mount function
/* We export the mount function here, for the container to import. */
export {mount};
