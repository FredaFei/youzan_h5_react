import React from 'react';
import ReactDOM from 'react-dom';
// import {Provider} from 'react-redux'
// import store from './store/'
import 'modules/styles/index.scss'
import Route from './router/'

import registerServiceWorker from './registerServiceWorker';

const render = Component=>{
    ReactDOM.render(
        <Component />,
        document.getElementById('root')
    )
    // ReactDOM.render(
    //     <Provider store={store}>
    //         <Component />
    //     </Provider>,
    //     document.getElementById('root')
    // )
}
render(Route)
registerServiceWorker();
