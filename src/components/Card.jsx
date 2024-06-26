import React from 'react';
import { Link } from 'react-router-dom';

function Card({ title, description, link }) {
    return (
        <div className='bg-gradient-to-r from-blue-500 to-blue-800 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out'>
            <div className='p-6'>
                <h3 className='text-2xl font-bold text-white mb-4'>{title}</h3>
                <p className='text-sm text-white mb-6'>{description}</p>
                <Link to={link} className='text-blue-500 hover:text-blue-700'>
                    <button className='bg-white hover:bg-blue-600 text-blue-500 hover:text-white hover:border-white py-2 px-4 rounded-md transition duration-300 ease-in-out'>
                        Selengkapnya
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Card;
