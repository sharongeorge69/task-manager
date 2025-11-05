import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Task from "./pages/Task";
import Users from "./pages/Users";
import Trash from "./pages/Trash";
import TaskDetails from "./pages/TaskDetails";
import Login from "./pages/Login";
import { Toaster } from "sonner";
import { useSelector } from "react-redux";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { useRef, Fragment } from "react";
import { useDispatch } from "react-redux";
import { setOpenSidebar } from "./redux/slices/authSlice";
import clsx from "clsx";
import { Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";


function Layout() {
	const { user } = useSelector((state) => state.auth);
	const location = useLocation();
	return user ? (
		<div className="w-full h-screen flex flex-col md:flex-row">
			<div className="w-1/5 h-screen bg-white sticky top-0 hidden md:block">
				<Sidebar />
			</div>
			<MobileSidebar/>
			<div className="flex-1 overflow-y-auto">
				<Navbar />
				<div className="p-4 2xl:px-10">
					<Outlet />
				</div>
			</div>
		</div>
	) : (
		// Redirect to the login page if the user is not authenticated
		<Navigate to="/log-in" state={{ from: location }} replace />
	);
}


const MobileSidebar = () => {
	const { isSidebarOpen } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const sidebarRef = useRef(null);

	const closeSidebar = () => {
		dispatch(setOpenSidebar(false));
	};

	return (
		<Transition show={!!isSidebarOpen}>
			{/* Backdrop */}
			<div
				className="fixed inset-0 z-50 md:hidden"
				onClick={closeSidebar}
			>
				{/* Animated Panel */}
				<Transition.Child
					enter="transition-transform duration-300 ease-out"
					enterFrom="-translate-x-full"
					enterTo="translate-x-0"
					leave="transition-transform duration-300 ease-in"
					leaveFrom="translate-x-0"
					leaveTo="-translate-x-full"
				>
					<div
						ref={sidebarRef}
						className="absolute left-0 top-0 h-full w-3/4 bg-white shadow-xl"
						onClick={(e) => e.stopPropagation()}
					>
						{/* Close Button */}
						<div className="flex justify-end p-4">
							<button
								onClick={closeSidebar}
								className="rounded-full p-2 hover:bg-gray-100 transition"
							>
								<IoClose size={24} className="text-gray-600" />
							</button>
						</div>

						{/* Sidebar Content */}
						<div className="px-4 -mt-6">
							<Sidebar />
						</div>
					</div>
				</Transition.Child>

				{/* Optional: Fade backdrop */}
				<Transition.Child
					enter="transition-opacity duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity duration-300"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="absolute inset-0 bg-black/50" />
				</Transition.Child>
			</div>
		</Transition>
	);
};

const App = () => {
	return (
		<main className="w-full min-h-screen bg-[#f3f4f6]">
			<Routes>
				<Route element={<Layout />}>
					<Route path="/" element={<Navigate to="/dashboard" />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/tasks" element={<Task />} />
					<Route path="/completed/:status" element={<Task />} />
					<Route path="/in-progress/:status" element={<Task />} />
					<Route path="/todo/:status" element={<Task />} />
					<Route path="/team" element={<Users />} />
					<Route path="/trashed" element={<Trash />} />
					<Route path="/task/:id" element={<TaskDetails />} />
				</Route>
				<Route path="/log-in" element={<Login />} />
			</Routes>
			<Toaster richColors />
		</main>
	);
};
export default App;
