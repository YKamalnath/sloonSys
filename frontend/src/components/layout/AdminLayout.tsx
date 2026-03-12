import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AdminLayout.css';

const AdminLayout: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        if (logout) {
            logout();
        }
        navigate('/login');
    };

    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: '🖥️' },
        { path: '/dashboard/customers', label: 'Customers', icon: '👥' },
        { path: '/dashboard/appointments', label: 'Appointments', icon: '📅' },
        { path: '/dashboard/staff', label: 'Staff', icon: '👨‍🔧' },
        { path: '/dashboard/services', label: 'Services', icon: '✂️' },
        { path: '/dashboard/billing', label: 'Billing', icon: '💳' },
        { path: '/dashboard/products', label: 'Products', icon: '🧴' },
        { path: '/dashboard/reports', label: 'Reports', icon: '📊' },
    ];

    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <aside className="sidebar glass-panel">
                <div className="sidebar-header">
                    <h2>Sloon<span className="text-primary">Sys</span></h2>
                </div>

                <nav className="sidebar-nav">
                    <ul>
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    end={item.path === '/dashboard'}
                                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                >
                                    <span className="nav-icon">{item.icon}</span>
                                    <span className="nav-label">{item.label}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="sidebar-footer">
                    <div className="user-info">
                        <div className="avatar">
                            {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
                        </div>
                        <div className="user-details">
                            <p className="user-name">{user?.name || 'Admin User'}</p>
                            <p className="user-role">Administrator</p>
                        </div>
                    </div>
                    <button className="logout-btn" onClick={handleLogout}>
                        <span>🚪</span> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="main-content">
                <header className="top-header glass-panel">
                    <div className="header-search">
                        <span className="search-icon">🔍</span>
                        <input type="text" placeholder="Search anything..." className="search-input" />
                    </div>

                    <div className="header-actions">
                        <button className="icon-btn" title="Notifications">
                            <span>🔔</span>
                            <span className="notification-dot"></span>
                        </button>
                        <button className="icon-btn" title="Settings">
                            <span>⚙️</span>
                        </button>
                    </div>
                </header>

                <div className="content-wrapper animate-fade-in">
                    {/* Outlet renders the nested routes */}
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
