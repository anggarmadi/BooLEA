import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

function EmailSent() {
    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500'>
            <div className='bg-white p-8 rounded-lg shadow-lg max-w-md text-center'>
                <CheckCircleIcon className='h-16 w-16 text-green-500 mx-auto mb-4' />
                <h1 className='text-3xl font-bold text-gray-800 mb-4'>
                    Email Sent!
                </h1>
                <p className='text-gray-600 mb-6'>
                    We have sent an email to your inbox. Please check your email
                    activate your account.
                </p>
                {/* <Link to='/'>
                    <button className='bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ease-in-out'>
                        Go to Login
                    </button>
                </Link> */}
            </div>
        </div>
    );
}

export default EmailSent;
