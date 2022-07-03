import React from 'react';
/**
 * We now import the mount function from the marketing/application.
 * The mount function takes a reference of a html element and mount the marketing app into it.
 *
 * 'marketing' is the name, which we specified inside the remotes array inside the webpack-config.
 * '/MarketingApp' is exposed inside the marketing webpack-config and loads the bootstrap file of the marketing application.
 * The keys of the exposes object in the marketing webpack-config is available to us.
 */
import {mount} from 'marketing/MarketingApp';

console.log(mount);

export default () => {
    return <h1>Hi There!</h1>
}
