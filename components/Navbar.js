const Navbar = ({ onNavigate, currentPage }) => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <span>📊</span>
                <div>
                    <div>Income Tax</div>
                    <div style={{ fontSize: '0.8rem', marginTop: '-0.3rem' }}>Calculator</div>
                </div>
            </div>
            <ul className="navbar-links">
                <li>
                    <a 
                        onClick={() => onNavigate('home')}
                        className={currentPage === 'home' ? 'active' : ''}
                    >
                        Home
                    </a>
                </li>
                <li>
                    <a 
                        onClick={() => onNavigate('calculator')}
                        className={currentPage === 'calculator' ? 'active' : ''}
                    >
                        Calculator
                    </a>
                </li>
                <li>
                    <a 
                        onClick={() => onNavigate('blog')}
                        className={currentPage === 'blog' ? 'active' : ''}
                    >
                        Blog
                    </a>
                </li>
                <li>
                    <a 
                        onClick={() => onNavigate('about')}
                        className={currentPage === 'about' ? 'active' : ''}
                    >
                        About Us
                    </a>
                </li>
            </ul>
            <button className="navbar-cta" onClick={() => onNavigate('calculator')}>
                Claim Your Free Irish Tax Guide
            </button>
        </nav>
    );
};
