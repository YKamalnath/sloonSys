import React from 'react';
import './Dashboard.css';

const Dashboard: React.FC = () => {
    // Mock data for the dashboard
    const stats = [
        { label: 'Total Customers', value: '1,248', icon: '👥', change: '+12%', color: 'var(--primary-color)' },
        { label: "Today's Appointments", value: '42', icon: '📅', change: '+5%', color: 'var(--accent-color)' },
        { label: 'Total Income', value: '$8,450', icon: '💵', change: '+18%', color: 'var(--success-color)' },
        { label: 'Active Staff', value: '12', icon: '👨‍🔧', change: '0%', color: 'var(--secondary-color)' },
    ];

    const recentAppointments = [
        { id: 1, customer: 'Alice Johnson', service: 'Hair Cut', time: '10:00 AM', staff: 'John D.', status: 'Completed' },
        { id: 2, customer: 'Bob Smith', service: 'Beard Trim', time: '11:30 AM', staff: 'Mike T.', status: 'In Progress' },
        { id: 3, customer: 'Emma Davis', service: 'Hair Coloring', time: '1:00 PM', staff: 'Sarah W.', status: 'Upcoming' },
        { id: 4, customer: 'Chris Lee', service: 'Facial', time: '2:30 PM', staff: 'Lisa M.', status: 'Upcoming' },
    ];

    return (
        <div className="dashboard-container animate-fade-in">
            <div className="dashboard-header">
                <h1>Dashboard Overview</h1>
                <p className="subtitle">Welcome back! Here's what's happening today.</p>
            </div>

            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div key={index} className="stat-card glass-panel group">
                        <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                            {stat.icon}
                        </div>
                        <div className="stat-content">
                            <p className="stat-label">{stat.label}</p>
                            <h3 className="stat-value">{stat.value}</h3>
                            <span className={`stat-change ${stat.change.startsWith('+') ? 'positive' : 'neutral'}`}>
                                {stat.change} from last month
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="dashboard-content">
                <div className="recent-section glass-panel">
                    <div className="section-header">
                        <h2>Today's Appointments</h2>
                        <button className="btn-secondary btn-sm">View All</button>
                    </div>

                    <div className="table-wrapper">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Customer</th>
                                    <th>Service</th>
                                    <th>Time</th>
                                    <th>Staff</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentAppointments.map(apt => (
                                    <tr key={apt.id}>
                                        <td className="font-medium">{apt.customer}</td>
                                        <td>{apt.service}</td>
                                        <td>{apt.time}</td>
                                        <td>{apt.staff}</td>
                                        <td>
                                            <span className={`badge badge-${apt.status === 'Completed' ? 'success' : apt.status === 'In Progress' ? 'warning' : 'default'}`}>
                                                {apt.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="activity-section glass-panel">
                    <div className="section-header">
                        <h2>Quick Actions</h2>
                    </div>
                    <div className="quick-actions-grid">
                        <button className="action-card">
                            <span className="action-icon">➕</span>
                            <span>New Appointment</span>
                        </button>
                        <button className="action-card">
                            <span className="action-icon">👥</span>
                            <span>Add Customer</span>
                        </button>
                        <button className="action-card">
                            <span className="action-icon">💳</span>
                            <span>Create Invoice</span>
                        </button>
                        <button className="action-card">
                            <span className="action-icon">📊</span>
                            <span>View Reports</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
