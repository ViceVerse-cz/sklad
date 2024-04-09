import React from 'react';

const Spinner = () => (
  <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
    <img src="/spinner.svg" alt="Loading spinner" className="w-16 h-16" />
  </div>
);

export default Spinner; 