import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import Form from '../../../components/Form';
import SidebarAsisten from '../../../components/SidebarAsisten';
import Button from '../../../components/Button';
import api from '../../../auth/AxiosInstance';
import secureLocalStorage from 'react-secure-storage';
import { Spinner } from '@material-tailwind/react';

function TambahDataInventarisPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({});
    const [inventaris, setInventaris] = useState({
        name: '',
        jumlah: '',
        deskripsi: '',
        image: null,
    });

    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        setLoading(false); // Assuming no initial data fetching is required
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInventaris((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        setErrors((prevState) => ({
            ...prevState,
            [name]: '',
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
            setInventaris((prevState) => ({
                ...prevState,
                image: file,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        try {
            const formData = new FormData();
            if (inventaris.image) {
                formData.append('image', inventaris.image);
            }
            formData.append('name', inventaris.name);
            formData.append('jumlah', inventaris.jumlah);
            formData.append('deskripsi', inventaris.deskripsi);

            await api.post(`/api/inventaris`, formData, {
                headers: {
                    Authorization: `Bearer ${secureLocalStorage.getItem('accessToken')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/kelola-inventaris');
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
                    error.response?.data?.message || 'Failed to update data',
                );
            }
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setInventaris({
            name: '',
            jumlah: '',
            deskripsi: '',
            image: null,
        });
        setImagePreview('');
        setErrors({});
    };

    const handleKembaliClick = () => {
        navigate('/kelola-inventaris');
    };

    const fields = [
        { name: 'image', label: 'Gambar', type: 'file' },
        { name: 'name', label: 'Nama', type: 'text' },
        { name: 'jumlah', label: 'Jumlah', type: 'number' },
        { name: 'deskripsi', label: 'Deskripsi', type: 'textarea' },
    ];

    return (
        <div className='h-screen flex flex-col'>
            <Navbar />
            <div className='flex flex-1 overflow-hidden'>
                <SidebarAsisten />
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
                            Tambah Data Inventaris
                        </h1>
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt='Preview'
                                className='mt-4 w-32 h-32 object-cover'
                            />
                        )}
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
                                formData={inventaris}
                                onInputChange={handleInputChange}
                                onImageChange={handleImageChange}
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

export default TambahDataInventarisPage;
