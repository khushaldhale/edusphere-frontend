import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const createMock = createAsyncThunk("createMock", async (data, { rejectWithValue }) => {
	try {

		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/mocks`, {
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
	} catch (error) {
		return rejectWithValue(error)
	}
})

export const deleteMock = createAsyncThunk("deleteMock", async (data, { rejectWithValue }) => {
	try {

		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/mocks/${data.mock_id}`, {
			method: "DELETE",
			credentials: "include",
		})
		if (!response.ok) {
			return rejectWithValue(await response.json());
		}
		return await response.json();
	} catch (error) {
		return rejectWithValue(error)
	}
})

export const updateMock = createAsyncThunk("updateMock", async (data, { rejectWithValue }) => {
	try {

		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/mocks/${data.mock_id}`, {
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
	} catch (error) {
		return rejectWithValue(error)
	}
})

export const getMocks = createAsyncThunk("getMocks", async (data, { rejectWithValue }) => {
	try {

		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/mocks?batch=${data.batch_id}`, {
			method: "GET",
			credentials: "include",
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
	mocks: []
}
export const mockSlice = createSlice(
	{
		name: "mock",
		initialState,
		reducers: {
			clear_mock: (state) => {
				state.mocks = []
			}
		},
		extraReducers: (builder) => {

			builder.addCase(createMock.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(createMock.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.mocks = [...state.mocks, action.payload.data];
				})
				.addCase(createMock.rejected, (state, action) => {
					state.isLoading = false;
					state.isError = true;
				})


			builder.addCase(getMocks.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(getMocks.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.mocks = action.payload.data;
				})
				.addCase(getMocks.rejected, (state, action) => {
					state.isLoading = false;
					state.isError = true;
				})



			builder.addCase(deleteMock.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(deleteMock.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.mocks = state.mocks.filter((mock) => {
						if (mock._id !== action.payload.data._id) {
							return true;
						}
					})
				})
				.addCase(deleteMock.rejected, (state, action) => {
					state.isLoading = false;
					state.isError = true;
				})



			builder.addCase(updateMock.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(updateMock.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.mocks = state.mocks.map((mock) => {
						if (mock._id === action.payload.data._id) {
							return action.payload.data;
						} else {
							return mock;
						}
					})
				})
				.addCase(updateMock.rejected, (state, action) => {
					state.isLoading = false;
					state.isError = true;
				})
		}
	}
)

export const { clear_mock } = mockSlice.actions
export default mockSlice.reducer; 	