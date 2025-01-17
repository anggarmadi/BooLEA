import React from 'react';
import Navbar from '../../../components/Navbar';
import SidebarAdmin from '../../../components/SidebarAdmin';
import DetailJasa from '../../Costumers/Dosen/Jasa/DetailJasa';

function AdminDetailJasaPage() {
    return (
        <div className='h-screen flex flex-col'>
            <Navbar />
            <div className='flex flex-1 overflow-hidden'>
                <SidebarAdmin />
                <div className='flex-1 flex flex-col p-4 bg-gray-100 overflow-y-auto'>
                    <DetailJasa />
                </div>
            </div>
        </div>
    );
}

export default AdminDetailJasaPage;
