import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const login = createAsyncThunk("login", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": 'application/json'
			},
			body: JSON.stringify(data)
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

export const logout = createAsyncThunk("logout", async (_, { rejectWithValue }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
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

export const studentLogin = createAsyncThunk("studentLogin", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/student/login`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": 'application/json'
			},
			body: JSON.stringify(data)
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
	userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : {},
	isLoggedIn: localStorage.getItem("isLoggedIn") ? localStorage.getItem("isLoggedIn") === "true" : false

}
export const authSlice = createSlice(
	{
		name: "auth",
		initialState,
		extraReducers: (builder) => {
			builder.addCase(login.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(login.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					localStorage.setItem("userInfo", JSON.stringify(action.payload.data));
					state.userInfo = action.payload.data;
					localStorage.setItem("isLoggedIn", true);
				})
				.addCase(login.rejected, (state, action) => {
					state.isLoading = false;
					state.isError = true;
				})



			builder.addCase(logout.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(logout.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					localStorage.removeItem("userInfo");
					localStorage.removeItem("isLoggedIn");
					state.userInfo = {}
					state.isLoggedIn = false;
				})
				.addCase(logout.rejected, (state, action) => {
					state.isLoading = false;
					state.isError = true;
				})


			builder.addCase(studentLogin.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(studentLogin.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					localStorage.setItem("userInfo", JSON.stringify(action.payload.data));
					state.userInfo = action.payload.data;
					localStorage.setItem("isLoggedIn", true);
				})
				.addCase(studentLogin.rejected, (state, action) => {
					state.isLoading = false;
					state.isError = true;
				})

		}
	}
)
export default authSlice.reducer; 