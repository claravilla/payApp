import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { AuthContextProviderWrapper } from "./components/context/authContext";
import { LegoPaymentIdContextProviderWrapper } from './components/context/legoPaymentIdContext';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <AuthContextProviderWrapper>
        <LegoPaymentIdContextProviderWrapper>
          <App />
        </LegoPaymentIdContextProviderWrapper>
      </AuthContextProviderWrapper>
    </Router>
  </React.StrictMode>
);
