import React from 'react';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import './App.css';
import LoginPage from './pages/auth/Login';
import RegisterPage from './pages/auth/Register';
import LandingPage from './pages/Landing';
import DashboardPage from './pages/Dashboard';
import AdminDataAsistenPage from './pages/Admin/DataAsisten/DataAsistenPage';
import AdminDataMahasiswaPage from './pages/Admin/DataMahasiswa/DataMahasiswaPage';
import AdminPeminjamanAsistenPage from './pages/Admin/PeminjamanAsisten/PeminjamanAsistenPage';
import TambahDataAsistenPage from './pages/Admin/DataAsisten/TambahDataAsistenPage';
import EditDataAsistenPage from './pages/Admin/DataAsisten/EditDataAsistenPage';
import KelolaBukuPage from './pages/Asisten/KelolaBuku/KelolaBukuPage';
import TambahDataBukuPage from './pages/Asisten/KelolaBuku/TambahDataBukuPage';
import EditDataBukuPage from './pages/Asisten/KelolaBuku/EditDataBukuPage';
import KelolaKategoriBukuPage from './pages/Asisten/KelolaKategoriBuku/KelolaKategoriBukuPage';
import KelolaPeminjamanBukuPage from './pages/Asisten/PeminjamanBuku/KelolaPeminjamanBukuPage';
import ProtectedRoute from './auth/ProtectedRoute';
import AccountActivatedPage from './pages/auth/AccountActivatedPage';
import NotFoundPage from './pages/auth/NotFoundPage';
import EmailSent from './pages/auth/EmailSent';
import KelolaInventarisPage from './pages/Asisten/KelolaInventaris/KelolaInventarisPage';
import TambahDataInventarisPage from './pages/Asisten/KelolaInventaris/TambahDataInventarisPage';
import KelolaPeminjamanInventarisPage from './pages/Asisten/PeminjamanInventaris/KelolaPeminjamanInventarisPage';
import AsistenProfilePage from './pages/Asisten/Profile/AsistenProfile';
import DashboardMahasiswaPage from './pages/Costumers/Mahasiswa/DashboardMahasiswaPage';
import MahasiswaProfilePage from './pages/Costumers/Mahasiswa/MahasiswaProfile';
import ChangePasswordPage from './pages/auth/ChangePasswordPage';
import MahasiswaKatalogBukuPage from './pages/Costumers/Mahasiswa/KatalogBukuPage';
import DosenKatalogBukuPage from './pages/Costumers/Dosen/KatalogBukuPage';
import DosenKatalogInventarisPage from './pages/Costumers/Dosen/KatalogInventarisPage';
import MahasiswaKatalogInventarisPage from './pages/Costumers/Mahasiswa/KatalogInventarisPage';
import DetailBukuPage from './pages/Costumers/Dosen/DetailBukuPage';
import DosenCartPage from './pages/Costumers/Dosen/CartPage';
import DosenKeranjangInventarisPage from './pages/Costumers/Dosen/KeranjangInventarisPage';
import MahasiswaKeranjangBukuPage from './pages/Costumers/Mahasiswa/KeranjangBukuPage';
import PublicRoute from './auth/PublicRoute';
import AdminLayout from './components/AdminLayout';
import EditDataInventarisForm from './pages/Asisten/KelolaInventaris/EditDataInventarisForm';
import JasaPage from './pages/Costumers/Dosen/Jasa/JasaPage';
import PinjamJasa from './pages/Costumers/Dosen/Jasa/PinjamJasa';
import DashboardDosenPage from './pages/Costumers/Dosen/DashboardDosenPage';
import DosenPermintaanJasaPage from './pages/Costumers/Dosen/PermintaanJasaPage';
import DetailJasaAsistenPage from './pages/Costumers/Dosen/DetailAsistenPage';
import KirimPermintaanJasaPage from './pages/Costumers/Dosen/KirimPermintaanJasaPage';
import DosenHistoryPeminjamanBukuPage from './pages/Costumers/Dosen/HistoryPeminjamanBukuPage';
import MahasiswaHistoryPeminjamanBukuPage from './pages/Costumers/Mahasiswa/HistoryPeminajmanBukuPage';
import DosenHistoryPeminjamanInventarisPage from './pages/Costumers/Dosen/HistoryPeminjamanInventarisPage';
import MahasiswaHistoryPeminjamanInventarisPage from './pages/Costumers/Mahasiswa/HistoryPeminjamanInventarisPage';
import AsistenDashboardPage from './pages/Asisten/Profile/AsistenDashboardPage';
import DetailInventarisPage from './pages/Costumers/DetailInventarisPage';
import DosenProfile from './pages/Costumers/Dosen/DosenProfile';
import AdminDataDosenPage from './pages/Admin/DataDosen/DataDosen';
import MahasiswaKeranjangInventarisPage from './pages/Costumers/Mahasiswa/KeranjangInventarisPage';
import DosenDetailInventarisPage from './pages/Costumers/Dosen/DetailInventarisPage';
import MahasiswaDetailInventarisPage from './pages/Costumers/Mahasiswa/DetailInventarisPage';
import MahasiswaDetailBukuPage from './pages/Costumers/Mahasiswa/DetailBukuPage';
import DetailJasaPage from './pages/Costumers/Dosen/Jasa/DetailJasaPage';
import AdminDetailJasaPage from './pages/Admin/PeminjamanAsisten/DetailPeminjamanAsisten';

const router = createBrowserRouter([
    {
        path: '/register',
        element: <RegisterPage />,
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
    {
        path: '/login',
        element: (
            // <PublicRoute>
            <LoginPage />
            // </PublicRoute>
        ),
    },
    {
        path: '/',
        element: <LandingPage />,
    },
    {
        path: '/dashboard',
        element: (
            <ProtectedRoute allowedRoles={['kalab']}>
                <DashboardPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/data-asisten',
        element: (
            <ProtectedRoute allowedRoles={['kalab']}>
                <AdminLayout>
                    <AdminDataAsistenPage />
                </AdminLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/data-mahasiswa',
        element: (
            <ProtectedRoute allowedRoles={['kalab']}>
                <AdminLayout>
                    <AdminDataMahasiswaPage />
                </AdminLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/data-dosen',
        element: (
            <ProtectedRoute allowedRoles={['kalab']}>
                <AdminLayout>
                    <AdminDataDosenPage />
                </AdminLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/adminpeminjamanasisten',
        element: (
            <ProtectedRoute allowedRoles={['kalab']}>
                <AdminPeminjamanAsistenPage />
            </ProtectedRoute>
        ),
    },
    // {
    //     path: '/detail-peminjaman-asisten/:id',
    //     element: (
    //         <ProtectedRoute allowedRoles={['kalab']}>
    //             <DetailPeminjamanAsisten />
    //         </ProtectedRoute>
    //     ),
    // },
    {
        path: '/jasa/:id',
        element: (
            <ProtectedRoute allowedRoles={['kalab']}>
                <AdminDetailJasaPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/asisten/dashboard',
        element: (
            <ProtectedRoute allowedRoles={['asisten']}>
                <AsistenDashboardPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/data-asisten/tambah',
        element: (
            <ProtectedRoute allowedRoles={['kalab']}>
                <TambahDataAsistenPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/editdataasisten',
        element: (
            <ProtectedRoute allowedRoles={['kalab']}>
                <EditDataAsistenPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/kelola-buku',
        element: (
            <ProtectedRoute allowedRoles={['asisten']}>
                <KelolaBukuPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/kelola-buku/tambah',
        element: (
            <ProtectedRoute allowedRoles={['asisten']}>
                <TambahDataBukuPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/kelola-buku/:id/edit',
        element: (
            <ProtectedRoute allowedRoles={['asisten']}>
                <EditDataBukuPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/kelola-kategori-buku',
        element: (
            <ProtectedRoute allowedRoles={['asisten']}>
                <KelolaKategoriBukuPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/kelola-peminjaman-buku',
        element: (
            <ProtectedRoute allowedRoles={['asisten']}>
                <KelolaPeminjamanBukuPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/account-activate/:token',
        element: <AccountActivatedPage />,
    },
    {
        path: 'email-sent/:email',
        element: <EmailSent />,
    },
    {
        path: '/kelola-inventaris',
        element: (
            <ProtectedRoute allowedRoles={['asisten']}>
                <KelolaInventarisPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/kelola-inventaris/tambah',
        element: (
            <ProtectedRoute allowedRoles={['asisten']}>
                <TambahDataInventarisPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/kelola-inventaris/:id/edit',
        element: <EditDataInventarisForm />,
    },
    {
        path: '/kelola-peminjaman-inventaris',
        element: <KelolaPeminjamanInventarisPage />,
    },
    {
        path: '/profile',
        element: (
            <ProtectedRoute allowedRoles={['asisten']}>
                <AsistenProfilePage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/ubah-password',
        element: <ChangePasswordPage />,
    },
    {
        path: '/mahasiswa/dashboard',
        element: (
            <ProtectedRoute allowedRoles={['mahasiswa']}>
                <DashboardMahasiswaPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/mahasiswa-profile',
        element: (
            <ProtectedRoute allowedRoles={['mahasiswa']}>
                <MahasiswaProfilePage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/mahasiswa/katalog-buku',
        element: (
            <ProtectedRoute allowedRoles={['mahasiswa']}>
                <MahasiswaKatalogBukuPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/mahasiswa/katalog-inventaris',
        element: (
            <ProtectedRoute allowedRoles={['mahasiswa']}>
                <MahasiswaKatalogInventarisPage />
            </ProtectedRoute>
        ),
    },
    // {
    //     path: '/mahasiswa/katalog-inventaris/detail',
    //     element: (
    //         <ProtectedRoute allowedRoles={['mahasiswa']}>
    //             <DetailInventarisPage />,
    //         </ProtectedRoute>
    //     ),
    // },
    // {
    //     path: '/mahasiswa/katalog-inventaris/keranjang',
    //     element: (
    //         <ProtectedRoute allowedRoles={['mahasiswa']}>
    //             <MahasiswaKeranjangBukuPage />
    //         </ProtectedRoute>
    //     ),
    // },
    {
        path: '/mahasiswa/histori-peminjaman-buku',
        element: (
            <ProtectedRoute allowedRoles={['mahasiswa']}>
                <MahasiswaHistoryPeminjamanBukuPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/mahasiswa/histori-peminjaman-inventaris',
        element: (
            <ProtectedRoute allowedRoles={['mahasiswa']}>
                <MahasiswaHistoryPeminjamanInventarisPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/mahasiswa/katalog-buku/cart',
        element: (
            <ProtectedRoute allowedRoles={['mahasiswa']}>
                <MahasiswaKeranjangBukuPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/mahasiswa/katalog-inventaris/cart',
        element: (
            <ProtectedRoute allowedRoles={['mahasiswa']}>
                <MahasiswaKeranjangInventarisPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/mahasiswa/detail-buku/:id',
        element: (
            <ProtectedRoute allowedRoles={['mahasiswa']}>
                <MahasiswaDetailBukuPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/mahasiswa/detail-inventaris/:id',
        element: (
            <ProtectedRoute allowedRoles={['mahasiswa']}>
                <MahasiswaDetailInventarisPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/dosen/dashboard',
        element: (
            <ProtectedRoute allowedRoles={['dosen']}>
                <DashboardDosenPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/dosen/katalog-buku',
        element: (
            <ProtectedRoute allowedRoles={['dosen']}>
                <DosenKatalogBukuPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/dosen/katalog-inventaris',
        element: (
            <ProtectedRoute allowedRoles={['dosen']}>
                <DosenKatalogInventarisPage />
            </ProtectedRoute>
        ),
    },
    // {
    //     path: '/dosen/katalog-inventaris/detail',
    //     element: (
    //         <ProtectedRoute allowedRoles={['dosen']}>
    //             <DetailInventarisPage />
    //         </ProtectedRoute>
    //     ),
    // },
    {
        path: '/dosen/detail-buku/:id',
        element: (
            <ProtectedRoute allowedRoles={['dosen']}>
                <DetailBukuPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/dosen/katalog-buku/cart',
        element: (
            <ProtectedRoute allowedRoles={['dosen']}>
                <DosenCartPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/dosen/katalog-inventaris/cart',
        element: (
            <ProtectedRoute allowedRoles={['dosen']}>
                <DosenKeranjangInventarisPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/dosen/jasa/riwayat',
        element: (
            <ProtectedRoute allowedRoles={['dosen']}>
                <JasaPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/dosen/jasa/riwayat/:id',
        element: (
            <ProtectedRoute allowedRoles={['dosen']}>
                <DetailJasaPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/dosen/jasa/pinjam',
        element: (
            <ProtectedRoute allowedRoles={['dosen']}>
                <PinjamJasa />
            </ProtectedRoute>
        ),
    },
    {
        path: '/dosen/permintaan-jasa/detail',
        element: (
            <ProtectedRoute allowedRoles={['dosen']}>
                <DetailJasaAsistenPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/dosen/permintaan-jasa/kirim-permintaan',
        element: (
            <ProtectedRoute allowedRoles={['dosen']}>
                <KirimPermintaanJasaPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/dosen/histori-peminjaman-buku',
        element: (
            <ProtectedRoute allowedRoles={['dosen']}>
                <DosenHistoryPeminjamanBukuPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/dosen/histori-peminjaman-inventaris',
        element: (
            <ProtectedRoute allowedRoles={['dosen']}>
                <DosenHistoryPeminjamanInventarisPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/dosen/profile',
        element: (
            <ProtectedRoute allowedRoles={['dosen']}>
                <DosenProfile />
            </ProtectedRoute>
        ),
    },
    {
        path: '/dosen/detail-inventaris/:id',
        element: (
            <ProtectedRoute allowedRoles={['dosen']}>
                <DosenDetailInventarisPage />
            </ProtectedRoute>
        ),
    },
]);

function App() {
    return (
        <div className='App fontku'>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
