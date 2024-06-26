import React, { useState } from 'react';
import SidebarAdmin from '../../../components/SidebarAdmin';
import Navbar from '../../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import Form from '../../../components/Form';
import { Spinner } from '@material-tailwind/react';
import api from '../../../auth/AxiosInstance';
import secureLocalStorage from 'react-secure-storage';

function TambahDataAsistenPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({});

    const [asisten, setAsisten] = useState({
        name: '',
        nim: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAsisten((prevState) => ({
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
                name: asisten.name,
                nim: asisten.nim,
                email: asisten.email,
                password: asisten.password,
                confirmPassword: asisten.confirmPassword,
            };

            await api.post(`/api/create-asisten`, data, {
                headers: {
                    Authorization: `Bearer ${secureLocalStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json', // Correct Content-Type for JSON
                },
            });
            navigate('/dosen/jasa/riwayat');
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.errors
            ) {
                const errorsArray = error.response.data.errors;
                const errorsObject = errorsArray.reduce((acc, message) => {
                    const [field, ...rest] = message.split(' ');
                    acc[field.toLowerCase()] = rest.join(' ');
                    return acc;
                }, {});
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
        setAsisten({
            name: '',
            nim: '',
            email: '',
            password: '',
            confirmPassword: '',
        });
        setErrors({});
    };

    const handleBack = () => {
        navigate(-1);
    };

    const fields = [
        { name: 'name', label: 'Nama', type: 'text' },
        { name: 'nim', label: 'Nomor Asisten', type: 'text' },
        { name: 'email', label: 'Email', type: 'text' },
        { name: 'password', label: 'Password', type: 'password' },
        {
            name: 'confirmPassword',
            label: 'Confrim Password',
            type: 'password',
        },
    ];

    return (
        <div className='h-screen flex flex-col'>
            <Navbar />
            <div className='flex flex-1 overflow-hidden'>
                <SidebarAdmin />
                <div className='flex-1 flex flex-col p-4 bg-gray-100 overflow-y-auto'>
                    <div className='flex justify-end mb-4'>
                        <button
                            onClick={handleBack}
                            className='px-4 py-2 bg-gray-500 text-white rounded-md shadow hover:bg-gray-600 focus:outline-none focus:ring'
                        >
                            Kembali
                        </button>
                    </div>
                    <div className='container mx-auto p-4 bg-white shadow-md rounded'>
                        <h1 className='text-2xl font-bold mb-4'>
                            Tambah Data Asisten
                        </h1>
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
                                formData={asisten}
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

export default TambahDataAsistenPage;
