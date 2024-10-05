import React from 'react';

/**
 * Loading Spinner Component
 *
 * Displays a simple spinning loader to indicate loading state.
 */
function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>
  );
}

export default LoadingSpinner;
