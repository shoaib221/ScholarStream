import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext, useAuthContext } from '@/react-library/auth/context.jsx';
import { motion } from 'framer-motion';
import { Leaflet, SearchCountries } from '@/react-library/react-leaflet/leaflet.jsx';
import { Banner2 } from '@/react-library/banner/banner2.jsx'
import { InfiniteSlider } from '@/react-library/Swiper/slide1.jsx';
import { ScrollProduct } from '@/react-library/Slide/HorizontalScroll.jsx';
import { Timeline } from '@/react-library/daisyUi/Timeline.jsx';
import { Chart } from '@/react-library/Charts/charts.jsx';
import { FAQs } from "@/react-library/miscel/FAQs.jsx"
import { Banner12 } from '@/react-library/banner/banner1.jsx';
import { GetInTouch } from '@/react-library/miscel/getintouch';




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
            <div className='header-12' > Top Scholarships </div>
            <InfiniteSlider />
            <br /><br />
            <div className='header-12' >Frequently Asked Questions</div>
            <br />
            <FAQs />

            <br /><br />
            <div className='header-12' >Success Stories</div>
            <br/>
            <ScrollProduct />

            <br/><br/>

            

            <div >

            </div>

            <div className='grid grid-cols-[1fr] md:grid-cols-[1fr_1fr]' >
                <SearchCountries />
                <GetInTouch />
            </div>
            


            
            <div className='' >

            </div>
            
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
