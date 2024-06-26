import React, { useState } from 'react';
import Button from '../../../components/Button';

const data = [
    {
        nama: 'Syafira Putri Zahra',
        angkatan: 2021,
        keahlian: 'Web Development',
        deskripsi:
            'Layanan peminjaman asisten laboratorium ahli dalam pengembangan web untuk mendukung proyek penelitian Anda. Dengan tim yang berpengalaman dalam teknologi web terbaru, kami siap membantu Anda mengatasi tantangan pengembangan web dan memastikan keberhasilan proyek Anda.',
    },
    {
        nama: 'Yohanda',
        angkatan: 2022,
        keahlian: 'Front end Developer',
        deskripsi:
            'Layanan peminjaman asisten laboratorium yang ahli dalam pengembangan aplikasi perusahaan untuk mendukung proyek penelitian Anda. Tim asisten kami memiliki keahlian yang mendalam dalam merancang, mengembangkan, dan mengimplementasikan solusi perangkat lunak yang kompleks.',
    },
    {
        nama: 'Arieska',
        angkatan: 2023,
        keahlian: 'Back end Developer',
        deskripsi:
            'Layanan peminjaman asisten laboratorium ahli dalam pengembangan aplikasi perusahaan untuk mendukung proyek penelitian Anda. Tim asisten kami memiliki keahlian yang mendalam dalam merancang, mengembangkan, dan mengimplementasikan solusi perangkat lunak yang kompleks.',
    },
];

function DosenPermintaanJasaKonten() {
    const [selectedName, setSelectedName] = useState('');
    const [selectedAngkatan, setSelectedAngkatan] = useState('');
    const [selectedKeahlian, setSelectedKeahlian] = useState('');

    const handleNameChange = (e) => setSelectedName(e.target.value);
    const handleAngkatanChange = (e) => setSelectedAngkatan(e.target.value);
    const handleKeahlianChange = (e) => setSelectedKeahlian(e.target.value);

    const filteredData = data.filter((item) => {
        return (
            (!selectedName ||
                item.nama.toLowerCase().includes(selectedName.toLowerCase())) &&
            (!selectedAngkatan ||
                item.angkatan.toString() === selectedAngkatan) &&
            (!selectedKeahlian || item.keahlian === selectedKeahlian)
        );
    });

    return (
        <div>
            <div className='bg-white p-4 shadow rounded-lg mb-6'>
                <div className='flex flex-wrap mb-4'>
                    <input
                        type='text'
                        placeholder='Nama'
                        className='p-2 border rounded mr-2 mb-2'
                        value={selectedName}
                        onChange={handleNameChange}
                    />
                    <select
                        className='p-2 border rounded mr-2 mb-2'
                        value={selectedAngkatan}
                        onChange={handleAngkatanChange}
                    >
                        <option value=''>Pilih Angkatan</option>
                        {[...new Set(data.map((item) => item.angkatan))].map(
                            (angkatan) => (
                                <option key={angkatan} value={angkatan}>
                                    {angkatan}
                                </option>
                            ),
                        )}
                    </select>
                    <select
                        className='p-2 border rounded mr-2 mb-2'
                        value={selectedKeahlian}
                        onChange={handleKeahlianChange}
                    >
                        <option value=''>Pilih Keahlian</option>
                        {[...new Set(data.map((item) => item.keahlian))].map(
                            (keahlian) => (
                                <option key={keahlian} value={keahlian}>
                                    {keahlian}
                                </option>
                            ),
                        )}
                    </select>
                </div>
            </div>
            <div className='grid grid-cols-1 gap-6'>
                {filteredData.map((item, index) => (
                    <div
                        key={index}
                        className='bg-white shadow-md rounded-lg p-4 flex'
                    >
                        <div>
                            <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                                {item.nama}
                            </h3>
                            <p className='text-gray-600 mb-1'>
                                Angkatan: {item.angkatan}
                            </p>
                            <p className='text-gray-600 mb-1'>
                                Keahlian: {item.keahlian}
                            </p>
                            <p className='text-gray-600 mb-3'>
                                {item.deskripsi}
                            </p>
                            <div className='flex'>
                                <Button className='bg-blue-500 text-white hover:bg-blue-600 mr-2'>
                                    Selengkapnya
                                </Button>
                                <Button className='bg-green-500 text-white hover:bg-green-600'>
                                    Ajukan Permintaan
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DosenPermintaanJasaKonten;
