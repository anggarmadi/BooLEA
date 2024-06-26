import React, { useState, useEffect } from 'react';
import Button from './Button';

const InventoryItem = ({ item, isSelected, onSelectChange, onCartUpdate }) => {
    const { name, deskripsi, jumlah_tersedia, inventarisId } = item;
    const [quantity, setQuantity] = useState(item.quantity);

    useEffect(() => {
        const storedCartItems =
            JSON.parse(localStorage.getItem('cartItems')) || [];
        const currentItem = storedCartItems.find(
            (cartItem) => cartItem.inventarisId === inventarisId,
        );
        if (currentItem) {
            setQuantity(currentItem.quantity);
        }
    }, [inventarisId]);

    const handleDecrease = () => {
        if (quantity > 0) {
            updateQuantity(quantity - 1);
        }
    };

    const handleIncrease = () => {
        if (quantity < jumlah_tersedia) {
            updateQuantity(quantity + 1);
        }
    };

    const updateQuantity = (newQuantity) => {
        setQuantity(newQuantity);
        const storedCartItems =
            JSON.parse(localStorage.getItem('cartItems')) || [];
        const updatedCartItems = storedCartItems.map((cartItem) =>
            cartItem.inventarisId === inventarisId
                ? { ...cartItem, quantity: newQuantity }
                : cartItem,
        );
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    const handleRemove = () => {
        const storedCartItems =
            JSON.parse(localStorage.getItem('cartItems')) || [];
        const updatedCartItems = storedCartItems.filter(
            (cartItem) => cartItem.inventarisId !== inventarisId,
        );
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        setQuantity(0);
        if (onCartUpdate) onCartUpdate();
    };

    return (
        <div className='flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg shadow-sm mb-4 bg-white w-full'>
            <div className='flex items-center w-full md:w-auto mb-4 md:mb-0'>
                <input
                    type='checkbox'
                    checked={isSelected}
                    onChange={(e) => onSelectChange(e.target.checked)}
                    className='mr-2'
                />
                <div className='flex flex-col'>
                    <span className='font-medium'>{name}</span>
                    <span className='text-sm text-gray-600'>{deskripsi}</span>
                    <p className='text-black-600 font-semibold'>
                        <span>Jumlah Tersedia: {jumlah_tersedia}</span>
                    </p>
                </div>
            </div>
            <div className='flex items-center'>
                <Button
                    className='px-2 py-1 bg-gray-300 text-gray-800 rounded'
                    onClick={handleDecrease}
                    disabled={quantity === 0}
                >
                    -
                </Button>
                <span className='px-4 py-2 border rounded'>{quantity}</span>
                <Button
                    className='px-2 py-1 bg-gray-300 text-gray-800 rounded'
                    onClick={handleIncrease}
                    disabled={quantity >= jumlah_tersedia}
                >
                    +
                </Button>
                <Button
                    className='px-2 py-1 bg-red-500 text-white rounded ml-2'
                    onClick={handleRemove}
                >
                    Hapus
                </Button>
            </div>
        </div>
    );
};

export default InventoryItem;
