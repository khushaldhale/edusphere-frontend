import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const markAttendance = createAsyncThunk("markAttendance", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/attendance`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": 'application/json'
			},
			body: JSON.stringify(data)
		})
		if (!response.ok) {
			const errorData = await response.json();
			return rejectWithValue(errorData)
		}
		return await response.json();
	} catch (error) {
		return rejectWithValue(error)
	}
})

export const getAttendance = createAsyncThunk("getAttendance", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/attendance?year=${data.year}&month=${data.month}`, {
			method: "GET",
			credentials: "include",
		})
		if (!response.ok) {
			const errorData = await response.json();
			return rejectWithValue(errorData)
		}
		return await response.json();
	} catch (error) {
		return rejectWithValue(error)
	}
})

const initialState = {
	isLoading: null,
	isError: null,
	attendance: []
}

export const attendanceSlice = createSlice(
	{
		name: "attendance",
		initialState,
		extraReducers: (builder) => {
			builder.addCase(markAttendance.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(markAttendance.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
				})
				.addCase(markAttendance.rejected, (state, action) => {
					state.isLoading = false;
					state.isError = true;
				})


			builder.addCase(getAttendance.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(getAttendance.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.attendance = action.payload.data
				})
				.addCase(getAttendance.rejected, (state, action) => {
					state.isLoading = false;
					state.isError = true;
				})
		}
	}
)
export default attendanceSlice.reducer; 