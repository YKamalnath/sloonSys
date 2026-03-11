import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <div className="hero-badge">✨ Introducing Sloon System V1</div>
                    <h1 className="hero-title">
                        Elevate Your Business with
                        <span className="text-gradient"> Premium Management</span>
                    </h1>
                    <p className="hero-description">
                        The ultimate platform to securely manage your operations, connect with customers, and drive growth with beautiful, real-time analytics.
                    </p>
                    <div className="hero-buttons">
                        <Link to="/register" className="btn btn-primary">Get Started Now</Link>
                        <a href="#features" className="btn btn-outline">Explore Features</a>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="glass-panel">
                        <img src="/hero-artwork.png" alt="Sloon System Dashboard Abstract UI" className="abstract-art" />
                    </div>
                </div>
            </section>

            {/* Features Matrix */}
            <section id="features" className="features">
                <div className="features-header">
                    <h2>Why Choose Sloon?</h2>
                    <p>Everything you need, wrapped in a beautiful, responsive interface.</p>
                </div>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🔒</div>
                        <h3>Secure Authentication</h3>
                        <p>Enterprise-grade JWT token security with HTTP-only cookies keeps your session safe.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">⚡</div>
                        <h3>Lightning Fast</h3>
                        <p>Optimized with Vite and React for snappy, instant page transitions without reloading.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">💎</div>
                        <h3>Premium Design</h3>
                        <p>Glassmorphism, gradients, and subtle micro-animations make the user experience a joy.</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-content">
                    <h2>Ready to get started?</h2>
                    <p>Join today and experience the future of management software.</p>
                    <Link to="/register" className="btn btn-primary cta-btn">Create Free Account</Link>
                </div>
            </section>
        </div>
    );
}
