import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";




export const createAssignment = createAsyncThunk("createAssignment", async (data, { rejectWithValue }) => {
	try {
		//  convert the data into  new  FormData object as file is getting handled here.
		const required_data = new FormData();
		Object.entries(data).forEach(([key, value]) => {
			required_data.append(key, value);
		});
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/assignments`, {
			method: "POST",
			credentials: "include",
			body: required_data
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

export const deleteAssignment = createAsyncThunk("deleteAssignment", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/assignments/${data.assignment_id}?notes=${data.notes}`, {
			method: "DELETE",
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

export const getAssignmentsByBAtch = createAsyncThunk("getAssignmentsByBAtch", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/assignments?batch=${data?.batch_id}`, {
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
	assignments: null,
	batchAssignments: null
}
export const assignmentSlice = createSlice(
	{
		name: "assignment",
		initialState,
		extraReducers: (builder) => {

			builder.addCase(createAssignment.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(createAssignment.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
				})
				.addCase(createAssignment.rejected, (state, action) => {
					state.isLoading = false;
					state.isError = true;
				})


			builder.addCase(deleteAssignment.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(deleteAssignment.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
				})
				.addCase(deleteAssignment.rejected, (state, action) => {
					state.isLoading = false;
					state.isError = true;
				})


			builder.addCase(getAssignmentsByBAtch.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(getAssignmentsByBAtch.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.batchAssignments = action.payload.data;

				})
				.addCase(getAssignmentsByBAtch.rejected, (state, action) => {
					state.isLoading = false;
					state.isError = true;
				})
		}
	}
)

export default assignmentSlice.reducer; 