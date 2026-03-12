import React, { useState } from 'react';
import './Staff.css';

interface StaffMember {
    id: number;
    name: string;
    role: string;
    phone: string;
    email: string;
    status: 'Active' | 'On Leave' | 'Inactive';
    performance: number; // Rating out of 5
}

const StaffView: React.FC = () => {
    const [staffList, setStaffList] = useState<StaffMember[]>([
        { id: 1, name: 'John Doe', role: 'Hair Stylist', phone: '555-1111', email: 'john@sloon.com', status: 'Active', performance: 4.8 },
        { id: 2, name: 'Mike Taylor', role: 'Barber', phone: '555-2222', email: 'mike@sloon.com', status: 'Active', performance: 4.5 },
        { id: 3, name: 'Sarah Williams', role: 'Hair Stylist', phone: '555-3333', email: 'sarah@sloon.com', status: 'On Leave', performance: 4.9 },
        { id: 4, name: 'Lisa Martinez', role: 'Beautician', phone: '555-4444', email: 'lisa@sloon.com', status: 'Active', performance: 4.7 },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);

    const handleAdd = () => {
        setEditingStaff(null);
        setIsModalOpen(true);
    };

    const handleEdit = (staff: StaffMember) => {
        setEditingStaff(staff);
        setIsModalOpen(true);
    };

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const newStaff: StaffMember = {
            id: editingStaff ? editingStaff.id : staffList.length + 1,
            name: formData.get('name') as string,
            role: formData.get('role') as string,
            phone: formData.get('phone') as string,
            email: formData.get('email') as string,
            status: formData.get('status') as any || 'Active',
            performance: editingStaff ? editingStaff.performance : 0, // New staff start with 0
        };

        if (editingStaff) {
            setStaffList(staffList.map(s => s.id === editingStaff.id ? newStaff : s));
        } else {
            setStaffList([...staffList, newStaff]);
        }

        setIsModalOpen(false);
    };

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={`star ${i <= Math.round(rating) ? 'filled' : 'empty'}`}>
                    ★
                </span>
            );
        }
        return <div className="performance-stars" title={`${rating} / 5.0`}>{stars} {rating > 0 ? rating.toFixed(1) : 'New'}</div>;
    }

    return (
        <div className="module-container animate-fade-in">
            <div className="module-header">
                <div>
                    <h1>Staff Management</h1>
                    <p className="subtitle">Manage your team and track performance.</p>
                </div>
                <button className="btn-primary" onClick={handleAdd}>
                    <span className="icon">➕</span> Add Staff
                </button>
            </div>

            <div className="staff-grid">
                {staffList.map(staff => (
                    <div className="staff-card glass-panel group" key={staff.id}>
                        <div className="staff-card-header">
                            <div className="staff-avatar-large">
                                {staff.name.charAt(0)}
                            </div>
                            <div className="staff-actions">
                                <button className="icon-btn-sm" onClick={() => handleEdit(staff)} title="Edit Details">✏️</button>
                                <button className="icon-btn-sm" title="View Schedule">📅</button>
                            </div>
                        </div>

                        <div className="staff-info">
                            <h3>{staff.name}</h3>
                            <p className="staff-role">{staff.role}</p>

                            <div className="staff-contact">
                                <span>📞 {staff.phone}</span>
                                <span>✉️ {staff.email}</span>
                            </div>

                            <div className="staff-metrics">
                                <div className="metric">
                                    <span className="metric-label">Status</span>
                                    <span className={`badge badge-${staff.status === 'Active' ? 'success' : staff.status === 'On Leave' ? 'warning' : 'danger'}`}>
                                        {staff.status}
                                    </span>
                                </div>
                                <div className="metric">
                                    <span className="metric-label">Performance</span>
                                    {renderStars(staff.performance)}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="modal-overlay animate-fade-in" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editingStaff ? 'Edit Staff Member' : 'Add New Staff'}</h2>
                            <button className="close-btn" onClick={() => setIsModalOpen(false)}>✖</button>
                        </div>

                        <form onSubmit={handleSave} className="modal-form">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="input-field"
                                    defaultValue={editingStaff?.name || ''}
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Role</label>
                                    <select name="role" className="input-field select-field" defaultValue={editingStaff?.role || 'Hair Stylist'}>
                                        <option value="Hair Stylist">Hair Stylist</option>
                                        <option value="Barber">Barber</option>
                                        <option value="Beautician">Beautician</option>
                                        <option value="Salon Manager">Salon Manager</option>
                                        <option value="Receptionist">Receptionist</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Status</label>
                                    <select name="status" className="input-field select-field" defaultValue={editingStaff?.status || 'Active'}>
                                        <option value="Active">Active</option>
                                        <option value="On Leave">On Leave</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        className="input-field"
                                        defaultValue={editingStaff?.phone || ''}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="input-field"
                                        defaultValue={editingStaff?.email || ''}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit" className="btn-primary">Save Staff Member</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StaffView;
