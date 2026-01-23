import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './context.css';
import { motion } from "framer-motion";

const NavContext = createContext();

export const useNavContext = () => useContext(NavContext)


export const NavProvider = ({ children }) => {
    const [down1, setDown1] = useState(true)
    const navigate = useNavigate()
    const [navi, selectNavi] = useState("home")
    const location = useLocation()

    const [screen, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    

    function DownWindow(wind, path) {

        setDown1(wind)
        if (path) navigate(path)

    }

    useEffect(() => {
        //console.log("Location change")
        let path = location.pathname.toLowerCase();
        if (path.includes("all-scholarships")) selectNavi("all-scholarships");
        else if (path.includes("dashboard")) selectNavi("dashboard");
        else if (path.includes("detail")) selectNavi("details");
        else selectNavi("home");
    }, [location?.pathname])


    function handleResize() {

        if (window.innerWidth > 768) {
            setDown1(true)
        }
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [])




    return (
        <NavContext.Provider value={{ down1, setDown1, DownWindow, navi, screen }} >
            {children}
        </NavContext.Provider>
    )
}
