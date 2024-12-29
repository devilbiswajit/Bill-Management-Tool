import { createSlice } from '@reduxjs/toolkit';

const loadBillsFromLocalStorage = () => {
  const storedBills = localStorage.getItem('bills');
  return storedBills ? JSON.parse(storedBills) : [
    { id: 1, description: 'Dominoes', category: 'FoodNDining', amount: 430, date: '2020-02-01' },
    { id: 2, description: 'Car wash', category: 'Utility', amount: 500, date: '2020-06-01' },
  ];
};

const loadCategoriesFromLocalStorage = () => {
  const storedCategories = localStorage.getItem('categories');
  return storedCategories ? JSON.parse(storedCategories) : ['FoodNDining', 'Utility', 'Shopping', 'Education', 'Personal Care', 'Travel','Personal'];
};

const initialState = {
  bills: loadBillsFromLocalStorage(),
  categories: loadCategoriesFromLocalStorage(),
  filter: 'All',
  budget: 50000,
};

const billsSlice = createSlice({
  name: 'bills',
  initialState,
  reducers: {
    addBill: (state, action) => {
      state.bills.push(action.payload);
      if (!state.categories.includes(action.payload.category)) {
        state.categories.push(action.payload.category);
        localStorage.setItem('categories', JSON.stringify(state.categories));
      }
      localStorage.setItem('bills', JSON.stringify(state.bills));
    },
    editBill: (state, action) => {
      const index = state.bills.findIndex((bill) => bill.id === action.payload.id);
      if (index !== -1) state.bills[index] = action.payload;
      localStorage.setItem('bills', JSON.stringify(state.bills));
    },
    removeBill: (state, action) => {
      state.bills = state.bills.filter((bill) => bill.id !== action.payload);
      localStorage.setItem('bills', JSON.stringify(state.bills));
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    calculateMinBills: (state) => {
      const sortedBills = [...state.bills].sort((a, b) => a.amount - b.amount);
      let total = 0;
      let highlighted = [];
      sortedBills.forEach((bill) => {
        if (total + bill.amount <= state.budget) {
          total += bill.amount;
          highlighted.push(bill.id);
        }
      });
      state.bills.forEach((bill) => {
        bill.highlight = highlighted.includes(bill.id);
      });
      localStorage.setItem('bills', JSON.stringify(state.bills));
    },
    addCategory: (state, action) => {
      if (!state.categories.includes(action.payload)) {
        state.categories.push(action.payload);
        localStorage.setItem('categories', JSON.stringify(state.categories));
      }
    }
  },
});

export const { addBill, editBill, removeBill, setFilter, calculateMinBills, addCategory } = billsSlice.actions;
export default billsSlice.reducer;
