import React from 'react';
import {Switch, Route, Router} from "react-router-dom";
import {StylesProvider, createGenerateClassName} from "@material-ui/core";


/**
 * Instead of prefixing our production classes with jss we prefix our
 * production classes with au
 */
const generateClassName = createGenerateClassName({
    // The prefix we want to use in production, so that we have a unique prefix.
    productionPrefix: 'au'
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
                </Switch>
            </Router>
        </StylesProvider>
    </div>
}
