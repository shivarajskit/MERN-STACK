import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { logout } from "../store/slices/authSlice";

const Logout: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    return (
        <button
            onClick={() => {
                dispatch(logout());
                navigate('/login');
            }}
            className="btn-logout"
        >Logout</button>
    );
}

export default Logout;