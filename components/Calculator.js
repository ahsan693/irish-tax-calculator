const Calculator = () => {
    const [formData, setFormData] = React.useState({
        employmentIncome: 0,
        selfEmployedIncome: 0,
        rentalIncome: 0,
        socialSecurityContributions: 0,
        personalPensionContributions: 0,
        taxYear: 2026,
        age: 0,
        maritalStatus: 'married',
        numberOfChildren: 0,
        mortgageInterest: 0,
        mortgageInterestRelief: true,
        renting: true,
        selfEmployed: true,
    });

    const [expandedSections, setExpandedSections] = React.useState({
        additionalDetails: false,
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    // Simple tax calculation for 2026
    const calculateTax = () => {
        const totalIncome = 
            parseFloat(formData.employmentIncome) + 
            parseFloat(formData.selfEmployedIncome) + 
            parseFloat(formData.rentalIncome);

        // Basic Irish tax rate for 2026
        let incomeTax = 0;
        const standardRate = 0.20;
        const higherRate = 0.40;
        const standardRateLimit = 48000;

        if (totalIncome > standardRateLimit) {
            incomeTax = (standardRateLimit * standardRate) + 
                       ((totalIncome - standardRateLimit) * higherRate);
        } else {
            incomeTax = totalIncome * standardRate;
        }

        // USC (Universal Social Charge)
        let usc = 0;
        if (totalIncome > 1000) {
            const uscIncome = totalIncome - 1000;
            usc = uscIncome * 0.045;
        }

        // PRSI (if employed)
        let prsi = parseFloat(formData.employmentIncome) * 0.0411;

        // Personal Pension Contributions
        const personalPension = parseFloat(formData.personalPensionContributions);

        // Total deductions
        const totalTax = incomeTax + usc + prsi;
        const netIncome = totalIncome - totalTax;

        return {
            totalIncome,
            incomeTax: incomeTax.toFixed(2),
            usc: usc.toFixed(2),
            prsi: prsi.toFixed(2),
            totalTax: totalTax.toFixed(2),
            netIncome: netIncome.toFixed(2),
        };
    };

    const results = calculateTax();

    return (
        <div className="calculator-container">
            <h1 className="calculator-title">Irish Income Tax Calculator</h1>
            
            <div className="calculator-grid">
                {/* Left Column - Inputs */}
                <div>
                    {/* Income Section */}
                    <div className="calculator-section income-section">
                        <div className="section-title">Income</div>
                        <p style={{ fontSize: '0.9rem', color: '#888', marginBottom: '1.5rem' }}>
                            Enter your gross income before any tax deductions.
                        </p>

                        <div className="form-group form-group-inline">
                            <label>Employment Income:</label>
                            <input
                                type="number"
                                name="employmentIncome"
                                value={formData.employmentIncome}
                                onChange={handleInputChange}
                                placeholder="0.00"
                            />
                            <span className="currency-symbol">€</span>
                            <small>Total annual salary before tax.</small>
                        </div>

                        <div className="form-group form-group-inline">
                            <label>Self-Employed/Other Income:</label>
                            <input
                                type="number"
                                name="selfEmployedIncome"
                                value={formData.selfEmployedIncome}
                                onChange={handleInputChange}
                                placeholder="0.00"
                            />
                            <span className="currency-symbol">€</span>
                            <small>Profit before tax, not total revenue.</small>
                        </div>

                        <div className="form-group form-group-inline">
                            <label>Rental Income:</label>
                            <input
                                type="number"
                                name="rentalIncome"
                                value={formData.rentalIncome}
                                onChange={handleInputChange}
                                placeholder="0.00"
                            />
                            <span className="currency-symbol">€</span>
                            <small>Total social security contributions paid</small>
                        </div>

                        <div className="form-group form-group-inline">
                            <label>Personal Pension Contributions:</label>
                            <input
                                type="number"
                                name="personalPensionContributions"
                                value={formData.personalPensionContributions}
                                onChange={handleInputChange}
                                placeholder="0.00"
                            />
                            <span className="currency-symbol">€</span>
                        </div>
                    </div>

                    {/* Tax Configuration */}
                    <div className="calculator-section tax-config" style={{ marginTop: '1.5rem' }}>
                        <div className="section-title">Tax configuration</div>

                        <div className="form-group">
                            <label>Tax year</label>
                            <select name="taxYear" value={formData.taxYear} onChange={handleInputChange}>
                                <option value={2024}>2024</option>
                                <option value={2025}>2025</option>
                                <option value={2026}>2026</option>
                            </select>
                            <small>Tax rules, bands and credits change each year. Select the year you want to calculate.</small>
                        </div>

                        <div className="form-group">
                            <label>Personal Details</label>
                            <p style={{ fontSize: '0.85rem', color: '#999', marginTop: '0.5rem' }}>
                                These details affect tax bands and credits.
                            </p>
                        </div>

                        <div className="form-group">
                            <label>Age:</label>
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleInputChange}
                                placeholder="0"
                            />
                            <small>Age determines pension contribution relief limits.</small>
                        </div>

                        <div className="form-group">
                            <label>Marital Status:</label>
                            <div className="checkbox-group">
                                <label className="radio-option">
                                    <input
                                        type="radio"
                                        name="maritalStatus"
                                        value="single"
                                        checked={formData.maritalStatus === 'single'}
                                        onChange={handleInputChange}
                                    />
                                    Single
                                </label>
                                <label className="radio-option">
                                    <input
                                        type="radio"
                                        name="maritalStatus"
                                        value="married"
                                        checked={formData.maritalStatus === 'married'}
                                        onChange={handleInputChange}
                                    />
                                    Married One Earner
                                </label>
                            </div>
                        </div>

                        {/* Additional Details */}
                        <div 
                            className={`collapsible ${expandedSections.additionalDetails ? 'active' : ''}`}
                            onClick={() => toggleSection('additionalDetails')}
                        >
                            <span>● Additional Details</span>
                            <span>{expandedSections.additionalDetails ? '−' : '+'}</span>
                        </div>

                        {expandedSections.additionalDetails && (
                            <div style={{ marginTop: '1rem' }}>
                                <div className="form-group">
                                    <label>Number of Children:</label>
                                    <select name="numberOfChildren" value={formData.numberOfChildren} onChange={handleInputChange}>
                                        <option value={0}>0</option>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4+</option>
                                    </select>
                                </div>

                                <div className="form-group form-group-inline">
                                    <label>Increase in mortgage interest from 2025 to 2026:</label>
                                    <input
                                        type="number"
                                        name="mortgageInterest"
                                        value={formData.mortgageInterest}
                                        onChange={handleInputChange}
                                        placeholder="0.00"
                                    />
                                    <span className="currency-symbol">€</span>
                                </div>

                                <div className="form-group">
                                    <label>Entitled to Mortgage Interest Relief:</label>
                                    <div className="checkbox-group">
                                        <label className="radio-option">
                                            <input
                                                type="radio"
                                                name="mortgageInterestRelief"
                                                value={true}
                                                checked={formData.mortgageInterestRelief === true}
                                                onChange={() => setFormData(prev => ({ ...prev, mortgageInterestRelief: true }))}
                                            />
                                            Yes
                                        </label>
                                        <label className="radio-option">
                                            <input
                                                type="radio"
                                                name="mortgageInterestRelief"
                                                value={false}
                                                checked={formData.mortgageInterestRelief === false}
                                                onChange={() => setFormData(prev => ({ ...prev, mortgageInterestRelief: false }))}
                                            />
                                            No
                                        </label>
                                    </div>
                                    <small style={{ marginTop: '0.5rem', display: 'block' }}>Affects tax bands and transferable credits.</small>
                                </div>

                                <div className="form-group">
                                    <label>Renting?</label>
                                    <div className="checkbox-group">
                                        <label className="radio-option">
                                            <input
                                                type="radio"
                                                name="renting"
                                                value={true}
                                                checked={formData.renting === true}
                                                onChange={() => setFormData(prev => ({ ...prev, renting: true }))}
                                            />
                                            Yes
                                        </label>
                                        <label className="radio-option">
                                            <input
                                                type="radio"
                                                name="renting"
                                                value={false}
                                                checked={formData.renting === false}
                                                onChange={() => setFormData(prev => ({ ...prev, renting: false }))}
                                            />
                                            No
                                        </label>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Self-employed?</label>
                                    <div className="checkbox-group">
                                        <label className="radio-option">
                                            <input
                                                type="radio"
                                                name="selfEmployed"
                                                value={true}
                                                checked={formData.selfEmployed === true}
                                                onChange={() => setFormData(prev => ({ ...prev, selfEmployed: true }))}
                                            />
                                            Yes
                                        </label>
                                        <label className="radio-option">
                                            <input
                                                type="radio"
                                                name="selfEmployed"
                                                value={false}
                                                checked={formData.selfEmployed === false}
                                                onChange={() => setFormData(prev => ({ ...prev, selfEmployed: false }))}
                                            />
                                            No
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column - Results */}
                <div>
                    <div className="results-section">
                        <div className="section-title" style={{ color: 'white', marginBottom: '1.5rem' }}>Tax breakdown based on your inputs.</div>
                        
                        <div className="results-grid">
                            <div className="result-item">
                                <div className="result-label">Total Income</div>
                                <div className="result-value">€{parseFloat(results.totalIncome).toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                            </div>
                            <div className="result-item">
                                <div className="result-label">Income Tax</div>
                                <div className="result-value">€{parseFloat(results.incomeTax).toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                            </div>
                            <div className="result-item">
                                <div className="result-label">PRSI</div>
                                <div className="result-value">€{parseFloat(results.prsi).toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                            </div>
                            <div className="result-item">
                                <div className="result-label">USC</div>
                                <div className="result-value">€{parseFloat(results.usc).toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                            </div>
                            <div className="result-item">
                                <div className="result-label">Total Tax</div>
                                <div className="result-value">€{parseFloat(results.totalTax).toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                            </div>
                            <div className="result-item">
                                <div className="result-label">Net Income</div>
                                <div className="result-value" style={{ fontSize: '2rem' }}>€{parseFloat(results.netIncome).toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                            </div>
                        </div>

                        <div className="taxberg-visualization">
                            <div className="taxberg-title">🏔️ The Taxberg</div>
                            <div className="taxberg-info">
                                <p>€{parseFloat(results.netIncome).toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', color: '#555' }}>Net pay</p>
                                <hr style={{ margin: '1rem 0', border: 'none', borderTop: '2px solid #333', opacity: 0.5 }} />
                                <p style={{ fontSize: '0.85rem' }}>Your employer also pays tax on your salary. It costs the employer € {(parseFloat(results.prsi) + parseFloat(results.incomeTax)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} to pay you € {parseFloat(results.netIncome).toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}. In other words, every time you spend €10 of your hard-earned money, €3 goes to the government.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
