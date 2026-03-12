import React, { useState } from 'react';
import './Customers.css';

interface Customer {
    id: number;
    name: string;
    phone: string;
    email: string;
    history: string;
    preferences: string;
}

const CustomersView: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([
        { id: 1, name: 'Alice Johnson', phone: '555-0101', email: 'alice@example.com', history: 'Hair Cut (12-Mar), Color (05-Feb)', preferences: 'Likes organic products, sensitive scalp' },
        { id: 2, name: 'Bob Smith', phone: '555-0202', email: 'bob@example.com', history: 'Beard Trim (10-Mar)', preferences: 'Prefers quiet sessions' },
        { id: 3, name: 'Emma Davis', phone: '555-0303', email: 'emma@example.com', history: 'Facial (01-Mar), Massage (15-Feb)', preferences: 'Allergic to lavender' },
        { id: 4, name: 'Chris Lee', phone: '555-0404', email: 'chris@example.com', history: 'Hair Cut (08-Mar)', preferences: 'Usually books morning slots' },
        { id: 5, name: 'Sarah Wilson', phone: '555-0505', email: 'sarah@example.com', history: 'Manicure (11-Mar)', preferences: 'Prefers nail artist Lisa' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (customer: Customer) => {
        setEditingCustomer(customer);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setEditingCustomer(null);
        setIsModalOpen(true);
    };

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const newCustomer = {
            id: editingCustomer ? editingCustomer.id : customers.length + 1,
            name: formData.get('name') as string,
            phone: formData.get('phone') as string,
            email: formData.get('email') as string,
            history: editingCustomer ? editingCustomer.history : 'No history yet',
            preferences: formData.get('preferences') as string,
        };

        if (editingCustomer) {
            setCustomers(customers.map(c => c.id === editingCustomer.id ? newCustomer : c));
        } else {
            setCustomers([...customers, newCustomer]);
        }

        setIsModalOpen(false);
    };

    return (
        <div className="module-container animate-fade-in">
            <div className="module-header">
                <div>
                    <h1>Customer Management</h1>
                    <p className="subtitle">View and manage your client database.</p>
                </div>
                <button className="btn-primary" onClick={handleAdd}>
                    <span className="icon">➕</span> Add New Customer
                </button>
            </div>

            <div className="glass-panel module-content">
                <div className="toolbar">
                    <div className="search-bar">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="Search by name, phone, or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="filters">
                        <button className="btn-secondary">Filter 🔻</button>
                        <button className="btn-secondary">Export 📥</button>
                    </div>
                </div>

                <div className="table-wrapper">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Contact</th>
                                <th>Recent Visit</th>
                                <th>Preferences</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCustomers.map(customer => (
                                <tr key={customer.id}>
                                    <td>
                                        <div className="customer-name-cell">
                                            <div className="customer-avatar">{customer.name.charAt(0)}</div>
                                            <span className="font-medium">{customer.name}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="contact-info">
                                            <span className="phone">📞 {customer.phone}</span>
                                            <span className="email">✉️ {customer.email}</span>
                                        </div>
                                    </td>
                                    <td><span className="history-text">{customer.history.split(',')[0]}</span></td>
                                    <td><span className="preferences-text" title={customer.preferences}>{customer.preferences}</span></td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="icon-btn-sm" onClick={() => handleEdit(customer)} title="Edit">✏️</button>
                                            <button className="icon-btn-sm" title="View History">📜</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredCustomers.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="empty-state">
                                        <p>No customers found matching "{searchTerm}"</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal-overlay animate-fade-in" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editingCustomer ? 'Edit Customer' : 'Add New Customer'}</h2>
                            <button className="close-btn" onClick={() => setIsModalOpen(false)}>✖</button>
                        </div>

                        <form onSubmit={handleSave} className="modal-form">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="input-field"
                                    defaultValue={editingCustomer?.name || ''}
                                    required
                                    placeholder="e.g. Jane Doe"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        className="input-field"
                                        defaultValue={editingCustomer?.phone || ''}
                                        required
                                        placeholder="e.g. 555-0199"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="input-field"
                                        defaultValue={editingCustomer?.email || ''}
                                        required
                                        placeholder="e.g. jane@example.com"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Preferences & Notes</label>
                                <textarea
                                    name="preferences"
                                    className="input-field textarea"
                                    defaultValue={editingCustomer?.preferences || ''}
                                    rows={3}
                                    placeholder="Allergies, preferred staff, drink choices..."
                                ></textarea>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit" className="btn-primary">Save Customer</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomersView;
