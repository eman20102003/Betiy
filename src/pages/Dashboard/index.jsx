import Navbar from "../../components/Navbar";
import useAuth from "../../hooks/useAuth";
import "./Dashboard.css";

function Dashboard() {
  const { user, logout } = useAuth();
  

 

  return (
    <div>
      <Navbar />

      <div className="dashboard-container">
        <h1>Dashboard</h1>

        <div className="dashboard-card">
          <h3>Welcome, {user?.name}</h3>
          <p>Email: {user?.email}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;