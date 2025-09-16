const Greeting:React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
    return (
        <div className="p-4 bg-green-100 rounded">
            {isLoggedIn ? <h2>Welcome back, User!</h2> : <h2>Please log in.</h2>}
        </div>
    );
}

export default Greeting;