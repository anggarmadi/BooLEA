import { useState, useEffect } from 'react';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { PuffLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import api from '../../auth/AxiosInstance';
import secureLocalStorage from 'react-secure-storage';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = secureLocalStorage.getItem('accessToken');
        const user = secureLocalStorage.getItem('user');

        if (accessToken && user) {
            const userRole = user.role;
            if (userRole === 'kalab') navigate('/dashboard');
            else if (userRole === 'asisten') navigate('/asisten/dashboard');
            else if (userRole === 'mahasiswa') navigate('/mahasiswa/dashboard');
            else if (userRole === 'dosen') navigate('/dosen/dashboard');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await api.post('/api/sign-in', {
                email,
                password,
            });

            const result = response.data;

            if (response.status === 200) {
                secureLocalStorage.setItem('accessToken', result.accessToken);
                secureLocalStorage.setItem('refreshToken', result.refreshToken);
                secureLocalStorage.setItem('user', result.data);

                if (result.data.role === 'kalab') navigate('/dashboard');
                else if (result.data.role === 'asisten')
                    navigate('/asisten/dashboard');
                else if (result.data.role === 'mahasiswa')
                    navigate('/mahasiswa/dashboard');
                else if (result.data.role === 'dosen')
                    navigate('/dosen/dashboard');
                else navigate('/');

                console.log('Login successful', result);
            } else {
                setError(result.message || 'Login failed');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-col md:flex-row justify-center items-center h-screen p-4 md:p-0'>
            <div className='w-full md:w-1/2 flex justify-center items-center p-8'>
                <div>
                    <Card color='transparent' shadow={false}>
                        <Typography
                            variant='h1'
                            color='blue-gray'
                            className='text-left mb-1'
                        >
                            WELCOME BACK,
                        </Typography>
                        <Typography
                            variant='paragraph'
                            className='text-left mb-1'
                            style={{ color: '#7E7777' }}
                        >
                            Log in now to continue,
                        </Typography>
                        <div className='mt-8 mb-8'>
                            <img
                                src='images/book 1.png'
                                alt='Image'
                                className='w-full h-auto'
                            />
                        </div>
                    </Card>
                </div>
            </div>
            <div className='w-full md:w-1/2 flex justify-center items-center p-8'>
                <div>
                    <Card color='transparent' shadow={false}>
                        <Typography
                            variant='h2'
                            color='blue-gray'
                            className='text-center'
                        >
                            Login
                        </Typography>

                        <form
                            className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96'
                            onSubmit={handleLogin}
                        >
                            <div className='mb-5 flex flex-col gap-6'>
                                <Typography
                                    variant='h6'
                                    color='blue-gray'
                                    className='-mb-5 text-left'
                                >
                                    Email
                                </Typography>
                                <Input
                                    size='lg'
                                    placeholder='name@mail.com'
                                    className='!border-t-blue-gray-200 focus:!border-t-gray-900'
                                    labelProps={{
                                        className:
                                            'before:content-none after:content-none',
                                    }}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Typography
                                    variant='h6'
                                    color='blue-gray'
                                    className='-mb-5 text-left'
                                >
                                    Password
                                </Typography>
                                <Input
                                    type='password'
                                    size='lg'
                                    placeholder='********'
                                    className='!border-t-blue-gray-200 focus:!border-t-gray-900 mb-6'
                                    labelProps={{
                                        className:
                                            'before:content-none after:content-none',
                                    }}
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                            {error && (
                                <Typography
                                    color='red'
                                    className='text-center font-normal'
                                >
                                    {error}
                                </Typography>
                            )}
                            <Button
                                className='mt-6 flex justify-center items-center'
                                fullWidth
                                style={{ backgroundColor: 'blue' }}
                                type='submit'
                                disabled={loading}
                            >
                                {loading ? (
                                    <PuffLoader size={24} color='#ffffff' />
                                ) : (
                                    'Login'
                                )}
                            </Button>

                            <Typography
                                color='gray'
                                className='mt-4 text-center font-normal'
                            >
                                Don't have an account?{' '}
                                <a
                                    href='/register'
                                    className='font-medium'
                                    style={{ color: '#5E8BFF' }}
                                >
                                    Sign Up
                                </a>
                            </Typography>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
