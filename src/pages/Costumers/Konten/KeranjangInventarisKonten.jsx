import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import InventoryItem from '../../../components/InventoryCartItem';

const KeranjangInventarisKonten = () => {
    const navigate = useNavigate();
    const [inventoryItems, setInventoryItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        const storedCartItems =
            JSON.parse(localStorage.getItem('cartItems')) || [];
        setInventoryItems(storedCartItems);
        setSelectedItems(new Array(storedCartItems.length).fill(false));
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

    const handleLoanRequest = () => {
        console.log('Loan request submitted');
    };
    const handleCartUpdate = () => {
        const storedCartItems =
            JSON.parse(localStorage.getItem('cartItems')) || [];
        setInventoryItems(storedCartItems);
        setSelectedItems(new Array(storedCartItems.length).fill(false));
    };

    return (
        <div className='p-4 md:p-6'>
            <div className='bg-white p-4 shadow rounded-lg mb-6'>
                {inventoryItems.map((item, index) => (
                    <InventoryItem
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
