import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

export const fetchSuggestion =
  createAsyncThunk('suggestion/fetchSuggestion', async (_, { rejectedWithValue }) => {
      /* Task 15: Complete the `createAsyncThunk()` function to load a suggestion from this URL: http://localhost:3004/api/suggestion */
    const baseUrl = 'http://localhost:3004/api/suggestion';
    const response = await fetch(baseUrl);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
    }
  );

const initialState = {
  suggestion: '',
  loading: false,
  error: true,
};

const options = {
  name: 'suggestion',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* Task 16: Inside `extraReducers`, add reducers to handle all three promise lifecycle states - pending, fulfilled, and rejected - for the `fetchSuggestion()` call */
    builder
        .addCase(fetchSuggestion.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
     builder
       .addCase(fetchSuggestion.fulfilled, (state, action) => {
           state.loading = false;
           state.suggestion = action.payload;
       })
      builder
        .addCase(fetchSuggestion.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
  },
};

const suggestionSlice = createSlice(options);

export default suggestionSlice.reducer;

// Task 17: Create a selector, called `selectSuggestion`, for the `suggestion` state variable and export it from the file
export const selectSuggestion = (state) => state.suggestion.suggestion;

export const selectLoading = (state) => state.suggestion.loading;
export const selectError = (state) => state.suggestion.error;
