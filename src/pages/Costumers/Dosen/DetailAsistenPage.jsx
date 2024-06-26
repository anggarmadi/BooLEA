import React from 'react';
import Navbar from '../../../components/Navbar';
import SidebarDosen from '../../../components/SidebarDosen';
import Button from '../../../components/Button';

function DetailJasaAsistenPage() {
    return (
        <div className='h-screen flex flex-col'>
            <Navbar />
            <div className='flex flex-1 overflow-hidden'>
                <SidebarDosen />
                <div className='flex-1 flex flex-col p-4 bg-gray-100 overflow-y-auto'>
                    <div className='flex justify-between items-center mb-4'>
                        <h1 className='text-3xl font-bold text-black-800'>
                            Dashboard Dosen
                        </h1>
                    </div>
                    <div className='bg-white p-6 shadow rounded-lg'>
                        <div className='flex flex-col md:flex-row justify-between items-start md:items-center'>
                            <div className='flex items-center mb-4 md:mb-0'>
                                <img
                                    src='/path/to/image.jpg' // Update this path with the actual image path
                                    alt='Profile'
                                    className='w-24 h-24 rounded-full mr-4'
                                />
                                <div>
                                    <p className='text-xl font-semibold'>
                                        Syafira Putri Zahra
                                    </p>
                                    <p className='text-gray-600'>
                                        Angkatan: 2021
                                    </p>
                                    <p className='text-gray-600'>
                                        Keahlian: Web Development
                                    </p>
                                    <p className='text-gray-600'>
                                        Kontak: 0849338822221
                                    </p>
                                </div>
                            </div>
                            <Button className='bg-green-500 text-white hover:bg-green-600'>
                                Ajukan Peminjaman
                            </Button>
                        </div>
                        <div className='mt-6'>
                            <p className='text-green-500 font-semibold'>
                                Tersedia
                            </p>
                            <p className='text-gray-600'>ID Asisten: 1244</p>
                            <p className='text-gray-600'>
                                Jadwal Ketersediaan: 23/03/2024
                            </p>
                        </div>
                        <div className='mt-6'>
                            <h2 className='text-lg font-semibold mb-2'>
                                Riwayat Pengalaman
                            </h2>
                            <ul className='list-disc list-inside'>
                                <li className='mb-2'>
                                    <p className='font-semibold'>
                                        Junior Developer Perusahaan: Tech
                                        Solutions Co.
                                    </p>
                                    <p>Periode: Juni 2022 - Januari 2023</p>
                                    <p className='text-gray-600'>
                                        Deskripsi: Bertanggung jawab dalam
                                        pengembangan aplikasi web menggunakan
                                        teknologi Node.js dan React.js.
                                    </p>
                                </li>
                                <li>
                                    <p className='font-semibold'>
                                        Internship IT Support Perusahaan: ABC
                                        Corporation
                                    </p>
                                    <p>Periode: Januari 2021 - Mei 2021</p>
                                    <p className='text-gray-600'>
                                        Deskripsi: Memberikan dukungan teknis
                                        dalam penanganan masalah perangkat keras
                                        dan perangkat lunak.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailJasaAsistenPage;
