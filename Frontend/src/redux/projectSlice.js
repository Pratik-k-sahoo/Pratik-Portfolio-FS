import { createSlice } from "@reduxjs/toolkit";
const projectSlice = createSlice({
	name: "project",
	initialState: {
		loading: false,
		project: [],
	},
	reducers: {
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		setProject: (state, action) => {
			state.project = action.payload;
		},
	},
});

export const { setLoading, setProject } = projectSlice.actions;
export default projectSlice.reducer;
