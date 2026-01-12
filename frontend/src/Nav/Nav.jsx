import React, { useEffect, useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SignOut } from '../auth/auth';
import { AuthContext } from '../auth/context';
import './Nav.css';
import { DownWindowContext } from './context.jsx';
import { Breaker } from '../miscel/Breaker.jsx';
import { FaGraduationCap } from "react-icons/fa6";
import { useThemeContext } from '../react-library/Theme/Theme.jsx';


export const Logo = () => {
    return (
        <div className='h-[3rem] text-[var(--color4)] flex gap-2' >
            <FaGraduationCap className='h-full text-2xl' />
            <div className='cen-ver font-black' >ScholarStream</div>
        </div>
    )
}

export const Nav = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useContext(AuthContext);
    const { down1, DownWindow, navi, LargeScreenTag } = useContext(DownWindowContext)
    const [opener1, setOpener1] = useState(false)
    const { ThemeButton2 } = useThemeContext();

    function Opener1() {
        setOpener1(prev => !prev)
    }



    return (
        <nav id='top' className='z-50 bg-(--color1)  top-0 w-full flex fixed justify-between p-2' >
            <Logo/ >

            {/* <div onClick={ () => navigate('/') } style={{ cursor: 'pointer' }} className={ `${location.pathname === '/'? 'hilit-1': ''}` } >Home</div> */}


            {down1 ?
                <div className='flex justify-center px-6 items-center lg:hidden cursor-pointer' onClick={() => DownWindow(false)} >
                    Menu
                </div>
                :
                <div className='flex justify-center px-6 items-center lg:hidden cursor-pointer' onClick={() => DownWindow(true)} >
                    Back
                </div>
            }


            <LargeScreenTag />



            {user ?
                <div className='cursor-pointer h-[3rem] w-[3rem] rounded-full relative bg-cover bg-center z-3' title={user.email} onClick={Opener1} style={{ backgroundImage: `url(${user.photoURL})`, border: '.1rem solid var(--color2)' }}  >
                    <div id='opener-1' className={`box-shadow-1 bg-(--color4) text-[var(--color1)] absolute flex-col p-2 rounded-xl w-[10rem] right-[0%] top-[105%] z-4 ${opener1 ? "flex" : "hidden"}`} style={{ border: '1px solid var(--color2)' }} >
                        {/* <div onClick={ ()=> navigate('/profile')} className='p-1 text-center w-full'  >Profile</div>
                        <Breaker />
                        <Theme /> */}

                        
                        
                        <ThemeButton2 />
                        <Breaker />
                        <SignOut />
                        
                    </div>
                </div>
                :
                <button onClick={() => navigate("/auth")} className='button-1234' >
                    Login
                </button>
            }

        </nav>
    );
};

