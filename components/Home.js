const Home = ({ onNavigate }) => {
    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1>
                        Income Tax Calculator Ireland
                        <br />
                        <span className="highlight">Calculate Your Net Salary</span>
                    </h1>
                    <p>
                        Enter your salary and instantly calculate Income Tax, USC, PRSI, and your take home 
                        pay using current Irish tax rates.
                    </p>
                    <button className="cta-button" onClick={() => onNavigate('calculator')}>
                        Calculate my tax →
                    </button>
                    <div className="features">
                        <div className="feature-badge">2026 tax rates</div>
                        <div className="feature-badge">No PPSN required</div>
                        <div className="feature-badge">Instant results</div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="benefits-section">
                <div className="benefits-container">
                    <h2 className="benefits-title">
                        A Better Way to
                        <br />
                        <span className="blue">Estimate Your</span> <span className="pink">Income</span>
                    </h2>
                    <p className="benefits-subtitle">
                        Designed for clarity, updated rates, and straightforward tax estimates.
                    </p>
                    <div className="benefits-grid">
                        <div className="benefit-card">
                            <div className="benefit-icon">👤</div>
                            <h3>User Friendly Design</h3>
                            <p>Enter your income and details in seconds. No complex forms, no unnecessary steps.</p>
                        </div>
                        <div className="benefit-card">
                            <div className="benefit-icon">⚡</div>
                            <h3>Updated for Budget 2026</h3>
                            <p>Uses the latest Irish Income Tax, USC, and PRSI rates based on current Budget changes.</p>
                        </div>
                        <div className="benefit-card">
                            <div className="benefit-icon">📊</div>
                            <h3>Detailed Breakdown</h3>
                            <p>See exactly how your tax is calculated with a clear visual breakdown of all deductions.</p>
                        </div>
                        <div className="benefit-card">
                            <div className="benefit-icon">⚙️</div>
                            <h3>Advanced Options</h3>
                            <p>Configure personal details, credits, and relief to get an accurate estimate.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="hero-section" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
                <h2 className="benefits-title">
                    Maximize Your <span className="pink">Tax Relief.</span>
                </h2>
                <p style={{ color: '#666', margin: '1rem 0 2rem 0', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                    Download our practical Irish tax saving guide and learn which credits and reliefs you may be entitled 
                    to under current Revenue rules.
                </p>
                <button className="cta-button" onClick={() => alert('Tax Guide would be downloaded')}>
                    Claim Your Free Irish Tax Guide →
                </button>
                <p style={{ color: '#999', marginTop: '1rem', fontSize: '0.9rem' }}>
                    Instant access. No spam.
                </p>
            </section>
        </div>
    );
};
