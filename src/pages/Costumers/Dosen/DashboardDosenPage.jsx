import React from 'react';
import Navbar from '../../../components/Navbar';
import SidebarMahasiswa from '../../../components/SidebarMahasiswa';
import DashboardMahasiswaKonten from '../Mahasiswa/DashboardMahasiswaKonten';
import SidebarDosen from '../../../components/SidebarDosen';
import DashboardDosenKonten from './DashboardDosenKonten';

function DashboardDosenPage() {
    return (
        <div className='h-screen flex flex-col'>
            <Navbar />
            <div className='flex flex-1 overflow-hidden'>
                <SidebarDosen />
                <div className='flex-1 flex flex-col p-4 bg-gray-100 overflow-y-auto'>
                    <DashboardDosenKonten />
                </div>
            </div>
        </div>
    );
}

export default DashboardDosenPage;
