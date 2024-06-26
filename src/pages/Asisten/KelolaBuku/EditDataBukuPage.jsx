import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar';
import Form from '../../../components/Form';
import SidebarAsisten from '../../../components/SidebarAsisten';
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner } from '@material-tailwind/react';
import api from '../../../auth/AxiosInstance';
import secureLocalStorage from 'react-secure-storage';

function EditDataBukuPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({});
    const [buku, setBuku] = useState({
        bukuId: '',
        kategoriId: '',
        name: '',
        jumlah: '',
        jumlah_tersedia: '',
        image: '',
    });

    const [originalBuku, setOriginalBuku] = useState(null);
    const [categories, setCategories] = useState([]);
    const [imagePreview, setImagePreview] = useState('');
    const BACKEND_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetchData();
        fetchCategories();
    }, [id]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/api/buku/${id}`, {
                headers: {
                    Authorization: `Bearer ${secureLocalStorage.getItem('accessToken')}`,
                },
            });

            const bookData = response.data.data;
            // const imageBuku = `${BACKEND_URL}/${bookData.image.replace(/\\/g, '/')}`;
            let imageBuku = '';
            if (bookData.image) {
                imageBuku = `${BACKEND_URL}/${bookData.image.replace(/\\/g, '/')}`;
            }

            setBuku(bookData);
            setOriginalBuku(bookData);
            setImagePreview(imageBuku);
            setError('');
            console.log(bookData);
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        setLoading(true);
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
        try {
            const formData = new FormData();
            formData.append('kategoriId', buku.kategoriId);
            formData.append('name', buku.name);
            formData.append('deskripsi', buku.deskripsi);
            formData.append('pengarang', buku.pengarang);
            formData.append('tahun_terbit', buku.tahun_terbit);
            formData.append('jumlah', buku.jumlah);
            if (buku.image) {
                formData.append('image', buku.image);
            }

            await api.patch(`/api/buku/${id}/update`, formData, {
                headers: {
                    Authorization: `Bearer ${secureLocalStorage.getItem('accessToken')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/kelola-buku');
        } catch (error) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
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
        if (originalBuku) {
            setBuku(originalBuku);
            setImagePreview(
                `${BACKEND_URL}/${originalBuku.image.replace(/\\/g, '/')}`,
            );
        }
    };

    const handleBack = () => {
        navigate('/kelola-buku');
    };

    const fields = [
        { name: 'image', label: 'Gambar Buku', type: 'file' },
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
                        <button
                            onClick={handleBack}
                            className='px-4 py-2 bg-gray-500 text-white rounded-md shadow hover:bg-gray-600 focus:outline-none focus:ring'
                        >
                            Kembali
                        </button>
                    </div>
                    <div className='container mx-auto p-4 bg-white shadow-md rounded'>
                        <h1 className='text-2xl font-bold mb-4'>
                            Edit Data Buku
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

export default EditDataBukuPage;
