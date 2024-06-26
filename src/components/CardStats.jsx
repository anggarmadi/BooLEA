import React from 'react';
import { useNavigate } from 'react-router-dom';

const CardStats = ({ icon: Icon, title, count, link }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (link) {
            navigate(link);
        }
    };

    return (
        <div
            className='flex flex-col bg-gradient-to-r from-blue-500 to-blue-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer'
            onClick={handleClick}
        >
            <div className='flex justify-between items-center mb-4'>
                <div className='text-2xl text-white font-semibold'>{title}</div>
                <div className='w-10 h-10 flex justify-center items-center bg-white rounded-full'>
                    <Icon className='w-6 h-6 text-blue-500' />
                </div>
            </div>
            <div className='text-5xl font-bold text-white'>{count}</div>
            <div className='flex text-sm text-gray-200 mt-2 justify-end items-center'>
                View Details
            </div>
        </div>
    );
};

export default CardStats;
