import React from 'react';
import ReactDOM from 'react-dom';

import 'modules/styles/index.scss'
import Route from './router/'

import registerServiceWorker from './registerServiceWorker';

const render = Component=>{
    ReactDOM.render(
        <Component />,
        document.getElementById('root')
    )
}
render(Route)
registerServiceWorker();
