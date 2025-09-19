import TodoApp from "./TodoApp"

const Dashboard: React.FC = () => {
    return (
        <div className="section">
            <h1 className="heading-2xl">Dashboard</h1>
            <TodoApp />
        </div>
    );
}

export default Dashboard;