import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const createCourse = createAsyncThunk("createCourse", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/courses`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})

		if (!response.ok) {
			const errorData = await response.json();
			return rejectWithValue(errorData)
		}
		return await response.json();
	} catch (error) {
		return rejectWithValue(error);
	}
})

export const getCourses = createAsyncThunk("getCourses", async (_, { rejectWithValue }) => {
	try {

		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/courses`, {
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

export const deleteCourse = createAsyncThunk("deleteCourse", async (data, { rejectWithValue }) => {
	try {

		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/courses/${data.course_id}`, {
			method: "DELETE",
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

export const updateCourse = createAsyncThunk("updateCourse", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/courses/${data.course_id}`, {
			method: "PUT",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})

		if (!response.ok) {
			const errorData = await response.json();
			return rejectWithValue(errorData)
		}
		return await response.json();
	} catch (error) {
		return rejectWithValue(error);
	}
})

export const getParticularCourse = createAsyncThunk("getParticularCourse", async (_, { rejectWithValue }) => {
	try {

		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/courses/course`, {
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

const initialState = {
	isLoading: null,
	isError: null,
	courses: [],
	particular_course: null
}
export const courseSlice = createSlice(
	{
		name: "course",
		initialState,
		extraReducers: (builder) => {
			builder.addCase(createCourse.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(createCourse.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.courses = [...state.courses, action.payload.data]
				})
				.addCase(createCourse.rejected, (state, action) => {
					state.isError = true;
					state.isLoading = false;
				})


			builder.addCase(getCourses.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(getCourses.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.courses = action.payload.data
				})
				.addCase(getCourses.rejected, (state, action) => {
					state.isError = true;
					state.isLoading = false;
				})


			builder.addCase(deleteCourse.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(deleteCourse.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.courses = state.courses.filter((course) => {
						if (course._id !== action.payload.data._id) {
							return true
						}
					})
				})
				.addCase(deleteCourse.rejected, (state, action) => {
					state.isError = true;
					state.isLoading = false;
				})


			builder.addCase(updateCourse.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(updateCourse.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.courses = state.courses.map((course) => {
						if (course._id === action.payload.data._id) {
							return action.payload.data
						} else {
							return course;
						}
					})
				})
				.addCase(updateCourse.rejected, (state, action) => {
					state.isError = true;
					state.isLoading = false;
				})



			builder.addCase(getParticularCourse.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(getParticularCourse.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.particular_course = action.payload.data
				})
				.addCase(getParticularCourse.rejected, (state, action) => {
					state.isError = true;
					state.isLoading = false;
				})
		}
	}

)

export default courseSlice.reducer