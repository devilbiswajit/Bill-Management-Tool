import React from 'react';
import AddBillForm from './components/AddBillForm';
import BillList from './components/BillList';
import FilterDropdown from './components/FilterDropdown';
import TimeSeriesChart from './components/TimeSeriesChart';

const App = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
    <div className="max-w-4xl w-full p-6 bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Bill Management Tool</h1>
      <AddBillForm />
      <FilterDropdown />
      <BillList />
      <TimeSeriesChart />
    </div>
  </div>
);

export default App;





