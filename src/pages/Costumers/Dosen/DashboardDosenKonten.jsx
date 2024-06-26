import React from 'react';
import Card from '../../../components/Card';

const cardsData = [
    {
        title: 'PEMINJAMAN BUKU',
        description:
            'Jelajahi koleksi buku yang kaya dan beragam untuk meningkatkan pengetahuan dan minat Anda. Dari buku referensi, buku teks, hingga novel terbaru, temukan sumber daya yang tepat untuk membantu Anda belajar, berkembang, atau sekadar bersantai dengan membaca.',
        link: '/dosen/katalog-buku',
    },
    {
        title: 'PEMINJAMAN INVENTARIS',
        description:
            'Temukan dan pinjam berbagai macam perangkat dan perlengkapan yang Anda butuhkan untuk proyek, penelitian, atau kegiatan lainnya. Mulai dari komputer, perangkat jaringan, hingga peralatan audiovisual, kami menyediakan inventaris lengkap untuk memenuhi kebutuhan Anda.',
        link: '/dosen/katalog-inventaris',
    },
    {
        title: 'PERMINTAAN JASA',
        description:
            'Permintaan terhadap jasa asisten yang berpengalaman dalam bidang aplication enterprise',
        link: '/dosen/permintaan-jasa',
    },
];

function DashboardDosenKonten() {
    return (
        <div>
            <div className='mb-6 p-6 bg-white shadow-md rounded-lg'>
                <h2 className='text-2xl font-semibold text-gray-800 mb-2'>
                    Selamat Datang di Dashboard Dosen!
                </h2>
                <p className='text-gray-600'>
                    Temukan berbagai layanan yang kami sediakan untuk mendukung
                    aktivitas akademik dan penelitian Anda. Jelajahi dan
                    manfaatkan fasilitas yang tersedia untuk pengalaman belajar
                    yang lebih baik.
                </p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                {cardsData.map((card, index) => (
                    <Card
                        key={index}
                        title={card.title}
                        description={card.description}
                        link={card.link}
                    />
                ))}
            </div>
        </div>
    );
}

export default DashboardDosenKonten;
