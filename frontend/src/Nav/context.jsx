import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './context-style.css';
import { motion } from "framer-motion";

export const DownWindowContext = createContext();




export const DownWindowProvider = ({ children }) => {
    const [down1, setDown1] = useState(true)
    const navigate = useNavigate()
    const [ navi, selectNavi ] = useState("home")
    const location = useLocation()

    function DownWindow( wind, path) {

        setDown1( wind )
        if( path ) navigate(path)

    }

    useEffect( () => {
        //console.log("Location change")
        let path = location.pathname.toLowerCase();
        if( path.includes("all-scholarships") ) selectNavi("all-scholarships");
        else if( path.includes("dashboard") ) selectNavi("dashboard");
        else if( path.includes("detail") ) selectNavi("details");
        else selectNavi("home");
    }, [location?.pathname] )


    function handleResize() {
        if( window.innerWidth > 768 ) {
            setDown1(true)
        }
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [])

    const DownWindowTag = () => {
        
        return (
            
            <div className={`${down1 ? "hidden" : "flex" } fixed z-50 top-14 bg-(--color1)  flex-col items-center  left-0 right-0 bottom-0 p-4 gap-4`}  >
                <div onClick={() => DownWindow( true, "/")} className={ `class-1 ${navi === "home" && "active-navi" }` }  >Home</div>
                <div onClick={() => DownWindow( true, "/all-scholarships")} className={ `class-1 ${navi === "all-scholarships" && "active-navi" }` } >Scholarships</div>
                <div onClick={() => DownWindow( true, '/dashboard?board=profile')} className={ `class-1 ${navi === "dashboard" && "active-navi" }` }  >Dashboard</div>
            </div>
        )
    }

    const LargeScreenTag = () => {
        return (
            <div className='hidden lg:flex text-[0.9rem]' >
                <div onClick={() => DownWindow( true, "/")} className={ `class-1 ${navi === "home" && "active-navi" }` }  >Home</div>
                <div onClick={() => DownWindow( true, "/all-scholarships")} className={ `class-1 ${navi === "all-scholarships" && "active-navi" }` } >Scholarships</div>                
                <div onClick={() => DownWindow( true, '/dashboard?board=profile')} className={ `class-1 ${navi === "dashboard" && "active-navi" }` }  >Dashboard</div>
            </div>
        )
    }


    return (
        <DownWindowContext.Provider value={{ LargeScreenTag, down1, setDown1, DownWindow, DownWindowTag, navi }} >
            {children}
        </DownWindowContext.Provider>
    )
}
