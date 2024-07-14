import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import IncomeTaxCalculator from './components/IncomeTaxCalculator';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/income-tax">Income Tax Calculator</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={
            <>
              <h2>Welcome to our Calculator Project!</h2>
              <p>Click on "Income Tax Calculator" above to use the calculator.</p>
            </>
          } />
          <Route path="/income-tax" element={<IncomeTaxCalculator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;