import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as attendanceAPI from '../../services/attendanceAPI';

// Async thunks for API calls

export const checkIn = createAsyncThunk(
  'attendance/checkIn',
  async (_, { rejectWithValue }) => {
    try {
      const response = await attendanceAPI.checkIn();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to check in');
    }
  }
);

export const checkOut = createAsyncThunk(
  'attendance/checkOut',
  async (attendanceId, { rejectWithValue }) => {
    try {
      const response = await attendanceAPI.checkOut(attendanceId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to check out');
    }
  }
);

export const fetchMyHistory = createAsyncThunk(
  'attendance/fetchMyHistory',
  async (params, { rejectWithValue }) => {
    try {
      const response = await attendanceAPI.getMyHistory(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch history');
    }
  }
);

export const fetchMySummary = createAsyncThunk(
  'attendance/fetchMySummary',
  async ({ month, year }, { rejectWithValue }) => {
    try {
      const response = await attendanceAPI.getMySummary(month, year);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch summary');
    }
  }
);

export const fetchTodayStatus = createAsyncThunk(
  'attendance/fetchTodayStatus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await attendanceAPI.getTodayStatus();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch today status');
    }
  }
);

// Manager thunks
export const fetchAllAttendance = createAsyncThunk(
  'attendance/fetchAllAttendance',
  async (params, { rejectWithValue }) => {
    try {
      const response = await attendanceAPI.getAllAttendance(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch attendance');
    }
  }
);

export const fetchTeamSummary = createAsyncThunk(
  'attendance/fetchTeamSummary',
  async (params, { rejectWithValue }) => {
    try {
      const response = await attendanceAPI.getTeamSummary(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch team summary');
    }
  }
);

const initialState = {
  attendanceRecords: [],
  todayAttendance: null,
  monthlySummary: null,
  allAttendance: [],
  teamSummary: null,
  loading: false,
  error: null,
};

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetAttendance: (state) => {
      state.attendanceRecords = [];
      state.todayAttendance = null;
      state.monthlySummary = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Check in
      .addCase(checkIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkIn.fulfilled, (state, action) => {
        state.loading = false;
        state.todayAttendance = action.payload;
      })
      .addCase(checkIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Check out
      .addCase(checkOut.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkOut.fulfilled, (state, action) => {
        state.loading = false;
        state.todayAttendance = action.payload;
      })
      .addCase(checkOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch my history
      .addCase(fetchMyHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.attendanceRecords = action.payload;
      })
      .addCase(fetchMyHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch my summary
      .addCase(fetchMySummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMySummary.fulfilled, (state, action) => {
        state.loading = false;
        state.monthlySummary = action.payload;
      })
      .addCase(fetchMySummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch today status
      .addCase(fetchTodayStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodayStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.todayAttendance = action.payload;
      })
      .addCase(fetchTodayStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch all attendance (manager)
      .addCase(fetchAllAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.allAttendance = action.payload;
      })
      .addCase(fetchAllAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch team summary (manager)
      .addCase(fetchTeamSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeamSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.teamSummary = action.payload;
      })
      .addCase(fetchTeamSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, resetAttendance } = attendanceSlice.actions;
export default attendanceSlice.reducer;

