import React from 'react';

const Button = ({ type = 'button', className, onClick, children }) => {
    return (
        <button
            type={type}
            className={`bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200 focus:outline-none focus:ring ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
