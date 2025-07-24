import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createQuestion = createAsyncThunk("createQuestion", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/questions`, {
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

export const deleteQuestion = createAsyncThunk("deleteQuestion", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/questions/${data.question_id}`, {
			method: "DELETE",
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

export const updateQuestion = createAsyncThunk("updateQuestion", async (data, { rejectWithValue }) => {
	try {
		console.log("data : ", data)
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/questions/${data.question_id}`, {
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

export const getQuestions = createAsyncThunk("getQuestions", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/questions?exam=${data.exam_id}`, {
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
	questions: []
}

export const questionSlice = createSlice(
	{
		name: "question",
		initialState,
		extraReducers: (builder) => {

			builder.addCase(createQuestion.pending, (state, action) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(createQuestion.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.questions = [...state.questions, action.payload.data]
				})
				.addCase(createQuestion.rejected, (state, action) => {
					state.isLoading = false;
					state.isError = true;
				})


			builder.addCase(deleteQuestion.pending, (state, action) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(deleteQuestion.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.questions = state.questions.filter((question) => {
						if (question._id !== action.payload.data._id) {
							return true;
						}
					})
				})
				.addCase(deleteQuestion.rejected, (state, action) => {
					state.isLoading = false;
					state.isError = true;
				})



			builder.addCase(updateQuestion.pending, (state, action) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(updateQuestion.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.questions = state.questions.map((question) => {
						if (question._id === action.payload.data._id) {
							return action.payload.data;
						} else {
							return question;
						}
					})
				})
				.addCase(updateQuestion.rejected, (state, action) => {
					state.isLoading = false;
					state.isError = true;
				})



			builder.addCase(getQuestions.pending, (state, action) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(getQuestions.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.questions = action.payload.data;
				})
				.addCase(getQuestions.rejected, (state, action) => {
					state.isLoading = false;
					state.isError = true;
				})


		}
	}
)
export default questionSlice.reducer; 