import React, { useContext, useEffect, useState } from 'react';
import { PrivateRoute } from '../auth/RestrictedRoutes.jsx';
import { AuthContext } from '../auth/context.jsx';


export const Test = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null)
    const { user, axiosInstance } = useContext(AuthContext);


    useEffect(() => {
        if (!user) return;
        axiosInstance.get('/test/auth')
            .then(res => {
                setData(res.data.data)
            })
            .catch(err => {
                setError(err.response.data.error)
            })
    }, [user, axiosInstance])

    return (
        <PrivateRoute>
            <div className='h-[50rem] sticky top-1 self-start border' >
                
                Hello
            </div>
        </PrivateRoute>
    );
};

