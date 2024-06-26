import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/Navbar';
import Form from '../../../components/Form';
import SidebarAsisten from '../../../components/SidebarAsisten';
import Button from '../../../components/Button';
import api from '../../../auth/AxiosInstance';
import secureLocalStorage from 'react-secure-storage';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@material-tailwind/react';

function TambahDataBukuPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({});
    const [buku, setBuku] = useState({
        bukuId: '',
        kategoriId: '',
        name: '',
        deskripsi: '',
        pengarang: '',
        tahun_terbit: '',
        jumlah: '',
        image: null,
    });

    const [categories, setCategories] = useState([]);
    const [imagePreview, setImagePreview] = useState('');
    const BACKEND_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await api.get('/api/kategori', {
                headers: {
                    Authorization: `Bearer ${secureLocalStorage.getItem('accessToken')}`,
                },
            });
            const categoriesData = response.data.data;
            setCategories(categoriesData);

            if (categoriesData.length > 0 && !buku.kategoriId) {
                setBuku((prevState) => ({
                    ...prevState,
                    kategoriId: categoriesData[0].kategoriId,
                }));
            }

            console.log(`Kategori: ${response.data.data}`);
        } catch (error) {
            setError(
                error.response?.data?.message || 'Failed to fetch categories',
            );
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBuku((prevState) => ({
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
            setBuku((prevState) => ({
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
            formData.append('bukuId', buku.bukuId);
            formData.append('kategoriId', buku.kategoriId);
            formData.append('name', buku.name);
            formData.append('deskripsi', buku.deskripsi);
            formData.append('pengarang', buku.pengarang);
            formData.append('tahun_terbit', buku.tahun_terbit);
            formData.append('jumlah', buku.jumlah);
            if (buku.image) {
                formData.append('image', buku.image);
            }

            await api.post(`/api/buku`, formData, {
                headers: {
                    Authorization: `Bearer ${secureLocalStorage.getItem('accessToken')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/kelola-buku');
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.errors
            ) {
                const errorsArray = error.response.data.errors;
                const errorsObject = errorsArray.reduce((acc, message) => {
                    const [field, ...rest] = message.split(' ');
                    acc[field] = rest.join(' ');
                    return acc;
                }, {});
                setErrors(errorsObject);
                console.log('API Errors:', errorsObject);
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
        setBuku({
            bukuId: '',
            kategoriId: '',
            name: '',
            deskripsi: '',
            pengarang: '',
            tahun_terbit: '',
            jumlah: '',
            image: null,
        });
        setImagePreview('');
        setErrors({});
    };

    const handleBack = () => {
        navigate('/kelola-buku');
    };

    const fields = [
        { name: 'image', label: 'Gambar Buku', type: 'file' },
        { name: 'bukuId', label: 'ID Buku', type: 'text' },
        {
            name: 'kategoriId',
            label: 'Kategori Buku',
            type: 'select',
            options: categories.map((category) => ({
                value: category.kategoriId,
                label: category.name,
            })),
        },
        { name: 'name', label: 'Judul Buku', type: 'text' },
        { name: 'deskripsi', label: 'Deskripsi', type: 'textarea' },
        { name: 'pengarang', label: 'Pengarang', type: 'text' },
        { name: 'tahun_terbit', label: 'Tahun Terbit', type: 'text' },
        { name: 'jumlah', label: 'Jumlah Buku', type: 'number' },
    ];

    return (
        <div className='h-screen flex flex-col'>
            <Navbar />
            <div className='flex flex-1 overflow-hidden'>
                <SidebarAsisten />
                <div className='flex-1 flex flex-col p-4 bg-gray-100 overflow-y-auto'>
                    <div className='flex justify-end mb-4'>
                        <Button onClick={handleBack}>Kembali</Button>
                    </div>
                    <div className='container mx-auto p-4 bg-white shadow-md rounded'>
                        <h1 className='text-2xl font-bold mb-4'>
                            Tambah Data Buku
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
                                formData={buku}
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

export default TambahDataBukuPage;
