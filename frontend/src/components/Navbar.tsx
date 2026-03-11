import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:5000/api/auth/logout', { method: 'POST' });
            logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout error', error);
        }
    };

    return (
        <nav className="navbar">
            <div className="nav-brand">
                <Link to="/">Sloon</Link>
            </div>

            <div className="nav-links">
                {user ? (
                    <>
                        <span className="nav-user">Welcome, {user.name}</span>
                        <button onClick={handleLogout} className="nav-btn nav-btn-outline">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-link">Login</Link>
                        <Link to="/register" className="nav-btn nav-btn-primary">Get Started</Link>
                    </>
                )}
            </div>
        </nav>
    );
}
