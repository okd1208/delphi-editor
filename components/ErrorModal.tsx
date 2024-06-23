import React from 'react';

interface ErrorModalProps {
  message: string;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Error</h2>
        <p className="mb-4">{message}</p>
        <button
          onClick={onClose}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
