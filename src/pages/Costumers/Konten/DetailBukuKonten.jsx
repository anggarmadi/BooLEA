import React, { useEffect, useState } from 'react';
import Button from '../../../components/Button';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../auth/AxiosInstance';
import secureLocalStorage from 'react-secure-storage';
import { Spinner } from '@material-tailwind/react';

function DetailBukuKonten() {
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

    return (
        <div className='bg-white p-6 shadow rounded-lg mb-6 relative'>
            {loading ? (
                <Spinner />
            ) : error ? (
                <div>Error: {error}</div>
            ) : (
                <>
                    <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
                        {buku.name}
                    </h2>
                    <div className='mb-4'>
                        <span className='text-green-600 font-semibold'>
                            {buku.jumlah_tersedia}
                        </span>
                    </div>
                    <div className='flex items-center mb-4'>
                        <div className='mr-4'>
                            <svg
                                className='w-6 h-6 text-gray-600'
                                fill='currentColor'
                                viewBox='0 0 24 24'
                            >
                                <path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' />
                            </svg>
                        </div>
                        <div>
                            <p className='text-gray-600 mb-1'>
                                <strong>Pengarang :</strong> {buku.pengarang}
                            </p>
                        </div>
                    </div>
                    <div className='flex items-center mb-4'>
                        <div className='mr-4'>
                            <svg
                                className='w-6 h-6 text-gray-600'
                                fill='currentColor'
                                viewBox='0 0 24 24'
                            >
                                <path d='M12 7c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zm-1-10h2v5h-2zm0 6h2v2h-2z' />
                            </svg>
                        </div>
                        <div>
                            <p className='text-gray-600 mb-1'>
                                <strong>Tahun Terbit :</strong>{' '}
                                {buku.tahun_terbit}
                            </p>
                        </div>
                    </div>
                    <div className='mb-4'>
                        <p className='text-gray-600 mb-1'>
                            <strong>Deskripsi :</strong>
                        </p>
                        <p className='text-gray-600'>{buku.deskripsi}</p>
                    </div>
                    <div className='flex'>
                        <Button className='bg-green-500 text-white hover:bg-green-600'>
                            Ajukan Peminjaman
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}

export default DetailBukuKonten;
