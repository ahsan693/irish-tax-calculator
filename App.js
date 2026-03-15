const App = () => {
    const [currentPage, setCurrentPage] = React.useState('home');

    const handleNavigate = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const renderPage = () => {
        switch(currentPage) {
            case 'home':
                return <Home onNavigate={handleNavigate} />;
            case 'calculator':
                return <FreelancerCalculator />;
            case 'blog':
                return (
                    <div className="calculator-container" style={{ minHeight: '60vh' }}>
                        <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Blog</h1>
                        <p style={{ textAlign: 'center', color: '#999', marginTop: '2rem' }}>
                            Coming soon! We'll be sharing tips and guides about freelancer taxes.
                        </p>
                    </div>
                );
            case 'about':
                return (
                    <div className="calculator-container" style={{ minHeight: '60vh' }}>
                        <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>About Us</h1>
                        <p style={{ textAlign: 'center', color: '#999', marginTop: '2rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                            Freelancer Net Salary Calculator is designed to help self-employed individuals quickly and easily estimate their real net income after taxes, quotas, and deductions. 
                            We use current tax rates and rules to provide accurate estimates.
                        </p>
                    </div>
                );
            default:
                return <Home onNavigate={handleNavigate} />;
        }
    };

    return (
        <div>
            <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
            {renderPage()}
            <Footer />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
