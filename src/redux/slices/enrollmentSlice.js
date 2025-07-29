import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const createEnrollment = createAsyncThunk("createEnrollment", async (data, { rejectWithValue }) => {
	try {

		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/enrollments`, {
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
	}
	catch (error) {
		return rejectWithValue(error)
	}
})

export const particularEnrollment = createAsyncThunk("particularEnrollment", async (_, { rejectWithValue }) => {
	try {

		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/enrollments/student`, {
			method: "GET",
			credentials: "include",
		})

		if (!response.ok) {
			return rejectWithValue(await response.json());
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
	enrollment: null
}
export const enrollmentSlice = createSlice(
	{
		name: "enrollment",
		initialState,
		extraReducers: (builder) => {

			builder.addCase(createEnrollment.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(createEnrollment.fulfilled, (state, action) => {
					state.isError = false;
					state.isLoading = false;
					console.log("Enrollment done : ", action.payload.data)
				})
				.addCase(createEnrollment.rejected, (state) => {
					state.isError = true;
					state.isLoading = false;
				})


			builder.addCase(particularEnrollment.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(particularEnrollment.fulfilled, (state, action) => {
					state.isError = false;
					state.isLoading = false;
					state.enrollment = action.payload.data;
				})
				.addCase(particularEnrollment.rejected, (state) => {
					state.isError = true;
					state.isLoading = false;
				})
		}
	}
)
export default enrollmentSlice.reducer; 