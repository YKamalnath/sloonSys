import React, { useState } from 'react';
import './Services.css';

interface Service {
    id: number;
    name: string;
    category: string;
    price: number;
    duration: number; // in minutes
    description: string;
}

const ServicesView: React.FC = () => {
    const [services, setServices] = useState<Service[]>([
        { id: 1, name: 'Men\'s Haircut', category: 'Hair', price: 25, duration: 30, description: 'Standard men\'s haircut and styling' },
        { id: 2, name: 'Women\'s Haircut', category: 'Hair', price: 45, duration: 45, description: 'Women\'s haircut, wash, and style' },
        { id: 3, name: 'Hair Coloring', category: 'Color', price: 85, duration: 120, description: 'Full hair coloring service' },
        { id: 4, name: 'Beard Trim', category: 'Grooming', price: 15, duration: 15, description: 'Beard trim and shape up' },
        { id: 5, name: 'Basic Facial', category: 'Skin Care', price: 50, duration: 60, description: 'Deep cleansing and moisturizing facial' },
    ]);

    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);

    const categories = ['All', 'Hair', 'Color', 'Grooming', 'Skin Care'];

    const filteredServices = activeCategory === 'All'
        ? services
        : services.filter(s => s.category === activeCategory);

    const handleAdd = () => {
        setEditingService(null);
        setIsModalOpen(true);
    };

    const handleEdit = (service: Service) => {
        setEditingService(service);
        setIsModalOpen(true);
    };

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const newService: Service = {
            id: editingService ? editingService.id : services.length + 1,
            name: formData.get('name') as string,
            category: formData.get('category') as string,
            price: Number(formData.get('price')),
            duration: Number(formData.get('duration')),
            description: formData.get('description') as string,
        };

        if (editingService) {
            setServices(services.map(s => s.id === editingService.id ? newService : s));
        } else {
            setServices([...services, newService]);
        }

        setIsModalOpen(false);
    };

    return (
        <div className="module-container animate-fade-in">
            <div className="module-header">
                <div>
                    <h1>Service Management</h1>
                    <p className="subtitle">Manage treatments, pricing, and duration.</p>
                </div>
                <button className="btn-primary" onClick={handleAdd}>
                    <span className="icon">➕</span> Add Service
                </button>
            </div>

            <div className="glass-panel module-content">
                <div className="category-filters">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="services-grid">
                    {filteredServices.map(service => (
                        <div className="service-card" key={service.id}>
                            <div className="service-header-row">
                                <h3>{service.name}</h3>
                                <span className="service-price">${service.price.toFixed(2)}</span>
                            </div>
                            <div className="service-meta">
                                <span className="badge badge-default">{service.category}</span>
                                <span className="service-duration">⏱️ {service.duration} mins</span>
                            </div>
                            <p className="service-desc">{service.description}</p>
                            <div className="service-actions">
                                <button className="btn-secondary btn-sm" onClick={() => handleEdit(service)}>Edit Service</button>
                            </div>
                        </div>
                    ))}
                    {filteredServices.length === 0 && (
                        <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
                            <p>No services found in this category.</p>
                        </div>
                    )}
                </div>
            </div>

            {isModalOpen && (
                <div className="modal-overlay animate-fade-in" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editingService ? 'Edit Service' : 'Add New Service'}</h2>
                            <button className="close-btn" onClick={() => setIsModalOpen(false)}>✖</button>
                        </div>

                        <form onSubmit={handleSave} className="modal-form">
                            <div className="form-group">
                                <label>Service Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="input-field"
                                    defaultValue={editingService?.name || ''}
                                    required
                                    placeholder="e.g. Keratin Treatment"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Category</label>
                                    <input
                                        type="text"
                                        name="category"
                                        className="input-field"
                                        defaultValue={editingService?.category || ''}
                                        required
                                        placeholder="e.g. Hair"
                                        list="category-suggestions"
                                    />
                                    <datalist id="category-suggestions">
                                        {categories.filter(c => c !== 'All').map(c => <option key={c} value={c} />)}
                                    </datalist>
                                </div>
                                <div className="form-group">
                                    <label>Price ($)</label>
                                    <input
                                        type="number"
                                        name="price"
                                        className="input-field"
                                        defaultValue={editingService?.price || ''}
                                        required
                                        min="0"
                                        step="0.01"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Duration (minutes)</label>
                                <input
                                    type="number"
                                    name="duration"
                                    className="input-field"
                                    defaultValue={editingService?.duration || ''}
                                    required
                                    min="5"
                                    step="5"
                                />
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    className="input-field textarea"
                                    defaultValue={editingService?.description || ''}
                                    rows={3}
                                    placeholder="Describe what the service includes..."
                                ></textarea>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit" className="btn-primary">Save Service</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServicesView;
