import React, { useState } from 'react';
import { Toast } from '../components/toast';
import type { ToastMessage, ToastType } from '../components/toast';

export const ToastDemo: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: ToastType, title: string, message: string) => {
    const newToast: ToastMessage = {
      id: Math.random().toString(36).substring(2, 9),
      type,
      title,
      message,
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative font-sans">
      <div className="max-w-2xl text-center z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4 tracking-tight">
          Toast Notification System
        </h1>
        <p className="text-slate-500 mb-10 text-lg">
          Click the buttons below to trigger different types of glassmorphic toast notifications. 
          They will slide in from the top right and automatically dismiss.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => addToast('success', 'Changes Saved', 'Your profile information has been successfully updated.')}
            className="px-6 py-3 rounded-xl bg-emerald-500 text-white font-semibold shadow-emerald-500/30 shadow-lg hover:bg-emerald-400 hover:-translate-y-0.5 transition-all"
          >
            Trigger Success
          </button>
          
          <button
            onClick={() => addToast('error', 'Upload Failed', 'The file size exceeds the 5MB maximum limit.')}
            className="px-6 py-3 rounded-xl bg-rose-500 text-white font-semibold shadow-rose-500/30 shadow-lg hover:bg-rose-400 hover:-translate-y-0.5 transition-all"
          >
            Trigger Error
          </button>

          <button
            onClick={() => addToast('warning', 'Low Storage', 'You have used 90% of your available storage quota.')}
            className="px-6 py-3 rounded-xl bg-amber-500 text-white font-semibold shadow-amber-500/30 shadow-lg hover:bg-amber-400 hover:-translate-y-0.5 transition-all"
          >
            Trigger Warning
          </button>

          <button
            onClick={() => addToast('info', 'New Message', 'Sarah sent you a direct message just now.')}
            className="px-6 py-3 rounded-xl bg-blue-500 text-white font-semibold shadow-blue-500/30 shadow-lg hover:bg-blue-400 hover:-translate-y-0.5 transition-all"
          >
            Trigger Info
          </button>
        </div>
      </div>

      {/* Toast Wrapper positioned at Top-Right */}
      <div className="fixed top-6 right-6 z-50 flex flex-col items-end pointer-events-none">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast
              id={toast.id}
              type={toast.type}
              title={toast.title}
              message={toast.message}
              onDismiss={removeToast}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
