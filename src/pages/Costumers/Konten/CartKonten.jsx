import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import CartItem from '../../../components/BookCartItem';
import api from '../../../auth/AxiosInstance';
import secureLocalStorage from 'react-secure-storage';

const CartKonten = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCartItems =
            JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCartItems);
    }, []);

    const handleBack = () => {
        navigate(-1);
    };

    const handleLoanRequest = async () => {
        // Pastikan cartItems tidak kosong sebelum mengirim permintaan
        if (cartItems.length === 0) {
            console.log('Keranjang belanja kosong.');
            return;
        }

        const loanRequestData = {
            DetailPeminjamanBukus: cartItems.map((book) => ({
                bukuId: book.bukuId, // Pastikan ini sesuai dengan struktur bukuId yang Anda inginkan
            })),
        };

        try {
            const response = await api.post(
                '/api/pinjam/buku',
                loanRequestData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${secureLocalStorage.getItem('accessToken')}`,
                    },
                },
            );

            console.log('Permintaan peminjaman berhasil:', response.data);
            navigate('/dosen/histori-peminjaman-buku');
            // Tambahkan logika untuk menangani hasil dari permintaan peminjaman

            // Optional: Clear cartItems or update local state as needed
            setCartItems([]);
        } catch (error) {
            console.error('Gagal melakukan permintaan peminjaman:', error);
            // Tambahkan logika untuk menangani kesalahan
        }
    };

    const handleCartUpdate = () => {
        const storedCartItems =
            JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCartItems);
    };

    return (
        <div className='p-4 md:p-6'>
            <div className='bg-white p-4 shadow rounded-lg mb-6'>
                {cartItems.map((item, index) => (
                    <CartItem
                        key={index}
                        item={item}
                        onCartUpdate={handleCartUpdate}
                    />
                ))}
            </div>
            <div className='flex justify-between items-center mb-4'>
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
