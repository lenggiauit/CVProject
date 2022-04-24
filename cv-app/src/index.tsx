import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes/';
import { Provider } from 'react-redux';
import { store } from './store';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap-icons/font/bootstrap-icons.css";

ReactDOM.render(
  <Provider store={store} >
    <React.StrictMode>
      <Routes />
      <ToastContainer newestOnTop hideProgressBar position="bottom-right" autoClose={2000} />
    </React.StrictMode >
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
