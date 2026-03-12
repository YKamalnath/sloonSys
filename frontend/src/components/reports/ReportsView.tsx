import React, { useState } from 'react';
import './Reports.css';

const ReportsView: React.FC = () => {
    const [timeRange, setTimeRange] = useState<'Today' | 'This Week' | 'This Month' | 'This Year'>('This Month');

    // Hardcoded mock data for the UI representation
    const revenueData = {
        total: 12450.50,
        growth: '+15.2%',
        services: 8520.00,
        products: 3930.50
    };

    const topServices = [
        { name: 'Women\'s Haircut', count: 145, revenue: 6525.00 },
        { name: 'Hair Coloring', count: 42, revenue: 3570.00 },
        { name: 'Men\'s Haircut', count: 110, revenue: 2750.00 },
        { name: 'Basic Facial', count: 35, revenue: 1750.00 },
    ];

    const staffPerformance = [
        { name: 'Sarah Williams', appointments: 85, rating: 4.9, revenue: 4250.00 },
        { name: 'John Doe', appointments: 72, rating: 4.8, revenue: 3100.00 },
        { name: 'Lisa Martinez', appointments: 60, rating: 4.7, revenue: 2850.00 },
        { name: 'Mike Taylor', appointments: 90, rating: 4.5, revenue: 2250.00 },
    ];

    // Helper to simulate a simple bar chart
    const maxServiceRevenue = Math.max(...topServices.map(s => s.revenue));
    const maxStaffRevenue = Math.max(...staffPerformance.map(s => s.revenue));

    return (
        <div className="module-container animate-fade-in">
            <div className="module-header">
                <div>
                    <h1>Reports & Analytics</h1>
                    <p className="subtitle">Track your salon's performance and growth.</p>
                </div>
                <div className="range-selector">
                    {(['Today', 'This Week', 'This Month', 'This Year'] as const).map(range => (
                        <button
                            key={range}
                            className={`range-btn ${timeRange === range ? 'active' : ''}`}
                            onClick={() => setTimeRange(range)}
                        >
                            {range}
                        </button>
                    ))}
                </div>
            </div>

            <div className="reports-grid">
                {/* Revenue Overview Cards */}
                <div className="report-card metric-card primary-bg">
                    <div className="metric-header">
                        <h3>Total Revenue</h3>
                        <span className="trend positive">{revenueData.growth}</span>
                    </div>
                    <div className="metric-value">${revenueData.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    <div className="metric-split">
                        <div>
                            <span className="label">Services</span>
                            <span className="value">${revenueData.services.toLocaleString()}</span>
                        </div>
                        <div>
                            <span className="label">Products</span>
                            <span className="value">${revenueData.products.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                <div className="report-card metric-card">
                    <div className="metric-header">
                        <h3>Total Appointments</h3>
                        <span className="trend positive">+8%</span>
                    </div>
                    <div className="metric-value">342</div>
                    <p className="metric-subtitle">Compared to previous period</p>
                </div>

                <div className="report-card metric-card">
                    <div className="metric-header">
                        <h3>New Customers</h3>
                        <span className="trend positive">+12%</span>
                    </div>
                    <div className="metric-value">48</div>
                    <p className="metric-subtitle">Compared to previous period</p>
                </div>

                {/* Top Services Chart */}
                <div className="report-card span-2 glass-panel">
                    <h3 className="card-title">Top Performing Services</h3>
                    <div className="bar-chart">
                        {topServices.map(service => (
                            <div className="chart-row" key={service.name}>
                                <div className="chart-label">
                                    <span className="chart-name">{service.name}</span>
                                    <span className="chart-count text-muted">{service.count} bookings</span>
                                </div>
                                <div className="bar-container">
                                    <div
                                        className="bar-fill"
                                        style={{ width: `${(service.revenue / maxServiceRevenue) * 100}%` }}
                                    ></div>
                                </div>
                                <div className="chart-value">${service.revenue.toLocaleString()}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Staff Performance Table */}
                <div className="report-card span-2 glass-panel">
                    <h3 className="card-title">Staff Performance</h3>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Staff Member</th>
                                <th>Appointments</th>
                                <th>Avg. Rating</th>
                                <th>Revenue Generated</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staffPerformance.map(staff => (
                                <tr key={staff.name}>
                                    <td className="font-medium">{staff.name}</td>
                                    <td>{staff.appointments}</td>
                                    <td>
                                        <span className="rating-pill">
                                            ★ {staff.rating.toFixed(1)}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="revenue-cell">
                                            <span>${staff.revenue.toLocaleString()}</span>
                                            <div className="mini-bar">
                                                <div
                                                    className="mini-bar-fill"
                                                    style={{ width: `${(staff.revenue / maxStaffRevenue) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default ReportsView;
