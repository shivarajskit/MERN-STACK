import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { logoutUser } from "../store/slices/authSlice";

const Logout: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    return (
        <button
            onClick={() => {
                dispatch(logoutUser());
                navigate('/login');
            }}
            className="btn-logout"
        >Logout</button>
    );
}

export default Logout;