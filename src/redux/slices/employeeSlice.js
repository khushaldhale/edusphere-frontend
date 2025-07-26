import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const createEmployee = createAsyncThunk("createEmployee", async (data, { rejectWithValue }) => {
	try {

		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/employees`, {
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
		return rejectWithValue(error);
	}
})

export const getEmployees = createAsyncThunk("getEmployees", async (_, { rejectWithValue }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/employees`, {
			method: "GET",
			credentials: "include",
		})

		if (!response.ok) {
			return rejectWithValue(await response.json())
		}

		return await response.json();

	} catch (error) {
		return rejectWithValue(error);
	}
})

export const deleteEmployee = createAsyncThunk("deleteEmployee", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/employees/${data.employee_id}`, {
			method: "DELETE",
			credentials: "include",
		})

		if (!response.ok) {
			return rejectWithValue(await response.json())
		}

		return await response.json();

	} catch (error) {
		return rejectWithValue(error);
	}
})

export const updateEmployee = createAsyncThunk("updateEmployee", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/employees/${data.employee_id}`, {
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
		return rejectWithValue(error);
	}
})

const initialState = {
	isLoading: null,
	isError: null,
	employees: []
}
export const employeeSlice = createSlice(
	{
		name: "employee",
		initialState,
		extraReducers: (builder) => {

			builder.addCase(createEmployee.pending, (state) => {
				state.isError = false;
				state.isLoading = true;
			})
				.addCase(createEmployee.fulfilled, (state, action) => {
					state.isError = false;
					state.isLoading = false;
					state.employees = [...state.employees, action.payload.data]
				})
				.addCase(createEmployee.rejected, (state, action) => {
					state.isError = true;
					state.isLoading = false;
				})



			builder.addCase(getEmployees.pending, (state) => {
				state.isError = false;
				state.isLoading = true;
			})
				.addCase(getEmployees.fulfilled, (state, action) => {
					state.isError = false;
					state.isLoading = false;
					state.employees = action.payload.data;
				})
				.addCase(getEmployees.rejected, (state, action) => {
					state.isError = true;
					state.isLoading = false;
				})


			builder.addCase(deleteEmployee.pending, (state) => {
				state.isError = false;
				state.isLoading = true;
			})
				.addCase(deleteEmployee.fulfilled, (state, action) => {
					state.isError = false;
					state.isLoading = false;
					state.employees = state.employees.filter((employee) => {
						if (employee._id !== action.payload.data._id) {
							return true;
						}
					})
				})
				.addCase(deleteEmployee.rejected, (state, action) => {
					state.isError = true;
					state.isLoading = false;
				})




			builder.addCase(updateEmployee.pending, (state) => {
				state.isError = false;
				state.isLoading = true;
			})
				.addCase(updateEmployee.fulfilled, (state, action) => {
					state.isError = false;
					state.isLoading = false;
					state.employees = state.employees.map((employee) => {
						if (employee._id === action.payload.data._id) {
							return action.payload.data;
						} else {
							return employee
						}
					})
				})
				.addCase(updateEmployee.rejected, (state, action) => {
					state.isError = true;
					state.isLoading = false;
				})

		}
	}
)
export default employeeSlice.reducer;