const Calculator = () => {
    const [formData, setFormData] = React.useState({
        employmentIncome: 0,
        selfEmployedIncome: 0,
        rentalIncome: 0,
        socialSecurityContributions: 0,
        personalPensionContributions: 0,
        withholdings: 0,
        difficultToJustifyExpenses: 0,
        personalMinimum: 0,
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
        breakdownView: false,
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
        const employment = parseFloat(formData.employmentIncome) || 0;
        const selfEmployed = parseFloat(formData.selfEmployedIncome) || 0;
        const rental = parseFloat(formData.rentalIncome) || 0;
        const difficultExpenses = parseFloat(formData.difficultToJustifyExpenses) || 0;
        const personalMin = parseFloat(formData.personalMinimum) || 5550;
        const withholdings = parseFloat(formData.withholdings) || 0;

        const totalIncome = employment + selfEmployed + rental;
        const netIncomeAfterExpenses = totalIncome - difficultExpenses;

        // Basic Irish tax rate for 2026
        let incomeTax = 0;
        const standardRate = 0.20;
        const higherRate = 0.40;
        const standardRateLimit = 48000;

        if (netIncomeAfterExpenses > standardRateLimit) {
            incomeTax = (standardRateLimit * standardRate) + 
                       ((netIncomeAfterExpenses - standardRateLimit) * higherRate);
        } else {
            incomeTax = Math.max(0, netIncomeAfterExpenses * standardRate);
        }

        // USC (Universal Social Charge)
        let usc = 0;
        if (netIncomeAfterExpenses > 1000) {
            const uscIncome = netIncomeAfterExpenses - 1000;
            usc = uscIncome * 0.045;
        }

        // PRSI (if employed)
        let prsi = employment * 0.0411;

        // Gross tax before withholdings
        const grossTax = incomeTax + usc + prsi;
        
        // To be refunded/owed
        const toBeRefunded = withholdings - grossTax;
        
        // Net income calculation
        const totalDeductions = grossTax - toBeRefunded;
        const actualNetIncome = totalIncome - difficultExpenses - grossTax;
        
        // Effective rate
        const effectiveRate = totalIncome > 0 ? ((grossTax / totalIncome) * 100) : 0;
        
        // Monthly net
        const monthlyNet = actualNetIncome / 12;

        return {
            totalIncome: totalIncome.toFixed(2),
            netIncome: netIncomeAfterExpenses.toFixed(2),
            difficultExpenses: difficultExpenses.toFixed(2),
            personalMinimum: personalMin.toFixed(2),
            incomeTax: incomeTax.toFixed(2),
            usc: usc.toFixed(2),
            prsi: prsi.toFixed(2),
            grossTax: grossTax.toFixed(2),
            withholdings: withholdings.toFixed(2),
            toBeRefunded: toBeRefunded.toFixed(2),
            totalTax: grossTax.toFixed(2),
            effectiveRate: effectiveRate.toFixed(2),
            monthlyNet: monthlyNet.toFixed(2),
            actualNetIncome: actualNetIncome.toFixed(2),
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

                        <div className="form-group form-group-inline">
                            <label>Difficult-to-justify Expenses (5%):</label>
                            <input
                                type="number"
                                name="difficultToJustifyExpenses"
                                value={formData.difficultToJustifyExpenses}
                                onChange={handleInputChange}
                                placeholder="0.00"
                            />
                            <span className="currency-symbol">€</span>
                            <small>Expenses that are difficult to justify.</small>
                        </div>

                        <div className="form-group form-group-inline">
                            <label>Withholdings Already Paid:</label>
                            <input
                                type="number"
                                name="withholdings"
                                value={formData.withholdings}
                                onChange={handleInputChange}
                                placeholder="0.00"
                            />
                            <span className="currency-symbol">€</span>
                            <small>Total tax withheld during the year.</small>
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
                                <div className="result-label">Net Income</div>
                                <div className="result-value">€{parseFloat(results.netIncome).toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                            </div>
                            <div className="result-item">
                                <div className="result-label">Difficult-to-justify expenses (5%)</div>
                                <div className="result-value" style={{ color: '#ff6b6b' }}>-€{parseFloat(results.difficultExpenses).toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                            </div>
                            <div className="result-item">
                                <div className="result-label">Personal minimum</div>
                                <div className="result-value">€{parseFloat(results.personalMinimum).toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                            </div>
                            <div className="result-item">
                                <div className="result-label">Gross tax</div>
                                <div className="result-value">€{parseFloat(results.grossTax).toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                            </div>
                            <div className="result-item">
                                <div className="result-label">Withholdings already paid</div>
                                <div className="result-value" style={{ color: '#ff6b6b' }}>-€{parseFloat(results.withholdings).toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                            </div>
                            <div className="result-item">
                                <div className="result-label">To be refunded</div>
                                <div className="result-value" style={{ fontSize: '1.8rem', color: '#51cf66', fontWeight: 'bold' }}>€{parseFloat(results.toBeRefunded).toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                            </div>
                        </div>

                        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <div style={{ fontSize: '0.85rem', color: '#888' }}>Effective rate</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>{parseFloat(results.effectiveRate)}%</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.85rem', color: '#888' }}>Monthly net</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#51cf66' }}>€{parseFloat(results.monthlyNet).toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                                </div>
                            </div>
                        </div>

                        {parseFloat(results.toBeRefunded) > 0 && (
                            <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'rgba(81, 207, 102, 0.2)', borderLeft: '4px solid #51cf66', borderRadius: '4px', color: '#51cf66', fontSize: '0.9rem' }}>
                                ✓ The withholdings exceed your income tax liability. The difference will be refunded in your tax return.
                            </div>
                        )}

                        <div 
                            className={`collapsible ${expandedSections.breakdownView ? 'active' : ''}`}
                            onClick={() => toggleSection('breakdownView')}
                            style={{ marginTop: '1rem' }}
                        >
                            <span>▶ View breakdown by brackets</span>
                            <span>{expandedSections.breakdownView ? '−' : '+'}</span>
                        </div>

                        {expandedSections.breakdownView && (
                            <div style={{ marginTop: '1rem' }}>
                                <div className="results-grid" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: '1rem', borderRadius: '8px' }}>
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
                                </div>
                            </div>
                        )}

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
