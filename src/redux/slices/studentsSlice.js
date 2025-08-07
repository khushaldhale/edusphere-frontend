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

export const getStudent = createAsyncThunk("getStudent", async (data, { rejectWithValue }) => {
	try {
		// if student_id is not provided then it will be "undefined"  there.
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/students/student?student=${data?.student_id}`, {
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

export const getPerformance = createAsyncThunk("getPerformance", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/students/student/dashboard?student=${data?.student_id}`, {
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

//  get enquiries for suggetsions
export const searchEnquiriesByName = createAsyncThunk("searchEnquiriesByName ", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/students/search?name=${data.name}`, {
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

//  enquiries  that u got  after hiting the search button.
export const hardSearchEnquiries = createAsyncThunk("hardSearchEnquiries ", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/students/search?name=${data.name}&hard=true`, {
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

export const getStudentById = createAsyncThunk("getStudentById", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/students/${data.student_id}`, {
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
	performance: null,
	student_suggestions: [],
	student_by_id: null,
	hard_enquiries: null
}

export const studentSlice = createSlice(
	{
		name: "student",
		initialState,
		reducers: {
			clearSuggestions: (state) => {
				state.student_suggestions = [];
			},
			clearStudent: (state) => {
				state.student_by_id = null;
			},
			clearHardEnquiries: (state) => {
				state.hard_enquiries = null;
			},
			clearStudents: (state) => {
				state.students = []
			}
		},

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


			builder.addCase(getStudentById.pending, (state) => {
				state.isError = false;
				state.isLoading = true;
			})
				.addCase(getStudentById.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.student_by_id = action.payload.data;
				})
				.addCase(getStudentById.rejected, (state) => {
					state.isLoading = false;
					state.isError = true
				})


			builder.addCase(searchEnquiriesByName.pending, (state) => {
				state.isError = false;
				state.isLoading = true;
			})
				.addCase(searchEnquiriesByName.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.student_suggestions = action.payload.data;
				})
				.addCase(searchEnquiriesByName.rejected, (state) => {
					state.isLoading = false;
					state.isError = true
				})


			builder.addCase(hardSearchEnquiries.pending, (state) => {
				state.isError = false;
				state.isLoading = true;
			})
				.addCase(hardSearchEnquiries.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.hard_enquiries = action.payload.data;
				})
				.addCase(hardSearchEnquiries.rejected, (state) => {
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

export const { clearSuggestions, clearStudent, clearHardEnquiries, clearStudents } = studentSlice.actions;

export default studentSlice.reducer; 