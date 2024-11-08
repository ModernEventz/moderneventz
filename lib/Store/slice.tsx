// store.js
import { createSlice} from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  totalVendors: 0,
  totalTasks: 0,
  totalBudget: 0,
};

// Define a slice for the tasks and budget
export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setVendors: (state,action ) => {
      state.totalVendors += 1;
    },
    setTotalTasks: (state, action ) => {
      state.totalTasks = action.payload;
    },
    setTotalBudget: (state, action) => {
      state.totalBudget = action.payload;
    },
  },
});


// Export actions
export const { setVendors, setTotalTasks, setTotalBudget } = dataSlice.actions;

export default dataSlice.reducer

