import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBill, addCategory } from '../features/bills/billsSlice';

const AddBillForm = () => {
  const [formData, setFormData] = useState({
    description: '',
    category: '',
    amount: '',
    date: '',
  });
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.bills.categories);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBill = {
      id: Date.now(),
      ...formData,
      amount: Number(formData.amount),
    };
    dispatch(addBill(newBill));
    setFormData({ description: '', category: '', amount: '', date: '' });
  };

  const handleCategoryChange = (e) => {
    setFormData({ ...formData, category: e.target.value });
  };

  const handleCategoryBlur = () => {
    const { category } = formData;
    if (category && !categories.includes(category)) {
      dispatch(addCategory(category));
    }
  };

  const handleKeyPress = (e) => {
    const { category } = formData;
    if (e.key === 'Enter' && category && !categories.includes(category)) {
      dispatch(addCategory(category));
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(formData.category.toLowerCase())
  );

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-700 rounded-lg">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">Add a New Bill</h2>
      <div className="mb-4">
        <label className="block text-gray-300 text-sm">Description</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-600 bg-gray-800 text-white rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 text-sm">Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleCategoryChange}
          onBlur={handleCategoryBlur}
          onKeyDown={handleKeyPress}
          className="w-full p-2 border border-gray-600 bg-gray-800 text-white rounded"
        />
        {formData.category && (
          <ul className="mt-2 bg-gray-800 text-white p-2 rounded">
            {filteredCategories.map((category) => (
              <li
                key={category}
                onClick={() => setFormData({ ...formData, category })}
                className="cursor-pointer hover:bg-gray-700 p-1"
              >
                {category}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 text-sm">Amount</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full p-2 border border-gray-600 bg-gray-800 text-white rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 text-sm">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border border-gray-600 bg-gray-800 text-white rounded"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Bill
      </button>
    </form>
  );
};

export default AddBillForm;

