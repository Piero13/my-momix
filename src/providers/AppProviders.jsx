/**
 * Global application providers.
 */

import { Toaster } from "react-hot-toast";

export default function AppProviders({ children }) {
  return (
    <>
      {children}

      <Toaster
        position="center-top"
        reverseOrder={false}
        gutter={12}
        toastOptions={{
          duration: 3000,
        }}
      />
    </>
  );
}