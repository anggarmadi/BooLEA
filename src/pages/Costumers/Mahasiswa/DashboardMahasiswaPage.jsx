import React from 'react';
import Navbar from '../../../components/Navbar';
import SidebarMahasiswa from '../../../components/SidebarMahasiswa';
import DashboardMahasiswaKonten from './DashboardMahasiswaKonten';

function DashboardMahasiswaPage() {
    return (
        <div className='h-screen flex flex-col'>
            <Navbar />
            <div className='flex flex-1 overflow-hidden'>
                <SidebarMahasiswa />
                <div className='flex-1 flex flex-col p-8 bg-gray-100 overflow-y-auto  '>
                    <DashboardMahasiswaKonten />
                </div>
            </div>
        </div>
    );
}

export default DashboardMahasiswaPage;
