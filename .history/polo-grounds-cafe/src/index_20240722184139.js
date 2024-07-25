import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBZBxtNDJ4tVMivUIVZVLTq5iZncIQbKVg",
  authDomain: "pologroundsapp.firebaseapp.com",
  projectId: "pologroundsapp",
  storageBucket: "pologroundsapp.appspot.com",
  messagingSenderId: "465072129842",
  appId: "1:465072129842:web:f242c282f4b7d03f32392b",
  measurementId: "G-Y0JZRV4P1L"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();