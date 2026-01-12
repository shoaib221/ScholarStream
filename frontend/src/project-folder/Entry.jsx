import { Outdent } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Nav } from '../Nav/Nav.jsx';
import "./project.css";
import { DownWindowContext } from '../Nav/context.jsx';
import { AuthContext } from '../auth/context.jsx';
import { ReactHookFormExample } from '../react-hook-form/react-hook-form.jsx';
import { SwiperDemo }  from '../Swiper/swiper.jsx';
import { ScrollToTop } from '../react-library/miscel/Scroll.jsx';
import { Footer } from '../react-library/Nav/Nav.jsx'


export const Entry = () => {
    
    const {  DownWindowTag } = useContext(DownWindowContext);
    
    return (
        <>
            <DownWindowTag />

            <Nav />

            <br/> <br/> <br/>

            <div className='flex-grow p-2' >
                <Outlet />
            </div>
            
                
            
            
            <Footer />

            <ScrollToTop />
        </>
    );
};



// Layout & Page Structure
// Main Layout: Your site will have a main layout with a Navbar and Footer visible on most
// pages (excluding the dashboard layout).
// Navbar:
// ● Always Visible: Logo, Home, All Scholarships.
// ● Not Logged In: Login Button, Register Button.
// ● Logged In: User Profile Image (with dropdown), Dashboard link, Logout.
// Footer:
// ● A standard footer with Logo, Copyright, and Social Media links.

