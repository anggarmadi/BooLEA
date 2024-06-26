import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    CheckCircleIcon,
    ExclamationCircleIcon,
    InformationCircleIcon,
} from '@heroicons/react/24/solid';
import api from '../../auth/AxiosInstance';

function AccountActivatedPage() {
    const { token } = useParams();
    const [activationStatus, setActivationStatus] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const activateAccount = async () => {
            try {
                const response = await api.get(`/api/users/activate/${token}`);
                if (response.data.success) {
                    setActivationStatus('success');
                } else if (response.data.message === 'Account already active') {
                    setActivationStatus('alreadyActive');
                } else {
                    setActivationStatus('failed');
                    setErrorMessage(
                        response.data.errors
                            ? response.data.errors[0]
                            : 'Account activation failed. Please try again.',
                    );
                }
            } catch (error) {
                setActivationStatus('failed');
                setErrorMessage(
                    'An error occurred during account activation. Please try again later.',
                );
            }
        };
        activateAccount();
    }, [token]);

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500'>
            <div className='bg-white p-8 rounded-lg shadow-lg max-w-md text-center'>
                {activationStatus === 'success' ? (
                    <>
                        <CheckCircleIcon className='h-16 w-16 text-green-500 mx-auto mb-4' />
                        <h1 className='text-3xl font-bold text-gray-800 mb-4'>
                            Account Activated!
                        </h1>
                        <p className='text-gray-600 mb-6'>
                            Your account has been successfully activated. You
                            can now log in to your account.
                        </p>
                        <Link to='/'>
                            <button className='bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ease-in-out'>
                                Go to Login
                            </button>
                        </Link>
                    </>
                ) : activationStatus === 'alreadyActive' ? (
                    <>
                        <InformationCircleIcon className='h-16 w-16 text-blue-500 mx-auto mb-4' />
                        <h1 className='text-3xl font-bold text-gray-800 mb-4'>
                            Account Already Activated
                        </h1>
                        <p className='text-gray-600 mb-6'>
                            Your account is already active. You can log in to
                            your account.
                        </p>
                        <Link to='/'>
                            <button className='bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ease-in-out'>
                                Go to Login
                            </button>
                        </Link>
                    </>
                ) : (
                    <>
                        <ExclamationCircleIcon className='h-16 w-16 text-red-500 mx-auto mb-4' />
                        <h1 className='text-3xl font-bold text-gray-800 mb-4'>
                            Activation Failed
                        </h1>
                        <p className='text-gray-600 mb-6'>{errorMessage}</p>
                        <Link to='/'>
                            <button className='bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ease-in-out'>
                                Go to Login
                            </button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default AccountActivatedPage;
