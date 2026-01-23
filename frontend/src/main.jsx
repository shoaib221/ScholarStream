import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { NotFound } from '@/react-library/miscel/NotFound.jsx';
import { Auth } from '@/react-library/auth/auth.jsx';
import { AuthProvider } from '@/react-library/auth/context.jsx';
import { Test } from './test/test.jsx';
import { UpdateProfile } from '@/react-library/auth/UpdateProfile.jsx';
import { Home } from '@/routes/Home.jsx';
import { Entry } from '@/routes/layout.jsx';
import { NavProvider } from './react-library/Nav/context.jsx';
import { ThemeProvider } from '@/react-library/Theme/Theme.jsx';

import { ManageUsers } from '@/react-library/auth/ManageUsers.jsx';
import { AllScholarships } from "@/routes/AllScholarships.jsx"
import { ScholarshipDetail } from './routes/ScholarshipDetail.jsx';
import { Dashboard } from '@/routes/Dashboard.jsx';
import { SuccesfulPayment, FailedPayment } from '@/routes/payment/payment.jsx'

import './index.css';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

const App = () => {


    return (
        <QueryClientProvider client={queryClient} >
        <BrowserRouter>
            <ThemeProvider>
            <AuthProvider>
            <NavProvider>
                    <ToastContainer />
                    <Routes>
                        <Route path='/' element={<Entry />} >
                            <Route index element={<Home />} />
                            <Route path='auth' element={<Auth />} />
                            <Route path='test' element={<Test />} />
                            <Route path='profile' element={<UpdateProfile />} />
                            <Route path='all-scholarships' element={ <AllScholarships /> } />
                            <Route path="scholarship-detail/:id" element={ <ScholarshipDetail /> } />
                            <Route path='dashboard' element={ <Dashboard /> } />
                            <Route path='manage-users' element={ <ManageUsers /> } />
                            <Route path='payment_success' element={ <SuccesfulPayment /> } />
                            <Route path='payment_failed' element={ <FailedPayment /> } />
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Routes>
            </NavProvider>
            </AuthProvider>
            </ThemeProvider>
        </BrowserRouter>
        </QueryClientProvider>
    )
}



createRoot(document.getElementById('root')).render(<App />);

