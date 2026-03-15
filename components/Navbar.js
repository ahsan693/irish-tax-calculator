const Navbar = ({ onNavigate, currentPage }) => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <span>�</span>
                <div>
                    <div>Invoo</div>
                    <div style={{ fontSize: '0.7rem', marginTop: '-0.3rem', opacity: 0.7 }}>Freelancer Tools</div>
                </div>
            </div>
            <ul className="navbar-links">
                <li>
                    <a 
                        onClick={() => onNavigate('home')}
                        className={currentPage === 'home' ? 'active' : ''}
                    >
                        Services
                    </a>
                </li>
                <li>
                    <a 
                        onClick={() => onNavigate('calculator')}
                        className={currentPage === 'calculator' ? 'active' : ''}
                    >
                        Calculators
                    </a>
                </li>
                <li>
                    <a 
                        onClick={() => onNavigate('blog')}
                        className={currentPage === 'blog' ? 'active' : ''}
                    >
                        Resources
                    </a>
                </li>
                <li>
                    <a 
                        onClick={() => onNavigate('about')}
                        className={currentPage === 'about' ? 'active' : ''}
                    >
                        About
                    </a>
                </li>
            </ul>
            <button className="navbar-cta" onClick={() => onNavigate('calculator')}>
                Join the waiting list
            </button>
        </nav>
    );
};
