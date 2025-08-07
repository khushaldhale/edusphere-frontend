import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";




export const createExamAttempt = createAsyncThunk("createExamAttempt", async (data, { rejectWithValue }) => {
	try {

		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/exam-attempt`, {
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

export const submitExam = createAsyncThunk("submitExam", async (data, { rejectWithValue }) => {
	try {

		console.log("data here : ", data)
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/exam-attempt/submit?attempt=${data.exam_attempt_id}`, {
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
	}
	catch (error) {
		return rejectWithValue(error)
	}
})

export const getExamAttempted = createAsyncThunk("getExamAttempted", async (data, { rejectWithValue }) => {
	try {

		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/exam-attempt?exam=${data.exam_id}`, {
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

// exam results for particular students.
export const examResults = createAsyncThunk("examResults", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/exam-attempt/result?student=${data?.student_id}`, {
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
	exam_attempted: {},
	exam_results: []

}

export const examAttempSlice = createSlice(
	{
		name: "exam_attempt",
		initialState,
		extraReducers: (builder) => {
			builder.addCase(createExamAttempt.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(createExamAttempt.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
				})
				.addCase(createExamAttempt.rejected, (state) => {
					state.isLoading = false;
					state.isError = true;
				})


			builder.addCase(submitExam.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(submitExam.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
				})
				.addCase(submitExam.rejected, (state) => {
					state.isLoading = false;
					state.isError = true;
				})


			builder.addCase(getExamAttempted.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(getExamAttempted.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.exam_attempted = action.payload.data;
				})
				.addCase(getExamAttempted.rejected, (state) => {
					state.isLoading = false;
					state.isError = true;
				})



			builder.addCase(examResults.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(examResults.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.exam_results = action.payload.data;
				})
				.addCase(examResults.rejected, (state) => {
					state.isLoading = false;
					state.isError = true;
				})
		}
	}
)

export default examAttempSlice.reducer; 