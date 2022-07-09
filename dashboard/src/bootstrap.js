import {createApp} from "vue";
import Dashboard from "./components/Dashboard.vue";


/* 1. Create a mount function to start up the app */

/**
 * We assume that this function is called with a html-element
 * and the app is rendered into the element.
 *
 * @param el HTMLElement, where the app should be rendered
 */
const mount = (el) => {
    const app = createApp(Dashboard);
    /**
     * This mount function is not related to our mount function.
     * It just tells vue, where to create the application.
     */
    app.mount(el);
}

// 2. Check if we are in development and in isolation, call mount immediately

/**
 * NODE_ENV will be replaced by webpack, when the app is built.
 */
if (process.env.NODE_ENV === 'development') {
    /* We look for the element, which is only present in the auth app and not in the container app. */
    const devRoot = document.querySelector('#_dashboard-dev-root');

    /** When the element is found. */
    if (devRoot) {
        mount(devRoot)
    }
}

// 3. We are running through container and we should export the mount function
/* We export the mount function here, for the container to import. */
export {mount};
