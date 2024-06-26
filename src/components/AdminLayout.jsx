// src/components/AdminLayout.jsx
import React from 'react';
import SidebarAdmin from './SidebarAdmin';
import Navbar from './Navbar';

const AdminLayout = ({ children }) => {
    return (
        <div className='h-screen flex flex-col bg-gray-100'>
            <Navbar />
            <div className='flex flex-1 overflow-hidden'>
                <SidebarAdmin />
                <div className='flex-1 overflow-y-auto p-4'>{children}</div>
            </div>
        </div>
    );
};

export default AdminLayout;
