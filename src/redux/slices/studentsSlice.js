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

export const studentsViaBatch = createAsyncThunk("studentsViaBatch", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/students?batch=${data.batch_id}`, {
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

export const getStudent = createAsyncThunk("getStudent", async (_, { rejectWithValue }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/students/student`, {
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


export const getPerformance = createAsyncThunk("getPerformance", async (_, { rejectWithValue }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/students/student/dashboard`, {
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
	students_no_batch: [],
	students: [],
	student: null,
	performance: null
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
					state.students_no_batch = action.payload.data;

				})
				.addCase(notBatchStudents.rejected, (state) => {
					state.isLoading = false;
					state.isError = true
				})



			builder.addCase(studentsViaBatch.pending, (state) => {
				state.isError = false;
				state.isLoading = true;
			})
				.addCase(studentsViaBatch.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.students = action.payload.data;
				})
				.addCase(studentsViaBatch.rejected, (state) => {
					state.isLoading = false;
					state.isError = true
				})


			builder.addCase(getStudent.pending, (state) => {
				state.isError = false;
				state.isLoading = true;
			})
				.addCase(getStudent.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.student = action.payload.data;
				})
				.addCase(getStudent.rejected, (state) => {
					state.isLoading = false;
					state.isError = true
				})


			builder.addCase(getPerformance.pending, (state) => {
				state.isError = false;
				state.isLoading = true;
			})
				.addCase(getPerformance.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.performance = action.payload.data;
				})
				.addCase(getPerformance.rejected, (state) => {
					state.isLoading = false;
					state.isError = true
				})
		}
	}
)

export default studentSlice.reducer; 