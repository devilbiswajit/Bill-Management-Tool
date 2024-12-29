import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const TimeSeriesChart = () => {
  const bills = useSelector((state) => state.bills.bills);

  const monthlyData = bills.reduce((acc, bill) => {
    const month = new Date(bill.date).toLocaleString('default', { month: 'short' });
    acc[month] = (acc[month] || 0) + bill.amount;
    return acc;
  }, {});

  const data = Object.keys(monthlyData).map((month) => ({
    name: month,
    Total: monthlyData[month],
  }));

  return (
    <div className="p-4 bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-white">Monthly Billing Cycle</h2>
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Total" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
};

export default TimeSeriesChart;

