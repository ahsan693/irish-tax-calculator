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
                return <Calculator />;
            case 'blog':
                return (
                    <div className="calculator-container" style={{ minHeight: '60vh' }}>
                        <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Blog</h1>
                        <p style={{ textAlign: 'center', color: '#666', marginTop: '2rem' }}>
                            Coming soon! We'll be sharing tips and guides about Irish taxes.
                        </p>
                    </div>
                );
            case 'about':
                return (
                    <div className="calculator-container" style={{ minHeight: '60vh' }}>
                        <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>About Us</h1>
                        <p style={{ textAlign: 'center', color: '#666', marginTop: '2rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                            Income Tax Calculator is designed to help individuals quickly and easily estimate their Irish tax liabilities. 
                            We use current Irish Revenue rates and rules to provide accurate estimates.
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
