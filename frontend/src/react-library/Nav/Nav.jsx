import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaGithub, FaLinkedin, FaPhone } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import './Nav.css';
import { useNavContext } from './context.jsx';
import { Breaker } from '../miscel/Breaker.jsx';
import { FaGraduationCap } from "react-icons/fa6";
import { useThemeContext } from '../Theme/Theme.jsx';


export const Logo = () => {
    return (
        <div className='h-[3rem] text-[var(--color4)] flex gap-2' >
            <FaGraduationCap className='h-full text-2xl' />
            <div className='cen-ver font-black' >ScholarStream</div>
        </div>
    )
}

export const Nav = () => {
    const { ThemeChoice } = useTheme()

    const { down1, DownWindow, navi, LargeScreenTag } = useNavContext();
    const [opener1, setOpener1] = useState(false)

    function Opener1() {
        setOpener1(prev => !prev)
    }



    return (
        <nav id='top' className='flex min-h-[3rem] justify-between m-4 items-center' >
            <Logo />

            {/* <div onClick={ () => navigate('/') } style={{ cursor: 'pointer' }} className={ `${location.pathname === '/'? 'hilit-1': ''}` } >Home</div> */}

            <ThemeChoice />

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





        </nav>
    );
};



import { IoMailSharp } from "react-icons/io5";
import { FaGlobe } from "react-icons/fa";


export const Footer = () => {

    return (
        <div className='py-4 bg-(--color-c4) text-white mt-16' >
            <div className='text-2xl font-bold text-center' >Connect Us</div>
            <br/>

            <div className='flex flex-col lg:flex-row text-xl gap-4' >

                {/* social links */}
                <div className='lg:min-w-[40%] gap-2 grid grid-cols-[1fr_1fr] justify-center items-center pr-4' >
                    
                    <div className='flex flex-row-reverse items-center gap-2' >
                        <FaFacebook  className='inline-block mr-2' />
                        <span className='hover:underline text-sm cursor-pointer' 
                        onClick={ () => window.open( 'https://web.facebook.com/programmingHero', '_blank' ) } >ScholarStream</span>
                    </div>
                    
                    <div className='flex flex-row-reverse items-center gap-2' >
                        <FaLinkedin  className='inline-block mr-2' />
                        <span className='hover:underline text-sm cursor-pointer' 
                        onClick={ () => window.open( 'https://bd.linkedin.com/company/programminghero', '_blank' ) } >ScholarStream</span>
                    </div>

                    <div className='flex flex-row-reverse items-center gap-2' >
                        <FaPhone  className='inline-block mr-2' />
                        <span className='hover:underline text-sm cursor-pointer'
                        >01303909909</span>
                    </div>

                    <div className='flex flex-row-reverse items-center gap-2' >
                        <IoMailSharp  className='inline-block mr-2' />
                        <span className='hover:underline text-sm cursor-pointer' 
                        >info@scholarstream.com</span>
                    </div>

                    <div className='flex flex-row-reverse items-center gap-2' >
                        <FaGlobe  className='inline-block mr-2' />
                        <span className='hover:underline text-sm cursor-pointer' 
                            onClick={ () => window.open( 'https://scholarstream-shoaib221.netlify.app', '_blank' ) }
                        >scholarstream.com</span>
                    </div>
                    
                    
                </div>

                <div className='flex-grow p-2 flex flex-col items-center' >
                    
                    <textarea placeholder='Write Your Query' rows={3} className='resize-none text-lg' />
                    <button className='font-bold text-lg button-91 my-2' >Send Message</button>

                </div>

                


                
            </div>

            <br/>
                <br/>

            <div style={{ textAlign: 'center', marginTop: '1rem' }} >
                Copyright © 2026 - All right reserved
            </div>
        </div>
    )
}




