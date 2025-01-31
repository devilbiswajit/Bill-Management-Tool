import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import billsReducer from './features/bills/billsSlice';
import App from './App';
import './index.css';

const store = configureStore({
  reducer: {
    bills: billsReducer,
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);


