import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const createMockResult = createAsyncThunk("createMockResult", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/mock/results`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
		if (!response.ok) {
			return rejectWithValue(await response.json());
		}
		return await response.json();
	} catch (error) {
		return rejectWithValue(error);
	}
})

export const mockExamresults = createAsyncThunk("mockExamresults", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/mock/results/all?student=${data.student_id}`, {
			method: "GET",
			credentials: "include",
		})
		if (!response.ok) {
			return rejectWithValue(await response.json());
		}
		return await response.json();
	} catch (error) {
		return rejectWithValue(error);
	}
})

// mock results for all students of specific mock
export const MockResultsAll = createAsyncThunk("MockResultsAll", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/mock/results?mock=${data.mock_id}`, {
			method: "GET",
			credentials: "include",
		})
		if (!response.ok) {
			return rejectWithValue(await response.json());
		}
		return await response.json();
	} catch (error) {
		return rejectWithValue(error);
	}
})

export const updateMockResult = createAsyncThunk("updateMockResult", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/mock/results/${data.mock_result_id}`, {
			method: "PUT",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
		if (!response.ok) {
			return rejectWithValue(await response.json());
		}
		return await response.json();
	} catch (error) {
		return rejectWithValue(error);
	}
})

export const particularMockResult = createAsyncThunk("particularMockResult", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/mock/results/self/?mock=${data.mock_id}&student=${data.student_id}`, {
			method: "GET",
			credentials: "include",
		})
		if (!response.ok) {
			return rejectWithValue(await response.json());
		}
		return await response.json();
	} catch (error) {
		return rejectWithValue(error);
	}
})

const initialState = {
	isLoading: null,
	isError: null,
	mock_results: [],
	particular_mock: null

}
export const MockResultSlice = createSlice(
	{
		name: "mockResult",
		initialState,
		extraReducers: (builder) => {
			builder.addCase(createMockResult.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(createMockResult.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
				})
				.addCase(createMockResult.rejected, (state) => {
					state.isLoading = false;
					state.isError = true;
				})


			builder.addCase(updateMockResult.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(updateMockResult.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
				})
				.addCase(updateMockResult.rejected, (state) => {
					state.isLoading = false;
					state.isError = true;
				})


			builder.addCase(mockExamresults.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(mockExamresults.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.mock_results = action.payload.data || [];
				})
				.addCase(mockExamresults.rejected, (state) => {
					state.isLoading = false;
					state.isError = true;
				})


			builder.addCase(particularMockResult.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(particularMockResult.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.particular_mock = action.payload.data || null;
				})
				.addCase(particularMockResult.rejected, (state) => {
					state.isLoading = false;
					state.isError = true;
				})


			builder.addCase(MockResultsAll.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(MockResultsAll.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.mock_results = action.payload.data || [];
				})
				.addCase(MockResultsAll.rejected, (state) => {
					state.isLoading = false;
					state.isError = true;
				})
		}
	}
)

export default MockResultSlice.reducer; 