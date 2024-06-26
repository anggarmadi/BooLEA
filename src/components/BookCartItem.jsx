import React, { useState, useEffect } from 'react';
import Button from './Button';

const CartItem = ({ item, isSelected, onSelectChange, onCartUpdate }) => {
    const { name, pengarang, tahun_terbit, jumlah_tersedia, bukuId } = item;
    const [quantity, setQuantity] = useState(item.quantity || 1);
    const maxQuantity = 1;

    useEffect(() => {
        const storedCartItems =
            JSON.parse(localStorage.getItem('cartItems')) || [];
        const currentItem = storedCartItems.find(
            (cartItem) => cartItem.bukuId === bukuId,
        );
        if (currentItem) {
            setQuantity(currentItem.quantity);
        }
    }, [bukuId]);

    const handleDecrease = () => {
        if (quantity > 0) {
            updateQuantity(quantity - 1);
        }
    };

    const handleIncrease = () => {
        if (quantity < maxQuantity) {
            updateQuantity(quantity + 1);
        }
    };

    const updateQuantity = (newQuantity) => {
        if (newQuantity <= maxQuantity) {
            setQuantity(newQuantity);
            const storedCartItems =
                JSON.parse(localStorage.getItem('cartItems')) || [];
            const updatedCartItems = storedCartItems.map((cartItem) =>
                cartItem.bukuId === bukuId
                    ? { ...cartItem, quantity: newQuantity }
                    : cartItem,
            );
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        }
    };

    const handleRemoveFromCart = () => {
        const storedCartItems =
            JSON.parse(localStorage.getItem('cartItems')) || [];
        const updatedCartItems = storedCartItems.filter(
            (cartItem) => cartItem.bukuId !== bukuId,
        );
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        if (onCartUpdate) onCartUpdate();
    };

    return (
        <div className='flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg shadow-sm mb-4 bg-white w-full'>
            <div className='flex items-center w-full md:w-auto mb-4 md:mb-0'>
                <input
                    type='checkbox'
                    className='mr-4'
                    checked={isSelected}
                    onChange={(e) => onSelectChange(e.target.checked)}
                />
                <div>
                    <h2 className='text-lg font-semibold text-gray-800 mb-2'>
                        {name}
                    </h2>
                    <span className='text-green-600 font-semibold'>
                        <strong>Tersedia:</strong> {jumlah_tersedia}
                    </span>
                    <p className='text-gray-600'>
                        <strong>Pengarang:</strong> {pengarang}
                    </p>
                    <p className='text-gray-600'>
                        <strong>Tahun Terbit:</strong> {tahun_terbit}
                    </p>
                </div>
            </div>
            <div className='flex items-center'>
                <Button
                    className='px-2 py-1 bg-gray-300 text-gray-800 rounded'
                    onClick={handleDecrease}
                >
                    -
                </Button>
                <span className='px-4 py-2 border rounded'>{quantity}</span>
                <Button
                    className='px-2 py-1 bg-gray-300 text-gray-800 rounded'
                    onClick={handleIncrease}
                >
                    +
                </Button>
                <Button
                    className='ml-4 px-2 py-1 bg-red-500 text-white rounded'
                    onClick={handleRemoveFromCart}
                >
                    Hapus
                </Button>
            </div>
        </div>
    );
};

export default CartItem;
