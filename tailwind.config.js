import withMT from '@material-tailwind/react/utils/withMT';

const config = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            animation: {
                'fade-in': 'fadeIn 1s ease-in-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 },
                },
            },
        },
    },
    plugins: [],
};

export default withMT(config);
