import React from 'react';
/** A wrapper that creates our marketing app and renders it into the marketing app. */
import MarketingApp from './components/MarketingApp';

export default () => {
    return <div>
        <h1>Hello There!!!!</h1>
        <hr/>
        {/* Render the marketing micro-frontend */}
        <MarketingApp/>
    </div>
}
