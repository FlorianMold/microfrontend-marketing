/**
 * We now import the mount function from the marketing/application.
 * The mount function takes a reference of a html element and mount the marketing app into it.
 *
 * 'marketing' is the name, which we specified inside the remotes array inside the webpack-config.
 * '/MarketingApp' is exposed inside the marketing webpack-config and loads the bootstrap file of the marketing application.
 * The keys of the exposes object in the marketing webpack-config is available to us.
 */
import {mount} from 'marketing/MarketingApp';
import React, {useRef, useEffect} from 'react';

// With useRef we can create a reference to an HTML-Element.
// This is where we want to render our marketing element into.

export default () => {
    /** This is the reference to the html-element displayed on the screen. */
    const ref = useRef(null);

    // The useEffect makes sure, that we can run the code only one time, when the component is being created.
    useEffect(() => {
        // Mount takes the reference of the div and tries to create the marketing app.
        mount(ref.current);
    });

    return <div ref={ref}></div>;
}
