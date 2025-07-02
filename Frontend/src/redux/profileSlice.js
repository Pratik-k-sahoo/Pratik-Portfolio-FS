import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
	name: "profile",
	initialState: {
		loading: false,
		profile: null,
	},
	reducers: {
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		setProfile: (state, action) => {
			state.profile = action.payload;
		},
	},
});

export const { setLoading, setProfile } = profileSlice.actions;
export default profileSlice.reducer;
