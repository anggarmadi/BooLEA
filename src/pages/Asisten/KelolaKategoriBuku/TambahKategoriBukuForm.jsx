import React, { useEffect, useState } from 'react';
import Form from '../../../components/Form';
import api from '../../../auth/AxiosInstance';
import secureLocalStorage from 'react-secure-storage';
import { Spinner } from '@material-tailwind/react';

const TambahKategoriBukuForm = ({ onClose, fetchData, selectedKategori }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({});
    const [kategori, setKategori] = useState({
        name: '',
    });

    useEffect(() => {
        if (selectedKategori) {
            setKategori({
                name: selectedKategori.name || '',
            });
        }
    }, [selectedKategori]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setKategori((prevState) => ({
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
                name: kategori.name,
            };

            if (selectedKategori) {
                await api.patch(
                    `/api/kategori/${selectedKategori.kategoriId}/update`,
                    data,
                    {
                        headers: {
                            Authorization: `Bearer ${secureLocalStorage.getItem('accessToken')}`,
                            'Content-Type': 'application/json', // Correct Content-Type for JSON
                        },
                    },
                );
            } else {
                await api.post(`/api/kategori`, data, {
                    headers: {
                        Authorization: `Bearer ${secureLocalStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json', // Correct Content-Type for JSON
                    },
                });
            }

            fetchData(); // Refresh data
            onClose(); // Close modal
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
        setKategori({
            name: '',
        });
        setErrors({});
    };

    const fields = [{ name: 'name', label: 'Nama', type: 'text' }];

    return (
        <div className='container mx-auto p-4 bg-white shadow-md rounded'>
            <h1 className='text-2xl font-bold mb-4'>
                {selectedKategori
                    ? 'Edit Data Inventaris'
                    : 'Tambah Data Inventaris'}
            </h1>
            {loading ? (
                <div className='flex justify-center py-10'>
                    <Spinner />
                </div>
            ) : error ? (
                <div className='text-center py-10 text-red-500'>{error}</div>
            ) : (
                <Form
                    fields={fields}
                    formData={kategori}
                    onInputChange={handleInputChange}
                    onSubmit={handleSubmit}
                    onReset={handleReset}
                    errors={errors}
                />
            )}
        </div>
    );
};

export default TambahKategoriBukuForm;
