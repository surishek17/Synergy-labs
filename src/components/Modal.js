import React from 'react';
import { FiX } from 'react-icons/fi';

/**
 * Modal Component
 *
 * @param {boolean} isOpen - Determines if the modal is visible.
 * @param {function} onClose - Function to call when closing the modal.
 * @param {React.ReactNode} children - The content to display inside the modal.
 * @param {string} title - The title of the modal.
 */
function Modal({ isOpen, onClose, children, title }) {
  // If the modal is not open, do not render anything
  if (!isOpen) return null;

  return (
    // Fixed positioning to cover the entire viewport
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {/* Modal Container */}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Close Modal"
        >
          <FiX size={24} />
        </button>

        {/* Modal Title */}
        {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}

        {/* Modal Content */}
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
