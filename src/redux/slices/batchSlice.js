import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";




export const createBatch = createAsyncThunk("createBatch", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/batches`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})

		if (!response.ok) {
			return rejectWithValue(await response.json())
		}
		return await response.json();
	}
	catch (error) {
		return rejectWithValue(error)
	}
})

const initialState = {
	isLoading: null,
	isError: null,
	batches: []
}

export const batchSlice = createSlice(
	{
		name: "batch",
		initialState,
		extraReducers: (builder) => {

			builder.addCase(createBatch.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			}).addCase(createBatch.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
			})
				.addCase(createBatch.rejected, (state, action) => {
					state.isLoading = false;
					state.isError = true;
				})
		}
	}
)

export default batchSlice.reducer; 