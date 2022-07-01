import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import Footer from './Components/template/Footer/Footer';
import Header from './Components/template/Header/Header';
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Header/>
    <App />
    <Footer/>
  </BrowserRouter>
);