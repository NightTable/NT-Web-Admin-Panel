/* All information, source code contained in this document 
is the property of StrynDev Solutions, LLC. It must not 
be transmitted to others without the written consent of 
StrynDev Solutions. It must be returned to StrynDev Solutions 
when its authorized use is terminated. */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
