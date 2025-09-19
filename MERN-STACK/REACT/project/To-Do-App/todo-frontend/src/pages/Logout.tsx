import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => {
                localStorage.removeItem('token');
                navigate('/login');
            }}
            className="btn-logout"
        >Logout</button>
    );
}

export default Logout;