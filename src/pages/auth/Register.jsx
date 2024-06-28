import { useState } from 'react';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../auth/AxiosInstance';

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [nim, setNim] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Validasi form
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const response = await api.post('/api/sign-up', {
                email,
                password,
                confirmPassword,
                name,
                nim,
            });

            const result = response.data;

            if (response.status === 201) {
                navigate(`/email-sent/${email}`);
                console.log('Register successful', result);
            } else {
                setError(result.message || 'Register failed');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError(
                    error.response.data.errors
                        ? error.response.data.errors.join(', ')
                        : error.response.data.message,
                );
            } else {
                setError('An error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-col md:flex-row justify-center items-center h-screen'>
            <div className='w-full md:w-1/2 justify-center items-center p-8'>
                <Typography
                    variant='h1'
                    color='blue-gray'
                    className='text-left mb-1'
                >
                    WELCOME,
                </Typography>
                <Typography
                    variant='paragraph'
                    color='blue-gray'
                    className='text-left mb-1'
                >
                    Sign up now to continue ,
                </Typography>
                <img
                    src='images/book 1.png'
                    alt='Image'
                    className='w-full h-auto'
                />
            </div>
            <div className='w-full md:w-1/2 flex justify-center items-center p-8 '>
                <div>
                    <Card color='transparent' shadow={false}>
                        <Typography
                            variant='h2'
                            color='blue-gray'
                            className='text-center'
                        >
                            Register
                        </Typography>

                        <form
                            className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96'
                            onSubmit={handleRegister}
                        >
                            <div className='mb-5 flex flex-col gap-6'>
                                <Typography
                                    variant='h6'
                                    color='blue-gray'
                                    className='-mb-5 text-left'
                                >
                                    Nama
                                </Typography>
                                <Input
                                    size='base'
                                    placeholder='Nama'
                                    className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
                                    labelProps={{
                                        className:
                                            'before:content-none after:content-none',
                                    }}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <Typography
                                    variant='h6'
                                    color='blue-gray'
                                    className='-mb-5 text-left'
                                >
                                    NIM/NIP
                                </Typography>
                                <Input
                                    size='base'
                                    placeholder='2111...'
                                    className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
                                    labelProps={{
                                        className:
                                            'before:content-none after:content-none',
                                    }}
                                    value={nim}
                                    onChange={(e) => setNim(e.target.value)}
                                />
                                <Typography
                                    variant='h6'
                                    color='blue-gray'
                                    className='-mb-5 text-left'
                                >
                                    Email
                                </Typography>
                                <Input
                                    size='base'
                                    placeholder='name@mail.com'
                                    className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
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
                                    size='base'
                                    placeholder='********'
                                    className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
                                    labelProps={{
                                        className:
                                            'before:content-none after:content-none',
                                    }}
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <Typography
                                    variant='h6'
                                    color='blue-gray'
                                    className='-mb-5 text-left'
                                >
                                    Confirm Password
                                </Typography>
                                <Input
                                    type='password'
                                    size='base'
                                    placeholder='********'
                                    className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
                                    labelProps={{
                                        className:
                                            'before:content-none after:content-none',
                                    }}
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
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
                                className='mt-6'
                                fullWidth
                                style={{ backgroundColor: 'blue' }}
                                type='submit'
                                disabled={loading}
                            >
                                {loading ? 'Signing up...' : 'Sign Up'}
                            </Button>

                            <Typography
                                color='gray'
                                className='mt-4 text-center font-normal'
                            >
                                Already have an account?{' '}
                                <Link
                                    to='/login'
                                    className='font-medium'
                                    style={{ color: '#5E8BFF' }}
                                >
                                    Sign in
                                </Link>
                            </Typography>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
