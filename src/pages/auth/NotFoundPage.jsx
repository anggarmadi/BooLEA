import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className='min-h-screen flex flex-col items-center justify-center bg-white'>
            <div className='text-center bg-white p-8 rounded-lg shadow-lg max-w-md animate-fade-in'>
                <h1 className='text-6xl font-bold text-purple-600 mb-4'>404</h1>
                <h2 className='text-2xl font-bold text-gray-800 mb-4'>
                    Page Not Found
                </h2>
                <p className='text-gray-600 mb-6'>
                    Oops! The page you are looking for does not exist. It might
                    have been moved or deleted.
                </p>
                <button
                    onClick={() => navigate(-1)}
                    className='inline-flex items-center bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ease-in-out'
                >
                    <ArrowLeftIcon className='h-5 w-5 mr-2' />
                    Go Back
                </button>
            </div>
        </div>
    );
}

export default NotFoundPage;
