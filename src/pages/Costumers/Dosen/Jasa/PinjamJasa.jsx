import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../../components/Navbar';
import Form from '../../../../components/Form';
import SidebarAsisten from '../../../../components/SidebarAsisten';
import Button from '../../../../components/Button';
import api from '../../../../auth/AxiosInstance';
import secureLocalStorage from 'react-secure-storage';
import { Spinner } from '@material-tailwind/react';
import SidebarDosen from '../../../../components/SidebarDosen';

function PinjamJasa() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({});
    const [jasa, setJasa] = useState({
        name: '',
        deskripsi: '',
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
                name: jasa.name,
                deskripsi: jasa.deskripsi,
            };

            await api.post(`/api/jasa/pinjam`, data, {
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
        setJasa({
            name: '',
            deskripsi: '',
        });
        setErrors({});
    };

    const handleKembaliClick = () => {
        navigate('/dosen/jasa/riwayat');
    };

    const fields = [
        { name: 'name', label: 'Judul', type: 'text' },
        { name: 'deskripsi', label: 'Deskripsi', type: 'textarea' },
    ];

    return (
        <div className='h-screen flex flex-col'>
            <Navbar />
            <div className='flex flex-1 overflow-hidden'>
                <SidebarDosen />
                <div className='flex-1 flex flex-col p-4 bg-gray-100 overflow-y-auto'>
                    <div className='flex justify-end mb-4'>
                        <Button
                            className='bg-gray-500 text-white'
                            onClick={handleKembaliClick}
                        >
                            Kembali
                        </Button>
                    </div>
                    <div className='container mx-auto p-4 bg-white shadow-md rounded'>
                        <h1 className='text-2xl font-bold mb-4'>
                            Ajukan Peminjaman Jasa
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

export default PinjamJasa;
