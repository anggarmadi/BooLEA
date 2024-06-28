import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
import Form from '../../components/Form';
import { Spinner } from '@material-tailwind/react';
import api from '../../auth/AxiosInstance';
import secureLocalStorage from 'react-secure-storage';

function ChangePasswordPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({});
    const [jasa, setJasa] = useState({
        currentPassword: '',
        password: '',
        confirmPassword: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setJasa((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        setErrors((prevState) => ({
            ...prevState,
            [name]: '',
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        try {
            const data = {
                currentPassword: jasa.currentPassword,
                password: jasa.password,
                confirmPassword: jasa.confirmPassword,
            };

            await api.post(`/api/user/update-password`, data, {
                headers: {
                    Authorization: `Bearer ${secureLocalStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json', // Correct Content-Type for JSON
                },
            });
            navigate(-1);
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.errors
            ) {
                const errorsArray = error.response.data.errors;
                const errorsObject = errorsArray.reduce((acc, message) => {
                    const [field, ...rest] = message.split(' ');
                    let key = field.toLowerCase();
                    // Adjust the key names to match form field names
                    if (key === 'currentpassword') key = 'currentPassword';
                    if (key === 'confirmpassword') key = 'confirmPassword';
                    acc[key] = rest.join(' ');
                    return acc;
                }, {});
                console.log(errorsObject); // Add this line
                setErrors(errorsObject);
            } else {
                setError(
                    error.response?.data?.message || 'Failed to submit data',
                );
            }
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setJasa({
            currentPassword: '',
            password: '',
            confirmPassword: '',
        });
        setErrors({});
    };

    const handleBack = () => {
        navigate(-1);
        console.log('Back button clicked');
    };

    const fields = [
        {
            name: 'currentPassword',
            label: 'Current Password',
            type: 'password',
        },
        { name: 'password', label: 'New Password', type: 'password' },
        {
            name: 'confirmPassword',
            label: 'Confirm New Password',
            type: 'password',
        },
    ];

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
                        {loading ? (
                            <div className='flex justify-center py-10'>
                                <Spinner />
                            </div>
                        ) : error ? (
                            <div className='text-center py-10 text-red-500'>
                                {error}
                            </div>
                        ) : (
                            <Form
                                fields={fields}
                                formData={jasa}
                                onInputChange={handleInputChange}
                                onSubmit={handleSubmit}
                                onReset={handleReset}
                                errors={errors}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangePasswordPage;
