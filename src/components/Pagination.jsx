import React from 'react';
import { Button, IconButton } from '@material-tailwind/react';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    itemsPerPage,
    totalItems,
}) => {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    // Handle NaN case
    const startDisplay = isNaN(startItem) ? 0 : startItem;
    const endDisplay = isNaN(endItem) ? 0 : endItem;

    return (
        <div className='flex flex-col items-center mt-4'>
            <div className='mb-2'>
                Menampilkan {startDisplay} sampai {endDisplay} dari {totalItems}{' '}
                data
            </div>
            <div className='flex justify-center mt-4'>
                <Button
                    variant='text'
                    className='flex items-center gap-2 rounded-full'
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <ArrowLeftIcon strokeWidth={2} className='h-4 w-4' />{' '}
                    Previous
                </Button>
                <div className='flex items-center gap-2'>
                    {[...Array(totalPages)].map((_, index) => (
                        <IconButton
                            key={index}
                            variant={
                                currentPage === index + 1 ? 'filled' : 'text'
                            }
                            color='gray'
                            onClick={() => onPageChange(index + 1)}
                            className='rounded-full'
                        >
                            {index + 1}
                        </IconButton>
                    ))}
                </div>
                <Button
                    variant='text'
                    className='flex items-center gap-2 rounded-full'
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next <ArrowRightIcon strokeWidth={2} className='h-4 w-4' />
                </Button>
            </div>
        </div>
    );
};

export default Pagination;
