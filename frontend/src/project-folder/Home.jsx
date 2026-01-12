import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DownWindowContext } from '../Nav/context.jsx';
import { AuthContext, useAuthContext } from '../auth/context.jsx';
import { motion } from 'framer-motion';
import { Leaflet } from '../react-leaflet/leaflet.jsx';
import { Banner2 } from '../banner/banner2.jsx'
import { InfiniteSlider } from '../Swiper/slide1.jsx';
import { ScrollProduct } from '../Slide/HorizontalScroll.jsx';
import { Timeline } from '../daisyUi/Timeline.jsx';
import { Chart } from '../Charts/charts.jsx';
import { FAQs } from "../miscel/FAQs.jsx"
import { Banner12 } from '../react-library/banner/banner1.jsx';
import { SearchDivisions } from '../react-library/react-leaflet/leaflet.jsx';



export const Home = () => {
    const { axiosInstance, user } = useAuthContext()
    const [ students, setStudents ] = useState([])
    

    // useEffect(() => {
    //     if(!user) return;

    //     async function fetchdata() {
    //         let res= await axiosInstance.get( "/miscel/students-by-country" )
    //         setStudents(res.data.students)
    //         console.log( res.data.students )
    //     }

    //     fetchdata();

    // }, [user])
    

    return (
        <div className='block flex-grow relative flex-1 w-full' >
            
            <Banner12 />
            <br /><br />
            <div className='text-center text-2xl font-bold' > <span className='text-[var(--color4)]' >Top</span>  Scholarships</div>
            <InfiniteSlider />
            <br /><br />
            <div className='text-center text-2xl font-bold' > Frequently Asked <span className='text-[var(--color4)]' >Questions</span></div>
            <br />
            <FAQs />

            <br /><br />
            <div className='text-center text-2xl font-bold' > <span className='text-[var(--color4)]' >Succes</span>  Stories</div>
            <br/>
            <ScrollProduct />

            <br/><br/>

            <div className='text-center text-2xl font-bold' >Search Available <span className='text-[var(--color4)]' >Destinations</span></div>
            <SearchDivisions />
            
        </div>
    );
};



// Home Page
// Banner: A hero section with a title, description, and a "Search Scholarship" button.
// Top Scholarships (Dynamic): A section displaying the top 6 scholarships (e.g., those
// with the lowest application fees or most recent post date). Each card must have a
// "View Details" button.
// Animation: You must implement animation on the Home page using framer-motion.
// Two Extra Sections: Add two extra static sections. For example:
// 1. A "Success Stories" or "Testimonials" section.
// 2. A "Contact Us" or "F.A.Q" section.
