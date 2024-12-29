import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../features/bills/billsSlice';

const FilterDropdown = () => {
  const dispatch = useDispatch();
  const { filter, categories } = useSelector((state) => state.bills);

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2 text-gray-300">Filter by Category</label>
      <select
        value={filter}
        onChange={handleFilterChange}
        className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded"
      >
        <option value="All">All</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;


