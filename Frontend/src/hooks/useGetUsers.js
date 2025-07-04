import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setFetchUsers } from "../redux/authSlice";

const useGetUsers = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const token = localStorage.getItem("token");
				const res = await axios.get(
					`${import.meta.env.VITE_SERVER_URL}/v1/user/users`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				if (res.status === 200) {
					dispatch(setFetchUsers(res.data.users));
				} else {
					console.error(res.data.error);
				}
			} catch (err) {
				console.error("Error fetching users", err);
			}
		};
		fetchUsers();
	}, [dispatch]);
};

export default useGetUsers;
