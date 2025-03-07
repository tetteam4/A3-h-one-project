import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // import useNavigate instead of useHistory

function NotFound() {
  const navigate = useNavigate(); // useNavigate hook to navigate programmatically

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/sign-in'); // use navigate() to redirect to /login
    }, 3000);

    return () => clearTimeout(timer); // clean up the timer when component unmounts
  }, [navigate]);

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
