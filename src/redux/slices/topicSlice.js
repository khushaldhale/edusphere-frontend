import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const createTopic = createAsyncThunk("createTopic", async (data, { rejectWithValue }) => {
	try {
		//  convert the data into  new  FormData object as file is getting handled here.
		const required_data = new FormData();
		Object.entries(data).forEach(([key, value]) => {
			required_data.append(key, value);
		});
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/topics`, {
			method: "POST",
			credentials: "include",
			body: required_data,
		});
		if (!response.ok) {
			return rejectWithValue(await response.json());
		}
		return await response.json();

	} catch (error) {
		return rejectWithValue(error)
	}
})

export const deleteTopic = createAsyncThunk("deleteTopic", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/topics/${data.topic_id}`, {
			method: "DELETE",
			credentials: "include",
		})
		if (!response.ok) {
			return rejectWithValue(await response.json())
		}
		return await response.json()
	} catch (error) {
		return rejectWithValue(error)
	}
})

export const updateTopic = createAsyncThunk("updateTopic", async (data, { rejectWithValue }) => {
	try {
		//  convert the data into  new  FormData object as file is getting handled here.
		const required_data = new FormData();
		Object.entries(data).forEach(([key, value]) => {
			required_data.append(key, value);
		});

		for (let [key, value] of required_data.entries()) {
			console.log(key, value);
		}

		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/topics/${data.topic_id}`, {
			method: "PUT",
			credentials: "include",
			body: required_data
		})
		if (!response.ok) {
			return rejectWithValue(await response.json())
		}
		return await response.json()
	} catch (error) {
		return rejectWithValue(error)
	}
})

export const getTopics = createAsyncThunk("getTopics", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/topics?subject_id=${data.subject_id}`, {
			method: "GET",
			credentials: "include",
		})
		if (!response.ok) {
			return rejectWithValue(await response.json())
		}
		return await response.json()
	} catch (error) {
		return rejectWithValue(error)
	}
})

const initialState = {
	isLoading: null,
	isError: null,
	// topics by sub 
	topics: []
}

export const topicSlice = createSlice({
	name: 'topic',
	initialState,
	reducers: {
		addTopics: (state, action) => {
			state.topics = action.payload;
		}
	},
	extraReducers: (builder) => {

		builder.addCase(getTopics.pending, (state) => {
			state.isLoading = true;
			state.isError = false
		})
			.addCase(getTopics.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.topics = action.payload.data;
			})
			.addCase(getTopics.rejected, (state, action) => {
				state.isError = true;
				state.isLoading = false;
			})


		builder.addCase(deleteTopic.pending, (state) => {
			state.isLoading = true;
			state.isError = false
		})
			.addCase(deleteTopic.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.topics = state.topics.filter((topic) => {
					if (topic._id !== action.payload.data._id) {
						return true;
					}
				})
			})
			.addCase(deleteTopic.rejected, (state, action) => {
				state.isError = true;
				state.isLoading = false;
			})



		builder.addCase(updateTopic.pending, (state) => {
			state.isLoading = true;
			state.isError = false
		})
			.addCase(updateTopic.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.topics = state.topics.map((topic) => {
					if (topic._id === action.payload.data._id) {
						return action.payload.data;
					} else {
						return topic;
					}
				})
			})
			.addCase(updateTopic.rejected, (state, action) => {
				state.isError = true;
				state.isLoading = false;
			})



		builder.addCase(createTopic.pending, (state) => {
			state.isLoading = true;
			state.isError = false
		})
			.addCase(createTopic.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.topics = [...state.topics, action.payload.data]
			})
			.addCase(createTopic.rejected, (state, action) => {
				state.isError = true;
				state.isLoading = false;
			})
	}
})

export const { addTopics } = topicSlice.actions;

export default topicSlice.reducer