// deleteConfirm.js
import React from 'react';
import { createRoot } from 'react-dom/client';

export function DeleteConfirm(title, message) {
  return new Promise((resolve) => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const root = createRoot(container);

    const cleanup = () => {
      root.unmount();
      container.remove();
    };

    const handleYes = () => {
      cleanup();
      resolve(true);
    };

    const handleNo = () => {
      cleanup();
      resolve(false);
    };

    const ConfirmBox = () => (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white dark:bg-gray-800 dark: text-gray-100 p-6 rounded shadow-lg w-80 text-center">
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="mb-4">{message}</p>
          <div className="flex justify-center gap-4">
            <button onClick={handleNo} className="px-4 py-2 text-black bg-gray-300 rounded">
              No
            </button>
            <button onClick={handleYes} className="px-4 py-2 bg-blue-600 text-white rounded">
              Yes
            </button>
          </div>
        </div>
      </div>
    );

    root.render(<ConfirmBox />);
  });
}
