/**
 * We now import the mount function from the marketing/application.
 * The mount function takes a reference of a html element and mount the marketing app into it.
 *
 * 'marketing' is the name, which we specified inside the remotes array inside the webpack-config.
 * '/MarketingApp' is exposed inside the marketing webpack-config and loads the bootstrap file of the marketing application.
 * The keys of the exposes object in the marketing webpack-config is available to us.
 */
import {mount} from 'auth/AuthApp';
import React, {useRef, useEffect} from 'react';
import {useHistory} from "react-router-dom";

// With useRef we can create a reference to an HTML-Element.
// This is where we want to render our marketing element into.

export default () => {
    /** This is the reference to the html-element displayed on the screen. */
    const ref = useRef(null);
    /** A copy of the browser-history used in our container. */
    const history = useHistory();

    // The useEffect makes sure, that we can run the code only one time, when the component is being created.
    useEffect(() => {
        // Mount takes the reference of the div and tries to create the marketing app.
        const {onParentNavigate} = mount(ref.current, {
            // We pass a callback, that is executed by the marketing app, when navigation takes place.
            // The location is what is communicated from the marketing-router to the container.
            // pathname is the path, where the marketing app navigates to.
            onNavigate: ({pathname: nextPathname}) => {
                const {pathname} = history.location;

                /**
                 * Only navigate, when the current pathname and the next-pathname are different.
                 */
                if (pathname !== nextPathname) {
                    /** This means, that we want to navigate to the given path-name. */
                    history.push(nextPathname);
                }
            }
        }, []);

        /**
         * The browser-history has the same methods as memory-history.
         * So we listen here to navigation on the container app and call the function from the marketing app,
         * when the navigation of the container changes.
         */
        history.listen(onParentNavigate)
    });

    return <div ref={ref}></div>;
}
