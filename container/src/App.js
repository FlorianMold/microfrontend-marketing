import React, {lazy, Suspense} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
/** A wrapper that creates our marketing app and renders it into the marketing app. */
// import MarketingApp from './components/MarketingApp';
// import AuthApp from './components/AuthApp';
import Header from './components/Header';
import Progress from './components/Progress';
import {createGenerateClassName, StylesProvider} from "@material-ui/core/styles";

/**
 * This kind of definition makes sure, that we only load the marketing-app, when we want to show it on the screen.
 * The result of lazy is a react-component, so we can easily display it.
 */
const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));

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

export default () => {
    return (
        <StylesProvider generateClassName={generateClassName}>
            <BrowserRouter>
                <div>
                    <Header/>
                    <Suspense fallback={<Progress/>}>
                        <Switch>
                            <Route path="/auth" component={AuthLazy}/>
                            <Route path="/" component={MarketingLazy}/>
                        </Switch>
                    </Suspense>
                </div>
            </BrowserRouter>
        </StylesProvider>
    )
}
