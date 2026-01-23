import { updateProfile } from "firebase/auth";
import { auth } from './firebase.config';
import { useContext, useEffect, useState } from "react";
import { useAuthContext } from "./context";
import { Loading } from "../miscel/Loading";
import { NotFound } from "../miscel/NotFound";
import { Navigate, useLocation } from "react-router-dom";
import { Grid, Phone } from "lucide-react";
import { toast } from "react-toastify";
import { PrivateRoute } from "./RestrictedRoutes";
import { FaRegSmile } from "react-icons/fa";
import axios from "axios";


export const UpdateProfile = () => {
    const { user, loading, setUser } = useAuthContext();
    const location = useLocation();
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [number, setNumber] = useState("");
    const [email, setEmail] = useState("");
    const { axiosInstance } = useAuthContext();


    useEffect(() => {
        if (!user) return;
        //console.log(user)
        setName(user.displayName);
        setPhoto(user.photoURL);
        setNumber(user.phoneNumber);
        setEmail(1);
    }, [user])


    async function Update() {
        try {
            const updation = { displayName: name, phoneNumber: number };

            if (imageFile) {
                // Convert file to base64
                const base64Img = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        const base64 = reader.result.replace(/^data:.+;base64,/, "");
                        resolve(base64);
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(imageFile);
                });

                // Upload to imgbb
                const formData = new FormData();
                formData.append("image", base64Img);

                const res = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Imagebb}`,
                    formData
                );

                const imageUrl = res.data.data.display_url;
                setPhoto(imageUrl);
                updation.photoURL = imageUrl;
            }

            // Update Firebase profile
            await updateProfile(auth.currentUser, updation);

            toast.success("Profile Updated Successfully");
            console.log("Updated profile:", updation);
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Something went wrong");
        }
    }

    const imageChange = (event) => {
        let file = event.target.files[0];

        if (file) {
            setImageFile(file)
            let url = URL.createObjectURL(file)
            setPhoto(url)
        }
    }


    return (
        <PrivateRoute>
            <div className="cen-ver flex-grow relative" >
                <div className="box-1 max-w-[600px] w-full" >
                    <div id='profile-head'  >
                        <div className="rounded-full bg-cover bg-center h-40 w-40 relative"
                            style={{ backgroundImage: `url(${photo})` }} >

                            <div className="rounded-full bg-[var(--color1)] absolute top-[75%] right-2 cursor-pointer" >
                                <FaRegSmile title="upload image" className="text-2xl" />
                                <input type="file" onChange={imageChange} className="opacity-0 absolute top-0 left-0 h-full w-full" />
                            </div>
                        </div>
                        <div className="cen-ver" >
                            <span className="text-2xl font-bold" >{user?.displayName}</span>
                            <span> {user?.email} </span>
                        </div>
                    </div>
                    <br />

                    <div className="grid grid-cols-[1fr_3fr] gap-4" >
                        <div className="flex justify-end items-center font-bold" >Name</div>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" />
                    </div>
                    <br />
                    <button onClick={Update} className="button-1234"  >Update</button>
                </div>

                

            </div>
        </PrivateRoute>
    )
}

// displayName, email, emailVerified,
// metadata, phoneNumber, photoURL

export const UpdateProfileED2 = () => {

    return (
        <></>
    )
}