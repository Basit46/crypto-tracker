import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import FetchContextProvider from "./context/fetchContext.jsx";
import GlobalContextProvider from "./context/globalContext.jsx";
import AuthContextProvider from "./context/authContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <FetchContextProvider>
          <GlobalContextProvider>
            <App />
          </GlobalContextProvider>
        </FetchContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
