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

const initialState = {
	isLoading: null,
	isError: null,

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
		}
	}
)

export default MockResultSlice.reducer; 