import React from 'react';
import {Switch, Route, Router} from "react-router-dom";
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

/**
 * When we use the simple Router instead of the Browser-router, we can provide the type of the
 * history, which we want to use.
 */

export default ({history}) => {
    return <div>
        <StylesProvider generateClassName={generateClassName}>
            <Router history={history}>
                <Switch>
                    <Route exact path="/pricing" component={Pricing}/>
                    <Route path="/" component={Landing}/>
                </Switch>
            </Router>
        </StylesProvider>
    </div>
}
