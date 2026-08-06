/**
 * Global application providers.
 */

import { Toaster } from "react-hot-toast";

import { AuthProvider } from "@/contexts";

export default function AppProviders({ children }) {
  return (
    <AuthProvider>
      {children}

      <Toaster
        position="center-top"
        reverseOrder={false}
        gutter={12}
        toastOptions={{
          duration: 3000,
        }}
      />
    </AuthProvider>
  );
}