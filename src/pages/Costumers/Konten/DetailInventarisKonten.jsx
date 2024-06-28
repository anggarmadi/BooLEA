import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../auth/AxiosInstance';
import secureLocalStorage from 'react-secure-storage';
import { Spinner } from '@material-tailwind/react';

function DetailInventarisKonten() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({});
    const [buku, setBuku] = useState({
        inventarisId: '',
        name: '',
        deskripsi: '',
        jumlah_tersedia: '',
        image: '',
    });

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

            const bookData = response.data.data;
            // const imageBuku = `${BACKEND_URL}/${bookData.image.replace(/\\/g, '/')}`;
            let imageBuku = '';
            if (bookData.image) {
                imageBuku = `${BACKEND_URL}/${bookData.image.replace(/\\/g, '/')}`;
            }

            setBuku(bookData);
            setImagePreview(imageBuku);
            setError('');
            console.log(bookData);
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to fetch data');
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
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt='Preview'
                                className='mt-4 w-32 h-32 object-cover'
                            />
                        )}
                        <span
                            className={`font-semibold ${buku.jumlah_tersedia > 0 ? 'text-green-600' : 'text-red-600'}`}
                        >
                            <strong>Jumlah Tersedia :</strong>{' '}
                            {buku.jumlah_tersedia}
                        </span>
                    </div>
                    <div className='mb-4'>
                        <p className='text-gray-600 mb-1'>
                            <strong>Deskripsi :</strong>
                        </p>
                        <p className='text-gray-600'>{buku.deskripsi}</p>
                    </div>
                    {/* <div className='flex'>
                        <Button className='bg-green-500 text-white hover:bg-green-600'>
                            Ajukan Peminjaman
                        </Button>
                    </div> */}
                </>
            )}
        </div>
    );
}

export default DetailInventarisKonten;
