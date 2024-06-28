import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import CartItem from '../../../components/BookCartItem';
import api from '../../../auth/AxiosInstance';
import secureLocalStorage from 'react-secure-storage';

const CartKonten = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('bookCartItems')) || [];
        setCartItems(storedCartItems);
        setSelectedItems(new Array(storedCartItems.length).fill(false));
    }, []);

    const handleLoanRequest = async () => {
        const selectedCartItems = cartItems.filter((item, index) => selectedItems[index]);
        

        if (selectedCartItems.length === 0) {
            console.log('Keranjang belanja kosong.');
            setErrorMessage('Keranjang belanja kosong.');
            return;
        }

        const loanRequestData = {
            DetailPeminjamanBukus: selectedCartItems.map((book) => ({
                bukuId: book.bukuId,
            })),
        };

        try {
            const response = await api.post('/api/pinjam/buku', loanRequestData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${secureLocalStorage.getItem('accessToken')}`,
                },
            });

            console.log('Permintaan peminjaman berhasil:', response.data);
            const user = secureLocalStorage.getItem('user');
            if (user) {
                const userRole = user.role;
                if (userRole === 'mahasiswa') {
                    navigate('/mahasiswa/histori-peminjaman-buku');
                } else if (userRole === 'dosen') {
                    navigate('/dosen/histori-peminjaman-buku');
                }
            }
            setErrorMessage('');
            setCartItems([]);
        } catch (error) {
            setErrorMessage('Gagal melakukan permintaan peminjaman.');
            console.error('Gagal melakukan permintaan peminjaman:', error);
        }
    };

    const handleCartUpdate = () => {
        const storedCartItems = JSON.parse(localStorage.getItem('bookCartItems')) || [];
        setCartItems(storedCartItems);
    };

    const handleSelectChange = (index, checked) => {
        const updatedSelectedItems = [...selectedItems];
        updatedSelectedItems[index] = checked;
        setSelectedItems(updatedSelectedItems);
    };

    return (
        <div className='p-4 md:p-6'>
            <div className='bg-white p-4 shadow rounded-lg mb-6'>
                {cartItems.map((item, index) => (
                    <CartItem
                        key={index}
                        item={item}
                        isSelected={selectedItems[index]}
                        onSelectChange={(checked) => handleSelectChange(index, checked)}
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
            {errorMessage && (
                <div className='text-red-500 mt-4'>
                    {errorMessage}
                </div>
            )}
        </div>
    );
};

export default CartKonten;
