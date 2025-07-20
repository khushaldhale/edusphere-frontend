import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const createEnquiry = createAsyncThunk("createEnquiry", async (data, { rejectWithValue }) => {
	try {
		const address = {
			house_number: data.house_number,
			area: data.area,
			city: data.city,
			pincode: data.pincode
		}
		data.address = address;
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/enquiries`, {
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

export const getEnquiries = createAsyncThunk("getEnquiries", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/enquiries?status=${data.status}`, {
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

export const markAsProcessed = createAsyncThunk("markAsProcessed", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/enquiries/processed/${data.enquiry_id}`, {
			method: "PUT",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			}
		})
		if (!response.ok) {
			return rejectWithValue(await response.json());
		}

		return await response.json();
	} catch (error) {
		return rejectWithValue(error)
	}
})

export const updateEnquiry = createAsyncThunk("updateEnquiry", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/enquiries/${data.enquiry_id}`, {
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

export const changeEnquiryStatus = createAsyncThunk("changeEnquiryStatus", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/enquiries/${data.enquiry_id}/status/change?status=${data.status}`, {
			method: "PUT",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
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
	enquiries: []
}
export const enquirySlice = createSlice({
	name: "enquiry",
	initialState,
	reducers: {
		new_enquiry: (state, action) => {
			state.enquiries = [...state.enquiries, action.payload];
		},
		//  remove enquiries if the status is new.
		remove_enquiry: (state, action) => {

			const is_action = state.enquiries.some((element) => {
				if (element.status === "new") {
					return true;
				}
			})

			if (is_action) {
				// enquiry gets removed.
				state.enquiries = state.enquiries.filter((element) => {
					if (element._id !== action.payload._id) {
						return true;
					}
				})
			}
		}
	},
	extraReducers: (builder) => {

		builder.addCase(createEnquiry.pending, (state) => {
			state.isLoading = true;
			state.isError = false;
		})
			.addCase(createEnquiry.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.enquiries = [...state.enquiries, action.payload.data];
			})
			.addCase(createEnquiry.rejected, (state, action) => {
				state.isError = true;
				state.isLoading = false;
			})


		builder.addCase(getEnquiries.pending, (state) => {
			state.isLoading = true;
			state.isError = false;
		})
			.addCase(getEnquiries.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.enquiries = action.payload.data;
			})
			.addCase(getEnquiries.rejected, (state, action) => {
				state.isError = true;
				state.isLoading = false;
			})



		builder.addCase(markAsProcessed.pending, (state) => {
			state.isLoading = true;
			state.isError = false;
		})
			.addCase(markAsProcessed.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
			})
			.addCase(markAsProcessed.rejected, (state, action) => {
				state.isError = true;
				state.isLoading = false;
			})


		builder.addCase(updateEnquiry.pending, (state) => {
			state.isLoading = true;
			state.isError = false;
		})
			.addCase(updateEnquiry.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.enquiries = state.enquiries.map((element) => {
					if (element._id === action.payload.data._id) {
						return action.payload.data;
					} else {
						return element;
					}
				})
			})
			.addCase(updateEnquiry.rejected, (state, action) => {
				state.isError = true;
				state.isLoading = false;
			})


		builder.addCase(changeEnquiryStatus.pending, (state) => {
			state.isLoading = true;
			state.isError = false;
		})
			.addCase(changeEnquiryStatus.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				//  we will do operation later here.
			})
			.addCase(changeEnquiryStatus.rejected, (state, action) => {
				state.isError = true;
				state.isLoading = false;
			})
	}
})

export const { new_enquiry, remove_enquiry } = enquirySlice.actions;

export default enquirySlice.reducer;