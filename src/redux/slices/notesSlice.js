import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";




export const createNotes = createAsyncThunk("createNotes", async (data, { rejectWithValue }) => {
	try {
		//  convert the data into  new  FormData object as file is getting handled here.
		const required_data = new FormData();
		Object.entries(data).forEach(([key, value]) => {
			required_data.append(key, value);
		});
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/notes`, {
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

export const deleteNotes = createAsyncThunk("deleteNotes", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/notes/${data.notes_id}?notes=${data.notes}`, {
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

export const getNotesByBatch = createAsyncThunk("getNotesByBatch", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/notes?batch=${data?.batch_id}`, {
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
	batchNotes: null
}
export const notesSlice = createSlice(
	{
		name: "notes",
		initialState,
		extraReducers: (builder) => {

			builder.addCase(createNotes.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(createNotes.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
				})
				.addCase(createNotes.rejected, (state, action) => {
					state.isLoading = false;
					state.isError = true;
				})


			builder.addCase(deleteNotes.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(deleteNotes.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
				})
				.addCase(deleteNotes.rejected, (state, action) => {
					state.isLoading = false;
					state.isError = true;
				})


			builder.addCase(getNotesByBatch.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(getNotesByBatch.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.batchNotes = action.payload.data;

				})
				.addCase(getNotesByBatch.rejected, (state, action) => {
					state.isLoading = false;
					state.isError = true;
				})
		}
	}
)

export default notesSlice.reducer; 