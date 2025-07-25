import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const createExam = createAsyncThunk("createExam", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/exams`, {
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

export const deleteExam = createAsyncThunk("deleteExam", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/exams/${data.exam_id}`, {
			method: "DELETE",
			credentials: "include",
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

export const updateExam = createAsyncThunk("updateExam", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/exams/${data.exam_id}`, {
			method: "PUT",
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

export const getExams = createAsyncThunk("getExams", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/exams?batch=${data.batch_id}`, {
			method: "GET",
			credentials: "include",
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
	exams: []
}
export const examSlice = createSlice(
	{
		name: "exam",
		initialState,
		reducers: {
			clear_exams: (state, action) => {
				state.exams = []
			}
		},
		extraReducers: (builder) => {


			builder.addCase(createExam.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(createExam.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;

				})
				.addCase(createExam.rejected, (state, action) => {
					state.isLoading = false;
					state.isError = true;
				})


			builder.addCase(deleteExam.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(deleteExam.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.exams = state.exams.filter((exam) => {
						if (exam._id !== action.payload.data._id) {
							return true;
						}
					})
				})
				.addCase(deleteExam.rejected, (state, action) => {
					state.isLoading = false;
					state.isError = true;
				})



			builder.addCase(updateExam.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(updateExam.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.exams = state.exams.map((exam) => {
						if (exam._id === action.payload.data._id) {
							return action.payload.data;
						} else {
							return exam;
						}
					})
				})
				.addCase(updateExam.rejected, (state, action) => {
					state.isLoading = false;
					state.isError = true;
				})



			builder.addCase(getExams.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(getExams.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.exams = action.payload.data;
				})
				.addCase(getExams.rejected, (state, action) => {
					state.isLoading = false;
					state.isError = true;
				})
		}

	}
)

export const { clear_exams } = examSlice.actions

export default examSlice.reducer; 