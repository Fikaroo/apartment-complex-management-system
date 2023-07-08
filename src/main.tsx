import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import "../Translation/i18n"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Router>
         <ToastContainer
theme="light"
position="top-right"
autoClose={2000}
closeOnClick
pauseOnHover={false}

/>
    <App />
  </Router>
);
