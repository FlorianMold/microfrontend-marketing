import React from 'react';
import {BrowserRouter} from "react-router-dom";
/** A wrapper that creates our marketing app and renders it into the marketing app. */
import MarketingApp from './components/MarketingApp';
import Header from './components/Header';
import {createGenerateClassName, StylesProvider} from "@material-ui/core/styles";

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
                    {/* Render the marketing micro-frontend */}
                    <MarketingApp/>
                </div>
            </BrowserRouter>
        </StylesProvider>
    )
}
