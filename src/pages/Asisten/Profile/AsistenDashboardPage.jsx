import React from 'react';
import CardStats from '../../../components/CardStats';
import Navbar from '../../../components/Navbar';
import SidebarAdmin from '../../../components/SidebarAdmin';
import {
    UserGroupIcon,
    AcademicCapIcon,
    UserPlusIcon,
} from '@heroicons/react/24/solid';
import { Typography } from '@material-tailwind/react';
import SidebarAsisten from '../../../components/SidebarAsisten';

function AsistenDashboardPage() {
    return (
        <div className='h-screen flex flex-col bg-gray-50'>
            <Navbar />
            <div className='flex flex-1 overflow-hidden'>
                <SidebarAsisten />
                <div className='flex-1 flex flex-col p-6 overflow-y-auto'>
                    <div className='mb-8'>
                        <Typography
                            variant='h1'
                            color='blue-gray'
                            className='text-left mb-4 font-bold'
                        >
                            Welcome Back, Asisten!
                        </Typography>
                        <p className='text-gray-600'>
                            Here's a quick overview of the current statistics.
                        </p>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                        <CardStats
                            icon={UserGroupIcon}
                            title='Jumlah Buku'
                            count='10'
                            lastUpdated='Last Updated: 14 Dec, 2023'
                            changePercentage='+3%'
                            color='text-green-400'
                            link='/kelola-buku'
                        />
                        <CardStats
                            icon={AcademicCapIcon}
                            title='Jumlah Inventaris'
                            count='50'
                            lastUpdated='Last Updated: 20 Jan, 2024'
                            changePercentage='+12%'
                            color='text-green-400'
                            link='/kelola-inventaris'
                        />
                        <CardStats
                            icon={UserPlusIcon}
                            title='Jumlah Peminjaman Buku'
                            count='30'
                            lastUpdated='Last Updated: 24 Jan, 2024'
                            changePercentage='+11%'
                            color='text-green-400'
                            link='/kelola-peminjaman-buku'
                        />
                        <CardStats
                            icon={UserPlusIcon}
                            title='Jumlah Peminjaman Inventaris'
                            count='30'
                            lastUpdated='Last Updated: 24 Jan, 2024'
                            changePercentage='+11%'
                            color='text-green-400'
                            link='/kelola-peminjaman-inventaris'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AsistenDashboardPage;
