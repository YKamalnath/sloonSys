import React, { useState } from 'react';
import './Products.css';

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
    brand: string;
}

const ProductsView: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([
        { id: 1, name: 'Premium Argan Shampoo', category: 'Shampoo', price: 24.99, stock: 45, brand: 'SloonCare' },
        { id: 2, name: 'Matte Finish Hair Gel', category: 'Hair Gel', price: 18.50, stock: 12, brand: 'StyleMax' },
        { id: 3, name: 'Nourishing Hair Oil', category: 'Hair Oil', price: 32.00, stock: 8, brand: 'Natura' },
        { id: 4, name: 'Color Protect Conditioner', category: 'Conditioner', price: 22.99, stock: 30, brand: 'SloonCare' },
        { id: 5, name: 'Beard Softening Balm', category: 'Grooming', price: 15.00, stock: 3, brand: 'Gentleman' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const categories = ['All', 'Shampoo', 'Conditioner', 'Hair Gel', 'Hair Oil', 'Grooming', 'Other'];

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    const handleAdd = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const newProduct: Product = {
            id: editingProduct ? editingProduct.id : Date.now(),
            name: formData.get('name') as string,
            category: formData.get('category') as string,
            brand: formData.get('brand') as string,
            price: Number(formData.get('price')),
            stock: Number(formData.get('stock')),
        };

        if (editingProduct) {
            setProducts(products.map(p => p.id === editingProduct.id ? newProduct : p));
        } else {
            setProducts([...products, newProduct]);
        }

        setIsModalOpen(false);
    };

    const getStockStatus = (stock: number) => {
        if (stock === 0) return { label: 'Out of Stock', class: 'danger' };
        if (stock <= 10) return { label: 'Low Stock', class: 'warning' };
        return { label: 'In Stock', class: 'success' };
    };

    return (
        <div className="module-container animate-fade-in">
            <div className="module-header">
                <div>
                    <h1>Product Management</h1>
                    <p className="subtitle">Track inventory, add new products, and update stock.</p>
                </div>
                <button className="btn-primary" onClick={handleAdd}>
                    <span className="icon">➕</span> Add Product
                </button>
            </div>

            <div className="glass-panel module-content">
                <div className="toolbar">
                    <div className="search-bar">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="Search products or brands..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="filters">
                        <select
                            className="input-field select-field"
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat} Categories</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="table-wrapper">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Brand & Category</th>
                                <th>Price</th>
                                <th>Stock Level</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map(product => {
                                const stockStatus = getStockStatus(product.stock);
                                return (
                                    <tr key={product.id}>
                                        <td>
                                            <div className="product-name-col">
                                                <div className="product-icon">🧴</div>
                                                <span className="font-medium">{product.name}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="product-meta-col">
                                                <span className="brand-name">{product.brand}</span>
                                                <span className="badge badge-default">{product.category}</span>
                                            </div>
                                        </td>
                                        <td className="font-medium text-success">${product.price.toFixed(2)}</td>
                                        <td>
                                            <div className="stock-col">
                                                <span className="stock-number">{product.stock} units</span>
                                                <span className={`badge badge-${stockStatus.class}`}>{stockStatus.label}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="icon-btn-sm" onClick={() => handleEdit(product)} title="Edit">✏️</button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            {filteredProducts.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="empty-state">
                                        <p>No products found matching your criteria.</p>
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
                            <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                            <button className="close-btn" onClick={() => setIsModalOpen(false)}>✖</button>
                        </div>

                        <form onSubmit={handleSave} className="modal-form">
                            <div className="form-group">
                                <label>Product Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="input-field"
                                    defaultValue={editingProduct?.name || ''}
                                    required
                                    placeholder="e.g. Argan Oil Shampoo"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Brand</label>
                                    <input
                                        type="text"
                                        name="brand"
                                        className="input-field"
                                        defaultValue={editingProduct?.brand || ''}
                                        required
                                        placeholder="e.g. SloonCare"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Category</label>
                                    <select name="category" className="input-field select-field" defaultValue={editingProduct?.category || 'Shampoo'}>
                                        {categories.filter(c => c !== 'All').map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Price ($)</label>
                                    <input
                                        type="number"
                                        name="price"
                                        className="input-field"
                                        defaultValue={editingProduct?.price || ''}
                                        required
                                        min="0"
                                        step="0.01"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Stock Quantity</label>
                                    <input
                                        type="number"
                                        name="stock"
                                        className="input-field"
                                        defaultValue={editingProduct?.stock || 0}
                                        required
                                        min="0"
                                        step="1"
                                    />
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit" className="btn-primary">Save Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductsView;
