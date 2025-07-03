import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import axios from "axios";
import Home from "./page/Home";
import Project from "./page/Project";
import About from "./page/About";
import Contact from "./page/Contact";
import Register from "./page/Register";
import Login from "./page/Login";
import AdminLogin from "./admin/pages/AdminLogin";
import AuthProtectedRoutes from "./components/AuthProtectRoutes";
import Connect from "./page/Connect";
import ProtectedRoutes from "./components/ProtectedRoutes";
import useGetProfile from "./hooks/useGetProfile";
import useGetProjects from "./hooks/useGetProjects";
import UpdateProfile from "./page/UpdateProfile";
import CheckAuth from "./components/Check-Auth";
import Tickets from "./page/Tickets";
import TicketDetailsPage from "./page/TicketDetails";
import Admin from "./page/Admin";

const appRouter = createBrowserRouter([
	{
		path: "/",
		element: <Outlet />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "project",
				element: (
					<AuthProtectedRoutes>
						<Project />
					</AuthProtectedRoutes>
				),
			},
			{
				path: "about-me",
				element: <About />,
			},
			{
				path: "contact-me",
				element: (
					<AuthProtectedRoutes>
						<Contact />
					</AuthProtectedRoutes>
				),
			},
			{
				path: "connect-me",
				element: (
					<AuthProtectedRoutes>
						<Connect />
					</AuthProtectedRoutes>
				),
			},
			{
				path: "raise-ticket",
				element: <Outlet />,
				children: [
					{
						index: true,
						element: (
							<CheckAuth isProtected={true}>
								<Tickets />
							</CheckAuth>
						),
					},
				],
			},
			{
				path: "raise-ticket/:id",
				element: (
					<CheckAuth isProtected={true}>
						<TicketDetailsPage />
					</CheckAuth>
				),
			},
			{
				path: "register",
				element: <Register />,
			},
			{
				path: "login",
				element: <Login />,
			},
			{
				path: "admin/login",
				element: <AdminLogin />,
			},
			{
				path: "admin",
				element: (
					<ProtectedRoutes>
						<Outlet />
					</ProtectedRoutes>
				),
				children: [
					{
						index: true,
						element: (
							<CheckAuth isProtected={true}>
								<Admin />
							</CheckAuth>
						),
					},
					{
						path: "update-profile",
						element: <UpdateProfile />,
					},
				],
			},
		],
	},
]);

function App() {
	useGetProfile();
	useGetProjects();
	return (
		<>
			<RouterProvider router={appRouter} />
		</>
	);
}

export default App;
