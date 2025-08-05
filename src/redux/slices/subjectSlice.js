import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getSubjects = createAsyncThunk("getSubjects", async (data, { rejectWithValue }) => {
	try {

		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/subjects?course_id=${data.course_id}`, {
			method: "GET",
			credentials: "include"
		})

		if (!response.ok) {
			return rejectWithValue(await response.json())
		}

		return await response.json();
	} catch (error) {
		return rejectWithValue(error)
	}
})

export const createSubject = createAsyncThunk("createSubject", async (data, { rejectWithValue }) => {
	try {

		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/subjects`, {
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
	} catch (error) {
		return rejectWithValue(error)
	}
})

export const deleteSubject = createAsyncThunk("deleteSubject", async (data, { rejectWithValue }) => {
	try {

		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/subjects/${data.subject_id}`, {
			method: "DELETE",
			credentials: "include",
		})

		if (!response.ok) {
			return rejectWithValue(await response.json())
		}

		return await response.json();
	} catch (error) {
		return rejectWithValue(error)
	}
})

export const updateSubject = createAsyncThunk("updateSubject", async (data, { rejectWithValue }) => {
	try {

		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/subjects/${data.subject_id}`, {
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
	} catch (error) {
		return rejectWithValue(error)
	}
})


const initialState = {
	isLoading: null,
	isError: null,
	// subjects via course id
	subjects: []
}

export const subjectSlice = createSlice(
	{
		name: "subject",
		initialState,
		reducers: {
			addSubjects: (state, action) => {
				console.log("action:, ", action.payload)
				state.subjects = action.payload;
			}
		},
		extraReducers: (builder) => {
			builder.addCase(createSubject.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(createSubject.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.subjects = [...state.subjects, action.payload.data]
				})
				.addCase(createSubject.rejected, (state) => {
					state.isError = true;
					state.isLoading = false;
				})



			builder.addCase(getSubjects.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(getSubjects.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.subjects = action.payload.data;
				})
				.addCase(getSubjects.rejected, (state) => {
					state.isError = true;
					state.isLoading = false;
				})



			builder.addCase(deleteSubject.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(deleteSubject.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.subjects = state.subjects.filter((subject) => {
						if (subject._id !== action.payload.data._id) {
							return true;
						}
					})
				})
				.addCase(deleteSubject.rejected, (state) => {
					state.isError = true;
					state.isLoading = false;
				})



			builder.addCase(updateSubject.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(updateSubject.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.subjects = state.subjects.map((subject) => {
						if (subject._id === action.payload.data._id) {
							return action.payload.data;
						} else {
							return subject;
						}
					})
				})
				.addCase(updateSubject.rejected, (state) => {
					state.isError = true;
					state.isLoading = false;
				})


		}
	}
)

export const { addSubjects } = subjectSlice.actions
export default subjectSlice.reducer; 