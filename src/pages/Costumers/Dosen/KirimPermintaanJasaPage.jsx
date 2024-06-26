import React, { useState } from 'react';
import Navbar from '../../../components/Navbar';
import SidebarDosen from '../../../components/SidebarDosen';
import Button from '../../../components/Button';

function KirimPermintaanJasaPage() {
    const [form, setForm] = useState({
        idAsisten: '1244',
        kategoriJasa: 'Pengabdian',
        namaAsisten: 'Syafira Putri Zahra',
        angkatan: '2021',
        keahlian: 'Web Development',
        tujuanPeminjaman: '',
        jadwalPeminjaman: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', form);
    };

    const handleReset = () => {
        setForm({
            idAsisten: '1244',
            kategoriJasa: 'Pengabdian',
            namaAsisten: 'Syafira Putri Zahra',
            angkatan: '2021',
            keahlian: 'Web Development',
            tujuanPeminjaman: '',
            jadwalPeminjaman: '',
        });
    };

    return (
        <div className='h-screen flex flex-col'>
            <Navbar />
            <div className='flex flex-1 overflow-hidden'>
                <SidebarDosen />
                <div className='flex-1 flex flex-col p-4 bg-gray-100 overflow-y-auto'>
                    <div className='flex justify-between items-center mb-4'>
                        <h1 className='text-3xl font-bold text-black-800'>
                            Permintaan Jasa
                        </h1>
                    </div>
                    <div className='bg-white p-6 shadow rounded-lg'>
                        <form onSubmit={handleSubmit} className='space-y-4'>
                            <div>
                                <label className='block text-gray-700'>
                                    ID Asisten
                                </label>
                                <input
                                    type='text'
                                    name='idAsisten'
                                    value={form.idAsisten}
                                    onChange={handleChange}
                                    className='w-full p-2 border rounded'
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className='block text-gray-700'>
                                    Kategori Jasa
                                </label>
                                <select
                                    name='kategoriJasa'
                                    value={form.kategoriJasa}
                                    onChange={handleChange}
                                    className='w-full p-2 border rounded'
                                >
                                    <option value='Pengabdian'>
                                        Pengabdian
                                    </option>
                                    {/* Add other categories if needed */}
                                </select>
                            </div>
                            <div>
                                <label className='block text-gray-700'>
                                    Nama Asisten
                                </label>
                                <input
                                    type='text'
                                    name='namaAsisten'
                                    value={form.namaAsisten}
                                    onChange={handleChange}
                                    className='w-full p-2 border rounded'
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className='block text-gray-700'>
                                    Angkatan
                                </label>
                                <input
                                    type='text'
                                    name='angkatan'
                                    value={form.angkatan}
                                    onChange={handleChange}
                                    className='w-full p-2 border rounded'
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className='block text-gray-700'>
                                    Keahlian
                                </label>
                                <input
                                    type='text'
                                    name='keahlian'
                                    value={form.keahlian}
                                    onChange={handleChange}
                                    className='w-full p-2 border rounded'
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className='block text-gray-700'>
                                    Tujuan Peminjaman
                                </label>
                                <input
                                    type='text'
                                    name='tujuanPeminjaman'
                                    value={form.tujuanPeminjaman}
                                    onChange={handleChange}
                                    className='w-full p-2 border rounded'
                                />
                            </div>
                            <div>
                                <label className='block text-gray-700'>
                                    Jadwal Peminjaman
                                </label>
                                <input
                                    type='date'
                                    name='jadwalPeminjaman'
                                    value={form.jadwalPeminjaman}
                                    onChange={handleChange}
                                    className='w-full p-2 border rounded'
                                />
                            </div>
                            <div className='flex justify-between'>
                                <Button
                                    type='submit'
                                    className='bg-blue-500 text-white hover:bg-blue-600'
                                >
                                    Kirim
                                </Button>
                                <Button
                                    type='button'
                                    onClick={handleReset}
                                    className='bg-gray-500 text-white hover:bg-gray-600'
                                >
                                    Reset
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default KirimPermintaanJasaPage;
