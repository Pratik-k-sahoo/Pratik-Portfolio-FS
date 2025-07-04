import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGetTickets from "../hooks/useGetTickets";
import { useSelector } from "react-redux";
import axios from "axios";

const Tickets = () => {
	useGetTickets();

	const [form, setForm] = useState({ title: "", description: "" });
	const { tickets } = useSelector((state) => state.ticket);
	const [filterTicket, setFilterTicket] = useState([]);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const token = localStorage.getItem("token");

	useEffect(() => {
		setFilterTicket(tickets);
	}, [tickets]);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await axios.post(
				`${import.meta.env.VITE_SERVER_URL}/v1/tickets`,
				JSON.stringify(form),
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (res.status === 201) {
				setForm({ title: "", description: "" });
				setFilterTicket((prev) => [res.data.ticket, ...prev]);
				navigate("/raise-ticket");
			} else {
				alert(res.data.message || "Ticket creation failed");
			}
		} catch (err) {
			alert("Error creating ticket");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="py-16 pt-20 lg:py-24 lg:pt-20 sm:pt-40 md:pt-32">
			<div className="container">
				<h2 className="text-2xl font-bold mb-4">Create Ticket</h2>

				<form onSubmit={handleSubmit} className="space-y-3 mb-8">
					<input
						name="title"
						value={form.title}
						onChange={handleChange}
						placeholder="Ticket Title"
						className="input input-bordered w-full"
						required
					/>
					<textarea
						name="description"
						value={form.description}
						onChange={handleChange}
						placeholder="Ticket Description"
						className="textarea textarea-bordered w-full"
						required
					></textarea>
					<button className="btn btn-primary" type="submit" disabled={loading}>
						{loading ? "Submitting..." : "Submit Ticket"}
					</button>
				</form>

				<h2 className="text-xl font-semibold mb-2">All Tickets</h2>
				<div className="space-y-3">
					{filterTicket?.map((ticket) => (
						<Link
							key={ticket._id}
							className="card shadow-md p-4 bg-gray-800"
							to={`/raise-ticket/${ticket._id}`}
						>
							<h3 className="font-bold text-lg">{ticket.title}</h3>
							<p className="text-sm">{ticket.description}</p>
							<p className="text-sm text-gray-500">
								Created At: {new Date(ticket.createdAt).toLocaleString()}
							</p>
						</Link>
					))}
					{tickets?.length === 0 && <p>No tickets submitted yet.</p>}
				</div>
			</div>
		</div>
	);
};

export default Tickets;
