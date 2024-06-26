import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import CartItem from '../../../components/BookCartItem';

const CartKonten = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        const storedCartItems =
            JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCartItems);
        setSelectedItems(new Array(storedCartItems.length).fill(false));
    }, []);

    const handleBack = () => {
        navigate(-1);
    };

    const handleSelectAll = (checked) => {
        setSelectAll(checked);
        setSelectedItems(new Array(cartItems.length).fill(checked));
    };

    const handleItemSelectChange = (index, checked) => {
        const updatedSelectedItems = [...selectedItems];
        updatedSelectedItems[index] = checked;
        setSelectedItems(updatedSelectedItems);
        setSelectAll(updatedSelectedItems.every(Boolean));
    };

    const handleLoanRequest = () => {
        const selectedBooks = cartItems.filter(
            (item, index) => selectedItems[index],
        );
        console.log('Selected books for loan request:', selectedBooks);
        // Implement logic to submit loan request with selectedBooks
    };

    const handleCartUpdate = () => {
        const storedCartItems =
            JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCartItems);
        setSelectedItems(new Array(storedCartItems.length).fill(false));
    };

    return (
        <div className='p-4 md:p-6'>
            <div className='bg-white p-4 shadow rounded-lg mb-6'>
                {cartItems.map((item, index) => (
                    <CartItem
                        key={index}
                        item={item}
                        isSelected={selectedItems[index]}
                        onSelectChange={(checked) =>
                            handleItemSelectChange(index, checked)
                        }
                        onCartUpdate={handleCartUpdate}
                    />
                ))}
            </div>
            <div className='flex justify-between items-center mb-4'>
                <label className='flex items-center'>
                    <input
                        type='checkbox'
                        checked={selectAll}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className='mr-2'
                    />
                    <span>Select All</span>
                </label>
                <Button
                    onClick={handleLoanRequest}
                    className='bg-green-500 text-white hover:bg-green-600 p-2 rounded'
                >
                    Ajukan Peminjaman
                </Button>
            </div>
        </div>
    );
};

export default CartKonten;
