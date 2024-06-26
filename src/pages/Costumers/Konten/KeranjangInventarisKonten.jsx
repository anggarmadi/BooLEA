import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import InventoryItem from '../../../components/InventoryCartItem';
import api from '../../../auth/AxiosInstance';
import secureLocalStorage from 'react-secure-storage';

const KeranjangInventarisKonten = () => {
    const navigate = useNavigate();
    const [inventoryItems, setInventoryItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [jumlahItems, setJumlahItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        const storedCartItems =
            JSON.parse(localStorage.getItem('cartItems')) || [];

        // Konversi inventarisId dan jumlah menjadi string jika diperlukan
        const formattedInventoryItems = storedCartItems.map((item) => ({
            ...item,
            inventarisId: String(item.inventarisId),
            jumlah: String(item.jumlah),
        }));

        setInventoryItems(formattedInventoryItems);
        setSelectedItems(new Array(formattedInventoryItems.length).fill(false));
        setJumlahItems(new Array(formattedInventoryItems.length).fill('1')); // Default jumlah as string
    }, []);

    const handleSelectAll = (checked) => {
        setSelectAll(checked);
        setSelectedItems(new Array(inventoryItems.length).fill(checked));
    };

    const handleItemSelectChange = (index, checked) => {
        const updatedSelectedItems = [...selectedItems];
        updatedSelectedItems[index] = checked;
        setSelectedItems(updatedSelectedItems);

        setSelectAll(updatedSelectedItems.every(Boolean));
    };

    const handleJumlahChange = (index, value) => {
        const updatedJumlahItems = [...jumlahItems];
        updatedJumlahItems[index] = String(value); // Konversi ke string
        setJumlahItems(updatedJumlahItems);
    };

    const handleLoanRequest = async () => {
        const selectedInventaris = inventoryItems.filter(
            (item, index) => selectedItems[index],
        );

        if (selectedInventaris.length === 0) {
            console.log('Tidak ada inventaris yang dipilih untuk peminjaman.');
            return;
        }

        const loanRequestData = {
            DetailPeminjamanInventaris: selectedInventaris.map(
                (item, index) => ({
                    inventarisId: String(item.inventarisId), // Pastikan inventarisId sebagai string
                    jumlah: String(jumlahItems[index]), // Pastikan jumlah sebagai string
                }),
            ),
        };

        console.log('Loan request submitted:', loanRequestData);
        // Implement logic to submit loan request with loanRequestData
        try {
            const response = await api.post(
                '/api/pinjam/inventaris',
                loanRequestData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${secureLocalStorage.getItem('accessToken')}`,
                    },
                },
            );

            console.log('Permintaan peminjaman berhasil:', response.data);
            // Tambahkan logika untuk menangani hasil dari permintaan peminjaman
            navigate('/dosen/histori-peminjaman-inventaris');

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

        const formattedInventoryItems = storedCartItems.map((item) => ({
            ...item,
            inventarisId: String(item.inventarisId),
            jumlah: String(item.jumlah),
        }));

        setInventoryItems(formattedInventoryItems);
        setSelectedItems(new Array(formattedInventoryItems.length).fill(false));
        setJumlahItems(new Array(formattedInventoryItems.length).fill('1')); // Reset jumlahItems to default '1'
    };

    return (
        <div className='p-4 md:p-6'>
            <div className='bg-white p-4 shadow rounded-lg mb-6'>
                {inventoryItems.map((item, index) => (
                    <div
                        key={index}
                        className='flex items-center justify-between mb-4'
                    >
                        <InventoryItem
                            item={item}
                            isSelected={selectedItems[index]}
                            onSelectChange={(checked) =>
                                handleItemSelectChange(index, checked)
                            }
                            onCartUpdate={handleCartUpdate}
                        />
                        <input
                            type='number'
                            min='1'
                            value={jumlahItems[index]}
                            onChange={(e) =>
                                handleJumlahChange(index, e.target.value)
                            }
                            className='p-2 border border-gray-300 rounded w-20 text-center'
                        />
                    </div>
                ))}
            </div>
            <div className='flex justify-between items-center'>
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

export default KeranjangInventarisKonten;
