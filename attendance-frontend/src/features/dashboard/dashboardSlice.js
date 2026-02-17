import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as dashboardAPI from '../../services/dashboardAPI';

// Async thunks for API calls

export const fetchEmployeeDashboard = createAsyncThunk(
  'dashboard/fetchEmployeeDashboard',
  async (_, { rejectWithValue }) => {
    try {
      const response = await dashboardAPI.getEmployeeDashboard();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch dashboard');
    }
  }
);

export const fetchManagerDashboard = createAsyncThunk(
  'dashboard/fetchManagerDashboard',
  async (_, { rejectWithValue }) => {
    try {
      const response = await dashboardAPI.getManagerDashboard();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch dashboard');
    }
  }
);

export const fetchWeeklyTrends = createAsyncThunk(
  'dashboard/fetchWeeklyTrends',
  async (params, { rejectWithValue }) => {
    try {
      const response = await dashboardAPI.getWeeklyTrends(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch trends');
    }
  }
);

export const fetchDepartmentStats = createAsyncThunk(
  'dashboard/fetchDepartmentStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await dashboardAPI.getDepartmentStats();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch stats');
    }
  }
);

const initialState = {
  dashboardData: null,
  weeklyTrends: null,
  departmentStats: null,
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetDashboard: (state) => {
      state.dashboardData = null;
      state.weeklyTrends = null;
      state.departmentStats = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch employee dashboard
      .addCase(fetchEmployeeDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployeeDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardData = action.payload;
      })
      .addCase(fetchEmployeeDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch manager dashboard
      .addCase(fetchManagerDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchManagerDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardData = action.payload;
      })
      .addCase(fetchManagerDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch weekly trends
      .addCase(fetchWeeklyTrends.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeeklyTrends.fulfilled, (state, action) => {
        state.loading = false;
        state.weeklyTrends = action.payload;
      })
      .addCase(fetchWeeklyTrends.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch department stats
      .addCase(fetchDepartmentStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDepartmentStats.fulfilled, (state, action) => {
        state.loading = false;
        state.departmentStats = action.payload;
      })
      .addCase(fetchDepartmentStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, resetDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;

