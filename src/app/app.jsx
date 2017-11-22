
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store/index';
import Container from './react/container';

ReactDOM.render(
    <Provider store={store}>
        <Container />
    </Provider>,
    document.getElementById("root")
)