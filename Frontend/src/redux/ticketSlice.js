import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	tickets: null,
};

export const ticketSlice = createSlice({
	name: "ticket",
	initialState,
	reducers: {
		setFetchTickets: (state, action) => {
			state.tickets = action.payload;
		},
		logoutTickets: (state) => {
			state.tickets = null;
		},
	},
});

export const { setFetchTickets, logoutTickets } = ticketSlice.actions;

export default ticketSlice.reducer;
