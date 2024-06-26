import React from 'react';
import CardStats from '../components/CardStats';
import Navbar from '../components/Navbar';
import SidebarAdmin from '../components/SidebarAdmin';
import {
    UserGroupIcon,
    AcademicCapIcon,
    UserPlusIcon,
} from '@heroicons/react/24/solid';
import { Typography } from '@material-tailwind/react';

function DashboardPage() {
    return (
        <div className='h-screen flex flex-col bg-gray-50'>
            <Navbar />
            <div className='flex flex-1 overflow-hidden'>
                <SidebarAdmin />
                <div className='flex-1 flex flex-col p-6 overflow-y-auto'>
                    <div className='mb-8'>
                        <Typography
                            variant='h1'
                            color='blue-gray'
                            className='text-left mb-4 font-bold'
                        >
                            Welcome Back, Admin!
                        </Typography>
                        <p className='text-gray-600'>
                            Here's a quick overview of the current statistics.
                        </p>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                        <CardStats
                            icon={UserGroupIcon}
                            title='Jumlah Asisten'
                            count='10'
                            lastUpdated='Last Updated: 14 Dec, 2023'
                            changePercentage='+3%'
                            color='text-green-400'
                        />
                        <CardStats
                            icon={AcademicCapIcon}
                            title='Jumlah Mahasiswa'
                            count='50'
                            lastUpdated='Last Updated: 20 Jan, 2024'
                            changePercentage='+12%'
                            color='text-green-400'
                        />
                        <CardStats
                            icon={UserPlusIcon}
                            title='Jumlah Peminjaman Jasa'
                            count='30'
                            lastUpdated='Last Updated: 24 Jan, 2024'
                            changePercentage='+11%'
                            color='text-green-400'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;
