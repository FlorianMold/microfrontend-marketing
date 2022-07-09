/**
 * We now import the mount function from the dashboard-application.
 * The mount function takes a reference of a html element and mount the dashboard app into it.
 *
 * 'dashboard' is the name, which we specified inside the remotes array inside the webpack-config.
 * '/DashboardApp' is exposed inside the dashboard webpack-config and loads the bootstrap file of the dashboard application.
 * The keys of the exposes object in the dashboard webpack-config is available to us.
 *
 * This import statement means that we load the remoteEntry.js file.
 */
import {mount} from 'dashboard/DashboardApp';
import React, {useRef, useEffect} from "react";

export default () => {
    /** This is the reference to the html-element displayed on the screen. */
    const ref = useRef(null);

    // The useEffect makes sure, that we can run the code only one time, when the component is being created.
    useEffect(() => {
        mount(ref.current)
    }, []);

    return <div ref={ref}></div>;
}
