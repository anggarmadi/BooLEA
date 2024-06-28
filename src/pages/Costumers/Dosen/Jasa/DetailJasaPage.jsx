import React from 'react';
import DetailJasa from './DetailJasa';
import Navbar from '../../../../components/Navbar';
import SidebarDosen from '../../../../components/SidebarDosen';

function DetailJasaPage() {
    return (
        <div className='h-screen flex flex-col'>
            <Navbar />
            <div className='flex flex-1 overflow-hidden'>
                <SidebarDosen />
                <div className='flex-1 flex flex-col p-4 bg-gray-100 overflow-y-auto'>
                    <DetailJasa />
                </div>
            </div>
        </div>
    );
}

export default DetailJasaPage;
