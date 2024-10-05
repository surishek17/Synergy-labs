import React from 'react';

function ConfirmModal({ title, message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {/* Modal Content */}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <p className="mb-6">{message}</p>
        
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
