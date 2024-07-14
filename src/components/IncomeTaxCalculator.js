import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

function IncomeTaxCalculator() {
    const [income, setIncome] = useState('');
    const [taxableIncome, setTaxableIncome] = useState(0);
    const [federalTax, setFederalTax] = useState(0);
    const [stateTax, setStateTax] = useState(0);
    const [totalTax, setTotalTax] = useState(0);
    const [chartData, setChartData] = useState(null);

    const handleIncomeChange = (e) => {
        setIncome(e.target.value);
    };

    const calculateTax = () => {
        const incomeValue = parseFloat(income);
        
        const federalBrackets = [
            { limit: 11000, rate: 0.10 },
            { limit: 44725, rate: 0.12 },
            { limit: 95375, rate: 0.22 },
            { limit: 182100, rate: 0.24 },
            { limit: 231250, rate: 0.32 },
            { limit: 578125, rate: 0.35 },
            { limit: Infinity, rate: 0.37 }
        ];

        const californiaBrackets = [
            { limit: 10099, rate: 0.01 },
            { limit: 23942, rate: 0.02 },
            { limit: 37788, rate: 0.04 },
            { limit: 52455, rate: 0.06 },
            { limit: 66295, rate: 0.08 },
            { limit: 338639, rate: 0.093 },
            { limit: 406364, rate: 0.103 },
            { limit: 677275, rate: 0.113 },
            { limit: Infinity, rate: 0.123 }
        ];

        let federalTaxAmount = 0;
        let remainingIncome = incomeValue;
        let previousLimit = 0;

        for (let bracket of federalBrackets) {
            if (remainingIncome > 0) {
                const taxableAmount = Math.min(remainingIncome, bracket.limit - previousLimit);
                federalTaxAmount += taxableAmount * bracket.rate;
                remainingIncome -= taxableAmount;
                previousLimit = bracket.limit;
            } else {
                break;
            }
        }

        let stateTaxAmount = 0;
        remainingIncome = incomeValue;
        previousLimit = 0;

        for (let bracket of californiaBrackets) {
            if (remainingIncome > 0) {
                const taxableAmount = Math.min(remainingIncome, bracket.limit - previousLimit);
                stateTaxAmount += taxableAmount * bracket.rate;
                remainingIncome -= taxableAmount;
                previousLimit = bracket.limit;
            } else {
                break;
            }
        }

        const totalTaxAmount = federalTaxAmount + stateTaxAmount;

        setTaxableIncome(incomeValue);
        setFederalTax(federalTaxAmount);
        setStateTax(stateTaxAmount);
        setTotalTax(totalTaxAmount);

        // Update chart data
        setChartData({
            labels: ['Federal Tax', 'State Tax', 'Total Tax'],
            datasets: [
                {
                    label: 'Tax Amounts',
                    data: [federalTaxAmount, stateTaxAmount, totalTaxAmount],
                    backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)']
                }
            ]
        });
    };

    return (
        <div>
            <h2>Income Tax Calculator</h2>
            <form onSubmit={(e) => { e.preventDefault(); calculateTax(); }}>
                <label>
                    Annual Income:
                    <input 
                        type="number" 
                        value={income} 
                        onChange={handleIncomeChange} 
                        placeholder="Enter your annual income"
                    />
                </label>
                <button type="submit">Calculate</button>
            </form>
            {totalTax > 0 && (
                <div>
                    <p>Taxable Income: ${taxableIncome.toFixed(2)}</p>
                    <p>Federal Tax: ${federalTax.toFixed(2)}</p>
                    <p>State Tax: ${stateTax.toFixed(2)}</p>
                    <p>Total Tax: ${totalTax.toFixed(2)}</p>
                </div>
            )}
            {chartData && (
                <div>
                    <h3>Tax Visualization</h3>
                    <Bar data={chartData} />
                </div>
            )}
        </div>
    );
}

export default IncomeTaxCalculator;
