import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../../../components/Navbar';
import SidebarDosen from '../../../../components/SidebarDosen';
import Button from '../../../../components/Button';
import api from '../../../../auth/AxiosInstance';
import secureLocalStorage from 'react-secure-storage';
import { Spinner } from '@material-tailwind/react';

function DetailJasa() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({});

    const handleKembaliClick = () => {
        navigate('/dosen/jasa/riwayat');
    };

    const [data, setData] = useState({
        jasaId: '',
        name: '',
        deskripsi: '',
        status: '',
    });

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/api/jasa/pinjam/${id}`, {
                headers: {
                    Authorization: `Bearer ${secureLocalStorage.getItem('accessToken')}`,
                },
            });
            const jasaData = response.data.data;
            console.log(jasaData);
            setData(jasaData);
            setError('');
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='text-3xl font-bold text-black-800'>
                    Detail Jasa
                </h1>
                <Button
                    onClick={handleKembaliClick}
                    className='bg-gray-500 hover:bg-gray-700 text-white p-2 rounded'
                >
                    Kembali
                </Button>
            </div>
            {loading ? (
                <Spinner />
            ) : error ? (
                <div>Error: {error}</div>
            ) : (
                <>
                    <div className='bg-white p-6 shadow rounded-lg mb-6 relative'>
                        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
                            {data.name}
                        </h2>
                        <div className='mb-4'>
                            <p className='text-gray-600 mb-1'>
                                <strong>Status :</strong>{' '}
                                <span className='text-green-600 font-semibold'>
                                    {data.status}
                                </span>
                            </p>
                        </div>
                        <div className='mb-4'>
                            <p className='text-gray-600 mb-1'>
                                <strong>Deskripsi :</strong>
                            </p>
                            <p className='text-gray-600'>{data.deskripsi}</p>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default DetailJasa;
