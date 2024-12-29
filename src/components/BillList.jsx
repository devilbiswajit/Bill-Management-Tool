import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeBill, editBill } from '../features/bills/billsSlice';

const BillList = () => {
  const dispatch = useDispatch();
  const bills = useSelector((state) => {
    const filter = state.bills.filter;
    if (filter === 'All') return state.bills.bills;
    return state.bills.bills.filter((bill) => bill.category === filter);
  });

  const [editingBill, setEditingBill] = useState(null);
  const [formData, setFormData] = useState({
    description: '',
    category: '',
    amount: '',
    date: '',
  });

  const startEditing = (bill) => {
    setEditingBill(bill.id);
    setFormData(bill);
  };

  const handleEditChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveEdit = () => {
    dispatch(editBill({ ...formData, amount: Number(formData.amount) }));
    setEditingBill(null);
  };

  const cancelEdit = () => {
    setEditingBill(null);
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-md">
      {bills.map((bill) => (
        <div
          key={bill.id}
          className={`flex justify-between items-center p-3 mb-2 ${
            bill.highlight ? 'bg-green-700' : 'bg-gray-700'
          } rounded-lg`}
        >
          {editingBill === bill.id ? (
            <div className="flex flex-col gap-2 w-full">
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleEditChange}
                className="p-2 border border-gray-600 bg-gray-800 text-white rounded"
              />
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleEditChange}
                className="p-2 border border-gray-600 bg-gray-800 text-white rounded"
              />
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleEditChange}
                className="p-2 border border-gray-600 bg-gray-800 text-white rounded"
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleEditChange}
                className="p-2 border border-gray-600 bg-gray-800 text-white rounded"
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={saveEdit}
                  className="px-3 py-1 bg-green-500 text-black rounded hover:bg-green-800"
                >
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="px-3 py-1 bg-purple-700 text-white rounded hover:bg-purple-900"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div>
                <h3 className="text-lg font-semibold text-gray-100">
                  {bill.description}
                </h3>
                <p className="text-sm text-gray-400">{bill.category}</p>
                <p className="text-sm text-gray-200">${bill.amount}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startEditing(bill)}
                  className="px-3 py-1 bg-yellow-300 text-black rounded hover:bg-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => dispatch(removeBill(bill.id))}
                  className="px-3 py-1 bg-red-700 text-black rounded hover:bg-red-500"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default BillList;


