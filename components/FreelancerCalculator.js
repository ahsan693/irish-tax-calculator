const FreelancerCalculator = () => {
    const [formData, setFormData] = React.useState({
        annualGrossBilling: 0,
        deductibleExpenses: 0,
        taxYear: 2026,
        freelancerStatus: 'existing', // existing or new
        estimationRegime: 'simplified', // simplified or normal
        taxpayerAge: 'under65',
        dependentChildren: 0,
        invoiceWithholding: 15,
    });

    const [expandedSections, setExpandedSections] = React.useState({
        personalSituation: false,
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : (type === 'number' ? parseFloat(value) || 0 : value)
        }));
    };

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    // Freelancer calculation logic
    const calculateFreelancerNetSalary = () => {
        const grossBilling = parseFloat(formData.annualGrossBilling) || 0;
        const expenses = parseFloat(formData.deductibleExpenses) || 0;
        
        // Net income after expenses
        const netIncome = grossBilling - expenses;

        // Freelancer Quota (Social Security Contribution)
        // For Spain 2026: Base €800-€310 depending on regime, ~30% contribution rate
        let freelancerQuota = 0;
        if (formData.estimationRegime === 'simplified') {
            // Simplified: ~€286/month for 2026
            freelancerQuota = (286 * 12);
        } else {
            // Normal: ~€414/month for 2026 (varies by income)
            freelancerQuota = Math.min((netIncome * 0.0646), 414 * 12);
        }

        // Income Tax (IRPF) - Spanish progressive rates
        let irpf = 0;
        const personalMinimum = formData.taxpayerAge === 'under65' ? 6000 : 
                               formData.taxpayerAge === '65to75' ? 7500 : 8000;
        const childDeduction = formData.dependentChildren * 2000;
        const taxableBase = Math.max(0, netIncome - freelancerQuota - personalMinimum - childDeduction);

        if (taxableBase > 0) {
            if (formData.estimationRegime === 'simplified') {
                // Simplified rate: ~19-21% flat
                irpf = taxableBase * 0.19;
            } else {
                // Progressive rates
                if (taxableBase <= 12450) irpf = taxableBase * 0.19;
                else if (taxableBase <= 20200) irpf = (12450 * 0.19) + ((taxableBase - 12450) * 0.24);
                else if (taxableBase <= 35200) irpf = (12450 * 0.19) + (7750 * 0.24) + ((taxableBase - 20200) * 0.30);
                else if (taxableBase <= 60000) irpf = (12450 * 0.19) + (7750 * 0.24) + (15000 * 0.30) + ((taxableBase - 35200) * 0.37);
                else irpf = (12450 * 0.19) + (7750 * 0.24) + (15000 * 0.30) + (24800 * 0.37) + ((taxableBase - 60000) * 0.45);
            }
        }

        // Invoice Withholding (if applicable)
        const invoiceWithheld = (grossBilling * formData.invoiceWithholding) / 100;

        // Total deductions
        const totalDeductions = freelancerQuota + irpf;
        const netSalary = grossBilling - expenses - freelancerQuota - irpf - invoiceWithheld;

        return {
            grossBilling: grossBilling.toFixed(2),
            deductibleExpenses: expenses.toFixed(2),
            netIncome: netIncome.toFixed(2),
            freelancerQuota: freelancerQuota.toFixed(2),
            irpf: irpf.toFixed(2),
            invoiceWithheld: invoiceWithheld.toFixed(2),
            totalDeductions: totalDeductions.toFixed(2),
            netSalary: Math.max(0, netSalary).toFixed(2),
            monthlyNet: (Math.max(0, netSalary) / 12).toFixed(2),
        };
    };

    const results = calculateFreelancerNetSalary();

    return (
        <div className="freelancer-calculator-container">
            <div className="calculator-header">
                <h1>Freelancer Net Salary Calculator</h1>
                <p>Calculate your real net income after taxes, quotas, and deductions</p>
            </div>

            <div className="freelancer-calculator-grid">
                {/* Left Column - Inputs */}
                <div className="calculator-inputs">
                    {/* Billing Section */}
                    <div className="calc-section billing-section">
                        <h3 className="section-title">
                            <span className="section-icon">💰</span>
                            Billing and Expenses
                        </h3>
                        
                        <div className="form-group">
                            <label>Annual Gross Billing</label>
                            <div className="input-wrapper">
                                <input
                                    type="number"
                                    name="annualGrossBilling"
                                    value={formData.annualGrossBilling}
                                    onChange={handleInputChange}
                                    placeholder="0.00"
                                />
                                <span className="currency">€</span>
                            </div>
                            <small>Total billed during the year before taxes (excluding VAT)</small>
                        </div>

                        <div className="form-group">
                            <label>Deductible Expenses</label>
                            <div className="input-wrapper">
                                <input
                                    type="number"
                                    name="deductibleExpenses"
                                    value={formData.deductibleExpenses}
                                    onChange={handleInputChange}
                                    placeholder="0.00"
                                />
                                <span className="currency">€</span>
                            </div>
                            <small>Rent, utilities, materials, training, accounting, etc.</small>
                        </div>
                    </div>

                    {/* Configuration Section */}
                    <div className="calc-section config-section">
                        <h3 className="section-title">
                            <span className="section-icon">⚙️</span>
                            Freelancer Configuration
                        </h3>

                        <div className="form-group">
                            <label>Tax Year</label>
                            <select name="taxYear" value={formData.taxYear} onChange={handleInputChange}>
                                <option value={2024}>2024</option>
                                <option value={2025}>2025</option>
                                <option value={2026}>2026</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Are you a new freelancer?</label>
                            <div className="radio-group">
                                <label className="radio-option">
                                    <input
                                        type="radio"
                                        name="freelancerStatus"
                                        value="existing"
                                        checked={formData.freelancerStatus === 'existing'}
                                        onChange={handleInputChange}
                                    />
                                    <span>No, I'm already registered</span>
                                    <small>I pay quote based on my real income</small>
                                </label>
                            </div>
                            <div className="radio-group">
                                <label className="radio-option">
                                    <input
                                        type="radio"
                                        name="freelancerStatus"
                                        value="new"
                                        checked={formData.freelancerStatus === 'new'}
                                        onChange={handleInputChange}
                                    />
                                    <span>Yes, it's my first registration</span>
                                    <small>I may benefit from Flat Rate or Zero Quota depending on my community</small>
                                </label>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Estimation Regime</label>
                            <div className="radio-group">
                                <label className="radio-option">
                                    <input
                                        type="radio"
                                        name="estimationRegime"
                                        value="simplified"
                                        checked={formData.estimationRegime === 'simplified'}
                                        onChange={handleInputChange}
                                    />
                                    <span>Simplified Direct Estimation</span>
                                    <small>Income &lt; €600,000 - Includes 5% difficult-to-justify expenses</small>
                                </label>
                            </div>
                            <div className="radio-group">
                                <label className="radio-option">
                                    <input
                                        type="radio"
                                        name="estimationRegime"
                                        value="normal"
                                        checked={formData.estimationRegime === 'normal'}
                                        onChange={handleInputChange}
                                    />
                                    <span>Normal Direct Estimation</span>
                                    <small>Income &gt; €600,000 or voluntary choice</small>
                                </label>
                            </div>
                        </div>

                        {/* Personal Situation */}
                        <div 
                            className="collapsible-header"
                            onClick={() => toggleSection('personalSituation')}
                        >
                            <span>👤 Personal Situation</span>
                            <span className="toggle-icon">{expandedSections.personalSituation ? '−' : '+'}</span>
                        </div>

                        {expandedSections.personalSituation && (
                            <div className="collapsible-content">
                                <div className="form-group">
                                    <label>Taxpayer Age</label>
                                    <div className="radio-group">
                                        <label className="radio-option">
                                            <input
                                                type="radio"
                                                name="taxpayerAge"
                                                value="under65"
                                                checked={formData.taxpayerAge === 'under65'}
                                                onChange={handleInputChange}
                                            />
                                            <span>Under 65 years old</span>
                                            <small>Personal minimum: €6,000</small>
                                        </label>
                                    </div>
                                    <div className="radio-group">
                                        <label className="radio-option">
                                            <input
                                                type="radio"
                                                name="taxpayerAge"
                                                value="65to75"
                                                checked={formData.taxpayerAge === '65to75'}
                                                onChange={handleInputChange}
                                            />
                                            <span>65 years or older</span>
                                            <small>Personal minimum: €7,500</small>
                                        </label>
                                    </div>
                                    <div className="radio-group">
                                        <label className="radio-option">
                                            <input
                                                type="radio"
                                                name="taxpayerAge"
                                                value="over75"
                                                checked={formData.taxpayerAge === 'over75'}
                                                onChange={handleInputChange}
                                            />
                                            <span>75 years or older</span>
                                            <small>Personal minimum: €8,100</small>
                                        </label>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Dependent Children</label>
                                    <select name="dependentChildren" value={formData.dependentChildren} onChange={handleInputChange}>
                                        {[0, 1, 2, 3, 4, 5].map(n => (
                                            <option key={n} value={n}>{n}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Invoice Withholding (%)</label>
                                    <div className="input-wrapper">
                                        <input
                                            type="number"
                                            name="invoiceWithholding"
                                            value={formData.invoiceWithholding}
                                            onChange={handleInputChange}
                                            min="0"
                                            max="100"
                                            step="0.5"
                                        />
                                        <span>%</span>
                                    </div>
                                    <small>Withheld by your clients from invoices</small>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column - Results */}
                <div className="calculator-results">
                    <div className="results-panel">
                        <h3 className="results-title">Your Net Salary</h3>
                        
                        <div className="breakdowns">
                            <div className="breakdown-row">
                                <span className="label">Annual Gross Billing</span>
                                <span className="value">€{parseFloat(results.grossBilling).toLocaleString('en-ES', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                            </div>
                            <div className="breakdown-row minus">
                                <span className="label">Deductible Expenses</span>
                                <span className="value">−€{parseFloat(results.deductibleExpenses).toLocaleString('en-ES', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                            </div>
                            <div className="breakdown-row separator">
                                <span className="label">Net Income (before taxes)</span>
                                <span className="value">€{parseFloat(results.netIncome).toLocaleString('en-ES', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                            </div>

                            <div className="deductions-section">
                                <div className="breakdown-row minus">
                                    <span className="label">Freelancer Quota</span>
                                    <span className="value">−€{parseFloat(results.freelancerQuota).toLocaleString('en-ES', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                                </div>
                                <div className="breakdown-row minus">
                                    <span className="label">Income Tax (IRPF)</span>
                                    <span className="value">−€{parseFloat(results.irpf).toLocaleString('en-ES', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                                </div>
                                <div className="breakdown-row minus">
                                    <span className="label">Invoice Withholding</span>
                                    <span className="value">−€{parseFloat(results.invoiceWithheld).toLocaleString('en-ES', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                                </div>
                            </div>

                            <div className="breakdown-row separator total">
                                <span className="label">Annual Net Salary</span>
                                <span className="value highlight">€{parseFloat(results.netSalary).toLocaleString('en-ES', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                            </div>

                            <div className="breakdown-row monthly">
                                <span className="label">Monthly Net Salary</span>
                                <span className="value">€{parseFloat(results.monthlyNet).toLocaleString('en-ES', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                            </div>
                        </div>

                        <div className="tax-info">
                            <h4>Deductions Breakdown</h4>
                            <ul>
                                <li><strong>Freelancer Quota (Social Security):</strong> Monthly Social Security contribution based on your regime</li>
                                <li><strong>Income Tax (IRPF):</strong> Progressive tax on your taxable income after quotas and personal minimums</li>
                                <li><strong>Invoice Withholding:</strong> Taxes withheld by clients, credited against your annual tax return</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
