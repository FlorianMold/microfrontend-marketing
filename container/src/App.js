import React from 'react';
import {BrowserRouter} from "react-router-dom";
/** A wrapper that creates our marketing app and renders it into the marketing app. */
import MarketingApp from './components/MarketingApp';
import Header from './components/Header';

export default () => {
    return (
        <BrowserRouter>
            <div>
                <Header/>
                {/* Render the marketing micro-frontend */}
                <MarketingApp/>
            </div>
        </BrowserRouter>
    )
}
