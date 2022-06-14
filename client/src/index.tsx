import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles/_global.sass";
import App from './App';
import reportWebVitals from './reportWebVitals';
<<<<<<< HEAD
import store from "./redux/store";
import { Provider } from "react-redux";
=======
>>>>>>> 508dc407da35eae1d114c604f0ea20818d5bd830

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
<<<<<<< HEAD
        <Provider store={store}>
            <App />
        </Provider>
=======
        <App />
>>>>>>> 508dc407da35eae1d114c604f0ea20818d5bd830
    </React.StrictMode>
);

reportWebVitals();
