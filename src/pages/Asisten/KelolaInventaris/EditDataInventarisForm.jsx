import React, { useState, useEffect } from 'react';
import Form from '../../../components/Form';
import Button from '../../../components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../auth/AxiosInstance';
import secureLocalStorage from 'react-secure-storage';
import { Spinner } from '@material-tailwind/react';
import Navbar from '../../../components/Navbar';
import SidebarAsisten from '../../../components/SidebarAsisten';

function EditDataInventarisForm() {
    const { id } = useParams();
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

    const [originalInventaris, setOriginalInventaris] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const BACKEND_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/api/inventaris/${id}`, {
                headers: {
                    Authorization: `Bearer ${secureLocalStorage.getItem('accessToken')}`,
                },
            });

            const inventarisData = response.data.data;
            let imageInventaris = '';
            if (inventarisData.image) {
                imageInventaris = `${BACKEND_URL}/${inventarisData.image.replace(/\\/g, '/')}`;
            }

            setInventaris(inventarisData);
            setOriginalInventaris(inventarisData);
            setImagePreview(imageInventaris);
            setError('');
            console.log(inventarisData);
        } catch (error) {
            console.error('Fetch error:', error);
            setError(error.response?.data?.message || 'Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInventaris((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        // setErrors((prevState) => ({
        //     ...prevState,
        //     [name]: '',
        // }));
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
        try {
            const formData = new FormData();
            formData.append('name', inventaris.name);
            formData.append('deskripsi', inventaris.deskripsi);
            formData.append('jumlah', inventaris.jumlah);
            if (inventaris.image) {
                formData.append('image', inventaris.image);
            }

            await api.patch(`/api/inventaris/${id}/update`, formData, {
                headers: {
                    Authorization: `Bearer ${secureLocalStorage.getItem('accessToken')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/kelola-inventaris');
        } catch (error) {
            console.error('Submit error:', error);
            if (error.response?.data?.errors) {
                const errorsArray = error.response.data.errors;
                const errorsObject = errorsArray.reduce((acc, message) => {
                    const [field, ...rest] = message.split(' ');
                    acc[field.toLowerCase()] = rest.join(' ');
                    return acc;
                }, {});
                setErrors(errorsObject);
                console.log(errorsObject);
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
        if (originalInventaris) {
            setInventaris(originalInventaris);
            if (originalInventaris.image) {
                setImagePreview(
                    `${BACKEND_URL}/${originalInventaris.image.replace(/\\/g, '/')}`,
                );
            }
        }
    };

    const handleBack = () => {
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
                            onClick={handleBack}
                        >
                            Kembali
                        </Button>
                    </div>
                    <div className='container mx-auto p-4 bg-white shadow-md rounded'>
                        <h1 className='text-2xl font-bold mb-4'>
                            Edit Data Inventaris
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

export default EditDataInventarisForm;
