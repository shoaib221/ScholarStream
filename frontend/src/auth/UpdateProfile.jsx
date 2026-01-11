import { updateProfile } from "firebase/auth";
import { auth } from './firebase.config';
import { use, useContext, useEffect, useState } from "react";
import { AuthContext } from "./context";
import { toast } from "react-toastify";
import { PrivateRoute } from ".//RestrictedRoutes.jsx";
import { DownWindowContext } from '../Nav/context';
import { FaRegSmile } from "react-icons/fa";
import axios from "axios";




export const UpdateProfile = () => {
    const { user } = useContext(AuthContext);
    const { DownWindowTag } = useContext(DownWindowContext)
    const [imageFile, setImageFile] = useState(null);
    const { axiosInstance } = useContext(AuthContext);
    const [ profile, setProfile ] = useState( { name: "", photo: "", contact: "", bio: "", profession: "", location: "" } )

    useEffect( () => {
        if(!user) return;

        setProfile(user);
    }, [user] )
    


    async function Update() {
        try {
            

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
                setProfile( { ...profile, photo: imageUrl } );
                
            }

            // Update Firebase profile\
            let res = await axiosInstance.post( "/auth/profile", profile )
            

            toast.success("Profile Updated Successfully");
            
        } catch (error) {
            console.error(error.message);
            
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
                <div className="max-w-[600px] w-full" >

                    <div className="cen-hor gap-2" >
                        
                        <span className="font-bold text-xl text-(--color4)" > { profile.username} </span> 
            
                        <span> { profile.role } </span>
                    </div>

                    <br/><br/>

                    <div className="rounded-full bg-cover bg-center h-40 w-40 relative mx-auto my-4"
                        style={{ backgroundImage: `url(${profile.photo})` }} >

                        <div className="rounded-full bg-[var(--color1)] absolute top-[75%] right-2 cursor-pointer" >
                            <FaRegSmile title="upload image" className="text-2xl" />
                            <input type="file" onChange={imageChange} className="opacity-0 absolute top-0 left-0 h-full w-full" />
                        </div>
                    </div>


                    <br /><br/>

                    <div className="grid grid-cols-[1fr_3fr] gap-4" >
                        <div className="flex justify-end items-center font-bold" >Name</div>
                        <input type="text" value={profile.name} onChange={(e) => setProfile( { ...profile, name: e.target.value } )} placeholder="Your Name" />

                        <div className="flex justify-end items-center font-bold" >Bio</div>
                        <textarea className="resize-none p-2" rows={5} type="text" value={profile.bio} onChange={(e) => setProfile( { ...profile, bio: e.target.value } ) } placeholder="Your Bio" />

                        <div className="flex justify-end items-center font-bold" >Contact</div>
                        <input type="text" value={profile.contact} onChange={(e) => setProfile({ ...profile, contact: e.target.value })} placeholder="Your Contact" />

                        <div className="flex justify-end items-center font-bold" >Location</div>
                        <input type="text" value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })} placeholder="Your Location" />

                        <div className="flex justify-end items-center font-bold" >Profession</div>
                        <input type="text" value={profile.profession} onChange={(e) => setProfile({ ...profile, profession: e.target.value })} placeholder="Your Profession" />

                    </div>
                    <br />
                    <div onClick={Update} className="button-1234 mx-auto"  >Update</div>
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