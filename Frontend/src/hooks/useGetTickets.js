import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setFetchTickets } from "../redux/ticketSlice";

const useGetTickets = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchTickets = async () => {
			try {
				const token = localStorage.getItem("token");
				const res = await axios.get(
					`${import.meta.env.VITE_SERVER_URL}/v1/tickets`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);

				dispatch(setFetchTickets(res.data.tickets));
			} catch (err) {
				console.error("Failed to fetch tickets:", err);
			}
		};

		fetchTickets();
	}, [dispatch]);
};

export default useGetTickets;
