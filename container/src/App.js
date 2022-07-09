import React, {lazy, Suspense, useState, useEffect} from 'react';
import {Router, Route, Switch, Redirect} from "react-router-dom";
import {createGenerateClassName, StylesProvider} from "@material-ui/core/styles";
import {createBrowserHistory} from 'history';

/** A wrapper that creates our marketing app and renders it into the marketing app. */
// import MarketingApp from './components/MarketingApp';
// import AuthApp from './components/AuthApp';
import Header from './components/Header';
import Progress from './components/Progress';

/**
 * This kind of definition makes sure, that we only load the marketing-app, when we want to show it on the screen.
 * The result of lazy is a react-component, so we can easily display it.
 */
const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));

/**
 * Instead of prefixing our production classes with jss we prefix our
 * production classes with co
 */
const generateClassName = createGenerateClassName({
    // The prefix we want to use in production
    productionPrefix: 'co'
});

/**
 * The browser router is provided to us, by the react-router-dom. It creates a browser-history object for us.
 * The browser router uses the browser-history.ß
 */

const history = createBrowserHistory();

export default () => {
    /** By default the user is not signed in. */
    const [isSignedIn, setIsSignedIn] = useState(false);

    /**
     * This function is run, when the value of isSignedIn changes.
     */
    useEffect(() => {
        // Sign-in is changed and true
        if (isSignedIn) {
            // Go to the dashboard after sign-in.
            history.push('./dashboard')
        }
    }, [isSignedIn])

    return (
        <StylesProvider generateClassName={generateClassName}>
            <Router history={history}>
                <div>
                    <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)}/>
                    <Suspense fallback={<Progress/>}>
                        <Switch>
                            <Route path="/auth">
                                {/* When the callback is executed, sign-in is always true */}
                                <AuthLazy onSignIn={() => setIsSignedIn(true)}/>
                            </Route>
                            {/* It is important that the route is here, otherwise the last route would catch all. */}
                            <Route path="/dashboard">
                                {/* If the user is not signed in, redirect to landing page. */}
                                {!isSignedIn && <Redirect to="/"/>}
                                <DashboardLazy/>
                            </Route>
                            <Route path="/" component={MarketingLazy}/>
                        </Switch>
                    </Suspense>
                </div>
            </Router>
        </StylesProvider>
    )
}
