import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		loading: false,
		user: null,
		users: null,
	},
	reducers: {
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		login: (state, action) => {
			state.user = action.payload;
		},
		logout: (state) => {
			state.user = null;
		},
		updateUser: (state, action) => {
			state.user = action.payload;
		},
		setFetchUsers: (state, action) => {
			state.users = action.payload;
		},
	},
});

export const { setLoading, login, logout, updateUser, setFetchUsers } =
	authSlice.actions;
export default authSlice.reducer;
