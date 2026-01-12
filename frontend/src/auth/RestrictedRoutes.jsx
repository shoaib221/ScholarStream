import { useLocation, useNavigate } from "react-router-dom";
import { Loading } from "../miscel/Loading";
import { useAuthContext } from "./context";


export const ForbiddenAccess = () => {
    const navigate = useNavigate();

    return (
        <div className="cen-ver flex-grow my-20">
            <div className="text-2xl font-bold text-(--color4)" >Forbidden Access</div>
            <div className="text-[4rem] text-(--color4)" >403</div>
            <button className="button-1234 text-2xl" onClick={ () => navigate('/auth') } >
                Please Log In
            </button>
            
        </div>
    )
}



export const PrivateRoute = ({ children }) => {

    const { user, loading } = useAuthContext()


    if (loading) return <Loading />
    if (!user) return <ForbiddenAccess />

    return children;
}


export const AdminRoute = ({ children }) => {
    const { user, loading } = useAuthContext();
    const location = useLocation();

    // 1️⃣ Still loading Firebase OR loading user.role
    if (loading) return <Loading />;

    // 2️⃣ If not logged in → redirect to auth
    if (!user) {
        return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
    }

    // 3️⃣ If user is admin → allow route
    if (user.role === "admin") {
        return children;
    }

    // 4️⃣ Logged in but not admin → forbidden page
    return <ForbiddenAccess />;
};
