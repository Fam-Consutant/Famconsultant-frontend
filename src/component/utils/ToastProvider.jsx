"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster 
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#fff',
          color: '#000',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          borderRadius: '8px',
        },
        success: {
          style: {
            background: '#10b981',
            color: '#fff',
          },
        },
        error: {
          style: {
            background: '#ef4444',
            color: '#fff',
          },
        },
      }}
    />
  );
}
