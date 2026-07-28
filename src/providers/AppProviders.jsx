/**
 * Global application providers.
 */

import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export default function AppProviders({ children }) {
  return (
    <BrowserRouter>
      {children}

      <Toaster
        position="bottom-right"
        reverseOrder={false}
        gutter={12}
        toastOptions={{
          duration: 3000,
        }}
      />
    </BrowserRouter>
  );
}