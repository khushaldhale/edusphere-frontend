import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const submitAnswer = createAsyncThunk("submitAnswer", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/answers`, {
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
		return rejectWithValue(error)
	}
})

const initialState = {
	isLoading: null,
	isError: null,
}

export const answerSlice = createSlice(
	{
		name: "answer",
		initialState,
		extraReducers: (builder) => {
			builder.addCase(submitAnswer.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(submitAnswer.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
				})
				.addCase(submitAnswer.rejected, (state, action) => {
					state.isError = true;
					state.isLoading = false;
				})
		}
	}
)
export default answerSlice.reducer;