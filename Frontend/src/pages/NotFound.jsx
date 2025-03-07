import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function NotFound() {
  const history = useHistory();

  useEffect(() => {
    // Redirect to the login page after 3 seconds
    const timer = setTimeout(() => {
      history.push('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [history]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-xl w-96">
        <h1 className="text-6xl text-red-500 font-bold mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-4">Oops! The page you're looking for doesn't exist.</p>
        <p className="text-md text-gray-600">You will be redirected to the login page shortly...</p>
      </div>
    </div>
  );
}

export default NotFound;
