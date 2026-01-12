import React from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="cen-ver flex-grow my-20">
            <div className="text-2xl font-bold text-(--color4)" >No Such Page</div>
            <div className="text-[4rem] text-(--color4)" >404</div>
            <button className="button-1234 text-2xl" onClick={ () => navigate('/') } >
                Back To Home
            </button>
            
        </div>
    );
};

