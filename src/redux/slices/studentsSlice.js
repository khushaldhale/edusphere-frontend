import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const notBatchStudents = createAsyncThunk("notBatchStudents", async (_, { rejectWithValue }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/students/no-batch/allocated`, {
			method: "GET",
			credentials: "include"
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
	students: []
}

export const studentSlice = createSlice(
	{
		name: "student",
		initialState,
		extraReducers: (builder) => {
			builder.addCase(notBatchStudents.pending, (state) => {
				state.isError = false;
				state.isLoading = true;
			})
				.addCase(notBatchStudents.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.students = action.payload.data;
					console.log(action.payload.data)
				})
				.addCase(notBatchStudents.rejected, (state) => {
					state.isLoading = false;
					state.isError = true
				})
		}
	}
)

export default studentSlice.reducer; 