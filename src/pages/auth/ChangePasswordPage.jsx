import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';

function ChangePasswordPage() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    const handleCurrentPasswordChange = (e) =>
        setCurrentPassword(e.target.value);
    const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
    const handleConfirmPasswordChange = (e) =>
        setConfirmPassword(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('New password and confirmation do not match.');
            return;
        }
        setSuccess('Password successfully changed.');
        setError('');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const handleBack = () => {
        navigate(-1);
        console.log('Back button clicked');
    };

    return (
        <div className='h-screen flex flex-col'>
            <Navbar />
            <div className='flex flex-1 overflow-hidden'>
                <div className='flex-1 flex flex-col p-4 bg-gray-100 overflow-y-auto'>
                    <div className='flex justify-between items-center mb-4'>
                        <h1 className='text-3xl font-bold text-gray-800'>
                            Change Password
                        </h1>
                        <Button
                            onClick={handleBack}
                            className='bg-gray-500 text-white hover:bg-gray-600'
                        >
                            Kembali
                        </Button>
                    </div>
                    <div className='bg-white shadow-md rounded p-6 md:p-8'>
                        {error && (
                            <div className='text-red-500 mb-4'>{error}</div>
                        )}
                        {success && (
                            <div className='text-green-500 mb-4'>{success}</div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className='mb-4'>
                                <label className='block text-gray-700 mb-2'>
                                    Current Password
                                </label>
                                <input
                                    type='password'
                                    value={currentPassword}
                                    onChange={handleCurrentPasswordChange}
                                    className='mt-1 p-3 border rounded w-full'
                                    required
                                />
                            </div>
                            <div className='mb-4'>
                                <label className='block text-gray-700 mb-2'>
                                    New Password
                                </label>
                                <input
                                    type='password'
                                    value={newPassword}
                                    onChange={handleNewPasswordChange}
                                    className='mt-1 p-3 border rounded w-full'
                                    required
                                />
                            </div>
                            <div className='mb-4'>
                                <label className='block text-gray-700 mb-2'>
                                    Confirm New Password
                                </label>
                                <input
                                    type='password'
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    className='mt-1 p-3 border rounded w-full'
                                    required
                                />
                            </div>
                            <div className='flex justify-between mt-6'>
                                <Button
                                    type='reset'
                                    className='bg-gray-500 text-white hover:bg-gray-600'
                                    onClick={() => {
                                        setCurrentPassword('');
                                        setNewPassword('');
                                        setConfirmPassword('');
                                        setError('');
                                        setSuccess('');
                                    }}
                                >
                                    Reset
                                </Button>
                                <Button
                                    type='submit'
                                    className='bg-blue-500 text-white hover:bg-blue-600'
                                >
                                    Change Password
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangePasswordPage;
