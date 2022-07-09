import React from 'react';
import {Switch, Route, Router} from "react-router-dom";
import {StylesProvider, createGenerateClassName} from "@material-ui/core";
import SignIn from "./components/Signin";
import SignUp from "./components/Signup";


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

export default ({history, onSignIn}) => {
    return <div>
        <StylesProvider generateClassName={generateClassName}>
            <Router history={history}>
                <Switch>
                    <Route path="/auth/signin">
                        <SignIn onSignIn={onSignIn}/>
                    </Route>
                    <Route path="/auth/signup">
                        <SignUp onSignIn={onSignIn}/>
                    </Route>
                </Switch>
            </Router>
        </StylesProvider>
    </div>
}
