import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../../../components/Navbar';
import Button from '../../../components/Button';
import { useNavigate } from 'react-router-dom';
import api from '../../../auth/AxiosInstance';
import secureLocalStorage from 'react-secure-storage';
import { Spinner } from '@material-tailwind/react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import SidebarDosen from '../../../components/SidebarDosen';
import SidebarMahasiswa from '../../../components/SidebarMahasiswa';

function MahasiswaProfile() {
    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        name: '',
        nim: '',
        email: '',
        profileImage: null,
    });
    const [dragging, setDragging] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [showCropper, setShowCropper] = useState(false);
    const [imageToCrop, setImageToCrop] = useState(null);
    const cropperRef = useRef(null);
    const BACKEND_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await api.get('/api/user/profile', {
                headers: {
                    Authorization: `Bearer ${secureLocalStorage.getItem('accessToken')}`,
                },
            });
            const imagePath = response.data.data.profileImage;
            const imageUrl = `${BACKEND_URL}/${imagePath}`;

            setProfile({
                name: response.data.data.name,
                nim: response.data.data.nim,
                email: response.data.data.email,
                profileImage: imageUrl,
            });
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch profile');
            setLoading(false);
        }
    };

    const updateProfileImage = async (imageFile) => {
        const formData = new FormData();
        formData.append('profileImage', imageFile);

        try {
            await api.patch('/api/profile/edit', formData, {
                headers: {
                    Authorization: `Bearer ${secureLocalStorage.getItem('accessToken')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Profile image updated successfully');
            fetchProfile();
        } catch (error) {
            setError('Failed to update profile image');
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const imageFile = e.target.files[0];
            setImageToCrop(URL.createObjectURL(imageFile));
            setShowCropper(true);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => setDragging(false);

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const imageFile = e.dataTransfer.files[0];
            setImageToCrop(URL.createObjectURL(imageFile));
            setShowCropper(true);
        }
    };

    const handleCrop = () => {
        if (cropperRef.current) {
            cropperRef.current.cropper.getCroppedCanvas().toBlob((blob) => {
                const imageUrl = URL.createObjectURL(blob);
                setProfile((prevProfile) => ({
                    ...prevProfile,
                    profileImage: imageUrl,
                }));
                updateProfileImage(blob);
            });
            setShowCropper(false);
        }
    };

    const handleCancelCrop = () => {
        setShowCropper(false);
        setImageToCrop(null);
    };

    const handleChangePassword = () => {
        navigate('/ubah-password');
    };

    return (
        <div className='h-screen flex flex-col'>
            <Navbar />
            <div className='flex flex-1 overflow-hidden'>
                <SidebarMahasiswa />
                <div className='flex-1 flex flex-col p-4 bg-gray-100 overflow-y-auto'>
                    <div className='flex justify-between items-center mb-4'>
                        <h1 className='text-lg font-bold text-gray-800'>
                            Profile
                        </h1>
                    </div>
                    <div className='bg-white shadow-md rounded p-6 md:p-8'>
                        {loading ? (
                            <div className='flex justify-center py-10'>
                                <Spinner />
                            </div>
                        ) : error ? (
                            <p className='text-red-500'>{error}</p>
                        ) : (
                            <>
                                <div className='flex flex-col items-center mb-6'>
                                    <div
                                        className={`w-32 h-32 rounded-full overflow-hidden mb-4 border-2 ${
                                            dragging
                                                ? 'border-blue-500'
                                                : 'border-gray-300'
                                        }`}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                        onClick={() =>
                                            document
                                                .getElementById('fileUpload')
                                                .click()
                                        }
                                    >
                                        <img
                                            src={
                                                profile.profileImage ||
                                                'https://via.placeholder.com/150'
                                            }
                                            alt='Profile'
                                            className='w-full h-full object-cover cursor-pointer'
                                        />
                                    </div>
                                    <input
                                        type='file'
                                        className='hidden'
                                        id='fileUpload'
                                        onChange={handleImageChange}
                                    />
                                    <p className='text-gray-600 mt-2'>
                                        Click the image to change profile photo
                                    </p>
                                </div>
                                <div className='mb-4 w-full'>
                                    <label className='block text-gray-700 mb-2'>
                                        Nama Lengkap
                                    </label>
                                    <input
                                        type='text'
                                        name='name'
                                        value={profile.name}
                                        className='mt-1 p-3 border rounded w-full bg-gray-100'
                                        readOnly
                                    />
                                </div>
                                <div className='mb-4 w-full'>
                                    <label className='block text-gray-700 mb-2'>
                                        Nomor Asisten
                                    </label>
                                    <input
                                        type='text'
                                        name='nim'
                                        value={profile.nim}
                                        className='mt-1 p-3 border rounded w-full bg-gray-100'
                                        readOnly
                                    />
                                </div>
                                <div className='mb-4 w-full'>
                                    <label className='block text-gray-700 mb-2'>
                                        Email
                                    </label>
                                    <input
                                        type='email'
                                        name='email'
                                        value={profile.email}
                                        className='mt-1 p-3 border rounded w-full bg-gray-100'
                                        readOnly
                                    />
                                </div>
                                <div className='flex justify-between mt-6'>
                                    <Button
                                        className='bg-blue-500 text-white hover:bg-blue-700'
                                        onClick={handleChangePassword}
                                    >
                                        Ubah Password
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {showCropper && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
                    <div className='bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2'>
                        <h2 className='text-lg font-semibold mb-4'>
                            Crop Image
                        </h2>
                        <Cropper
                            ref={cropperRef}
                            src={imageToCrop}
                            style={{ height: 400, width: '100%' }}
                            aspectRatio={1}
                            viewMode={1}
                            guides={false}
                            background={false}
                        />
                        <div className='mt-4 flex justify-end'>
                            <Button
                                className='bg-red-500 text-white mr-2'
                                onClick={handleCancelCrop}
                            >
                                Cancel
                            </Button>
                            <Button
                                className='bg-green-500 text-white'
                                onClick={handleCrop}
                            >
                                Crop
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MahasiswaProfile;
