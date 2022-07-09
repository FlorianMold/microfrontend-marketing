import React from 'react';
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {StylesProvider, createGenerateClassName} from "@material-ui/core";

import Landing from './components/Landing';
import Pricing from "./components/Pricing";

/**
 * Instead of prefixing our production classes with jss we prefix our
 * production classes with ma
 */
const generateClassName = createGenerateClassName({
    // The prefix we want to use in production, so that we have a unique prefix.
    productionPrefix: 'ma'
});

export default () => {
    return <div>
        <StylesProvider generateClassName={generateClassName}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/pricing" component={Pricing}/>
                    <Route path="/" component={Landing}/>
                </Switch>
            </BrowserRouter>
        </StylesProvider>
    </div>
}
