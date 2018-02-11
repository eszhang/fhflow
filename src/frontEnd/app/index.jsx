
/**
 *  UI层容器app
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import App from './react/container';
import store from './redux/store/index';

ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
            <App />
        </Provider>
    </AppContainer>,
    document.getElementById('root')
);

if (module.hot && process.env.NODE_ENV !== 'production') {
    module.hot.accept();
}
