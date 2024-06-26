import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SidebarAdmin from '../../../components/SidebarAdmin';
import Navbar from '../../../components/Navbar';
import api from '../../../auth/AxiosInstance';
import secureLocalStorage from 'react-secure-storage';
import { Spinner } from '@material-tailwind/react';

function DetailPeminjamanAsisten() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchData(id);
    }, [id]);

    const fetchData = async (id) => {
        setLoading(true);
        try {
            const response = await api.get(`/api/jasa/pinjam-all/${id}`, {
                headers: {
                    Authorization: `Bearer ${secureLocalStorage.getItem('accessToken')}`,
                },
            });

            setData(response.data);
            setError('');
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='h-screen flex flex-col'>
            <Navbar />
            <div className='flex flex-1 overflow-hidden'>
                <SidebarAdmin />
                <div className='flex-1 flex flex-col p-4 bg-gray-100 overflow-y-auto'>
                    {loading ? (
                        <Spinner />
                    ) : error ? (
                        <div>{error}</div>
                    ) : (
                        <div>
                            <h2 className='text-2xl font-bold mb-4'>
                                Detail Peminjaman Asisten
                            </h2>
                            <p>ID: {data.id}</p>
                            <p>Nama: {data.nama}</p>
                            <p>Tanggal Pinjam: {data.tanggalPinjam}</p>
                            <p>Tanggal Kembali: {data.tanggalKembali}</p>
                            <p>Deskripsi: {data.deskripsi}</p>

                            <button
                                className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'
                                onClick={() => navigate(-1)}
                            >
                                Back
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DetailPeminjamanAsisten;
