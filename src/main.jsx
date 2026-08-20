import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "@/styles/main.scss";

// import "@fontsource/poppins/latin-400.css";
import "@fontsource/poppins/latin-600.css";
// import "@fontsource/poppins/latin-700.css";

import "@fontsource/roboto/latin-400.css";
// import "@fontsource/roboto/latin-500.css";
// import "@fontsource/roboto/latin-700.css";

import { 
  AppProviders,
  ShoppingListProvider,
} from "@/providers";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProviders>
      <ShoppingListProvider>
        <App />
      </ShoppingListProvider>
    </AppProviders>
  </React.StrictMode>
);