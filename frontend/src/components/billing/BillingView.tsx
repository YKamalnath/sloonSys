import React, { useState } from 'react';
import './Billing.css';

interface InvoiceItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

const BillingView: React.FC = () => {
    const [items, setItems] = useState<InvoiceItem[]>([
        { id: 1, name: 'Women\'s Haircut', price: 45.00, quantity: 1 },
        { id: 2, name: 'Premium Shampoo', price: 18.50, quantity: 1 },
    ]);

    const [customerName, setCustomerName] = useState('Alice Johnson');
    const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'Card' | 'Online'>('Card');
    const [isProcessing, setIsProcessing] = useState(false);
    const [showReceipt, setShowReceipt] = useState(false);

    const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08; // 8% tax rate
    const total = subtotal + tax;

    const handleAddItem = () => {
        const newItem: InvoiceItem = {
            id: Date.now(),
            name: 'New Service/Product',
            price: 0,
            quantity: 1
        };
        setItems([...items, newItem]);
    };

    const handleUpdateItem = (id: number, field: keyof InvoiceItem, value: any) => {
        setItems(items.map(item => {
            if (item.id === id) {
                return { ...item, [field]: value };
            }
            return item;
        }));
    };

    const handleRemoveItem = (id: number) => {
        setItems(items.filter(item => item.id !== id));
    };

    const handleProcessPayment = () => {
        if (items.length === 0) return alert('Add items to the invoice first.');

        setIsProcessing(true);
        // Simulate API call
        setTimeout(() => {
            setIsProcessing(false);
            setShowReceipt(true);
        }, 1500);
    };

    const resetInvoice = () => {
        setItems([]);
        setCustomerName('');
        setShowReceipt(false);
        setPaymentMethod('Card');
    };

    return (
        <div className="module-container animate-fade-in">
            <div className="module-header">
                <div>
                    <h1>Billing & Payment</h1>
                    <p className="subtitle">Process payments and generate receipts.</p>
                </div>
            </div>

            <div className="billing-layout">
                <div className="invoice-section glass-panel">
                    <div className="section-header">
                        <h2>Invoice Details</h2>
                        <div className="invoice-meta">
                            <span className="text-muted">Invoice #INV-{Math.floor(Math.random() * 10000)}</span>
                            <span className="text-muted">{new Date().toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div className="customer-select">
                        <label>Customer Name</label>
                        <input
                            type="text"
                            className="input-field"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            placeholder="Search or enter name..."
                        />
                    </div>

                    <div className="invoice-items">
                        <div className="items-header">
                            <div className="col-name">Item Description</div>
                            <div className="col-price">Price</div>
                            <div className="col-qty">Qty</div>
                            <div className="col-total">Total</div>
                            <div className="col-actions"></div>
                        </div>

                        {items.map(item => (
                            <div className="invoice-row" key={item.id}>
                                <div className="col-name">
                                    <input
                                        type="text"
                                        className="input-field-sm"
                                        value={item.name}
                                        onChange={(e) => handleUpdateItem(item.id, 'name', e.target.value)}
                                    />
                                </div>
                                <div className="col-price">
                                    <span className="currency-symbol">$</span>
                                    <input
                                        type="number"
                                        className="input-field-sm num-input"
                                        value={item.price}
                                        onChange={(e) => handleUpdateItem(item.id, 'price', Number(e.target.value))}
                                    />
                                </div>
                                <div className="col-qty">
                                    <input
                                        type="number"
                                        className="input-field-sm num-input"
                                        value={item.quantity}
                                        min="1"
                                        onChange={(e) => handleUpdateItem(item.id, 'quantity', Number(e.target.value))}
                                    />
                                </div>
                                <div className="col-total">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>
                                <div className="col-actions">
                                    <button className="icon-btn-sm text-danger" onClick={() => handleRemoveItem(item.id)}>✖</button>
                                </div>
                            </div>
                        ))}

                        <button className="add-item-btn" onClick={handleAddItem}>
                            + Add Item
                        </button>
                    </div>
                </div>

                <div className="payment-section glass-panel">
                    <h2>Payment Summary</h2>

                    <div className="summary-card">
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Tax (8%)</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="summary-row total-row">
                            <span>Total Amount</span>
                            <span className="total-amount">${total.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="payment-methods">
                        <h3>Payment Method</h3>
                        <div className="method-grid">
                            <button
                                className={`method-card ${paymentMethod === 'Cash' ? 'active' : ''}`}
                                onClick={() => setPaymentMethod('Cash')}
                            >
                                <span className="method-icon">💵</span>
                                <span>Cash</span>
                            </button>
                            <button
                                className={`method-card ${paymentMethod === 'Card' ? 'active' : ''}`}
                                onClick={() => setPaymentMethod('Card')}
                            >
                                <span className="method-icon">💳</span>
                                <span>Card</span>
                            </button>
                            <button
                                className={`method-card ${paymentMethod === 'Online' ? 'active' : ''}`}
                                onClick={() => setPaymentMethod('Online')}
                            >
                                <span className="method-icon">🌐</span>
                                <span>Online</span>
                            </button>
                        </div>
                    </div>

                    <button
                        className={`btn-primary pay-btn ${isProcessing ? 'processing' : ''}`}
                        onClick={handleProcessPayment}
                        disabled={isProcessing || items.length === 0}
                    >
                        {isProcessing ? 'Processing Payment...' : `Charge $${total.toFixed(2)}`}
                    </button>
                </div>
            </div>

            {showReceipt && (
                <div className="modal-overlay animate-fade-in">
                    <div className="receipt-modal glass-panel">
                        <div className="receipt-header">
                            <div className="success-icon">✓</div>
                            <h2>Payment Successful</h2>
                            <p>Receipt has been generated.</p>
                        </div>

                        <div className="receipt-content">
                            <p><strong>Customer:</strong> {customerName}</p>
                            <p><strong>Amount Paid:</strong> ${total.toFixed(2)}</p>
                            <p><strong>Payment Method:</strong> {paymentMethod}</p>
                            <p><strong>Date:</strong> {new Date().toLocaleString()}</p>
                        </div>

                        <div className="receipt-actions">
                            <button className="btn-secondary" onClick={resetInvoice}>
                                <span>📧</span> Email Receipt
                            </button>
                            <button className="btn-secondary" onClick={resetInvoice}>
                                <span>🖨️</span> Print Receipt
                            </button>
                        </div>

                        <button className="btn-primary full-width mt-4" onClick={resetInvoice}>
                            New Transaction
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BillingView;
