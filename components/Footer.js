const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <span style={{ fontSize: '2rem' }}>📊</span>
                        <div>
                            <strong style={{ color: 'white', fontSize: '1rem' }}>Income Tax</strong>
                            <div style={{ fontSize: '0.8rem', color: '#999' }}>Calculator</div>
                        </div>
                    </div>
                    <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                        Free Irish Income Tax Calculator helping individuals estimate Income Tax, USC, and PRSI using current Irish Revenue rates.
                    </p>
                </div>

                <div className="footer-section">
                    <h4>Company</h4>
                    <ul>
                        <li><a href="#about">About</a></li>
                        <li><a href="#contact">Contact</a></li>
                        <li><a href="#privacy">Privacy Policy</a></li>
                        <li><a href="#terms">Terms of Use</a></li>
                        <li><a href="#cookies">Cookie Policy</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Resources</h4>
                    <ul>
                        <li><a href="#tax-credits">Tax Credits Explained</a></li>
                        <li><a href="#usc-guide">USC Guide</a></li>
                        <li><a href="#prsi-guide">PRSI Guide</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Calculator</h4>
                    <ul>
                        <li><a href="#income-calculator">About Income Tax Calculator</a></li>
                        <li><a href="#net-salary">Net Salary Calculator</a></li>
                        <li><a href="#take-home">Take Home Pay Calculator</a></li>
                        <li><a href="#budget-updates">Budget 2026 Updates</a></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2026 (Income Tax Calculator). All rights reserved. Built and maintained by Dropline Media. Estimates only. Not financial or tax advice.</p>
                <div className="footer-socials">
                    <a href="#linkedin" title="LinkedIn">💼</a>
                    <a href="#instagram" title="Instagram">📷</a>
                </div>
            </div>
        </footer>
    );
};
