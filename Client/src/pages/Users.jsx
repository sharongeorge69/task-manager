import React, { useState, useEffect } from "react";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import { getInitials } from "../utils";
import clsx from "clsx";
import ConfirmatioDialog, { UserAction } from "../components/Dialogs";
import AddUser from "../components/AddUser";
import Loading from "../components/Loader";
import { toast } from "sonner";
import {
	useDeleteUserMutation,
	useGetTeamListsQuery,
	useUserActionMutation,
} from "../redux/slices/api/userApiSlice";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Users = () => {
	const { user } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [searchTerm] = useState(searchParams.get("search") || "");

	// Only fetch team list if user is admin
	const { data, isLoading, error, refetch } = useGetTeamListsQuery(
		{
			search: searchTerm || "",
		},
		{
			skip: !user?.isAdmin, // Skip query if user is not admin
		}
	);
	const [deleteUser] = useDeleteUserMutation();
	const [userAction] = useUserActionMutation();

	const [openDialog, setOpenDialog] = useState(false);
	const [open, setOpen] = useState(false);
	const [openAction, setOpenAction] = useState(false);
	const [selected, setSelected] = useState(null);

	const deleteClick = (id) => {
		setSelected(id);
		setOpenDialog(true);
	};

	const editClick = (el) => {
		setSelected(el);
		setOpen(true);
	};

	const userStatusClick = (el) => {
		setSelected(el);
		setOpenAction(true);
	};

	const deleteHandler = async () => {
		try {
			const res = await deleteUser(selected).unwrap();
			toast.success(res?.message || "User deleted successfully");
			setSelected(null);
			setOpenDialog(false);
		} catch (error) {
			console.log(error);
			toast.error(
				error?.data?.message || error?.error || "Failed to delete user"
			);
		}
	};

	const userActionHandler = async () => {
		try {
			const res = await userAction({
				isActive: !selected?.isActive,
				id: selected?._id,
			}).unwrap();
			toast.success(res?.message || "User status updated successfully");
			setSelected(null);
			setOpenAction(false);
		} catch (error) {
			console.log(error);
			toast.error(
				error?.data?.message || error?.error || "Failed to update user status"
			);
		}
	};

	// Reset selected when modal closes
	useEffect(() => {
		if (!open) {
			setSelected(null);
		}
	}, [open]);

	const TableHeader = () => (
		<thead className="border-b border-gray-300 dark:border-gray-600">
			<tr className="text-black dark:text-black  text-left">
				<th className="py-2">Full Name</th>
				<th className="py-2">Title</th>
				<th className="py-2">Email</th>
				<th className="py-2">Role</th>
				<th className="py-2">Active</th>
			</tr>
		</thead>
	);

	const TableRow = ({ user }) => (
		<tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10">
			<td className="p-2">
				<div className="flex items-center gap-3">
					<div className="w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-blue-700">
						<span className="text-xs md:text-sm text-center">
							{getInitials(user.name)}
						</span>
					</div>
					{user.name}
				</div>
			</td>
			<td className="p-2">{user.title}</td>
			<td className="p-2">{user.email}</td>
			<td className="p-2">{user.role}</td>
			<td>
				<button
					onClick={() => userStatusClick(user)}
					className={clsx(
						"w-fit px-4 py-1 rounded-full",
						user?.isActive ? "bg-blue-200" : "bg-yellow-100"
					)}
				>
					{user?.isActive ? "Active" : "Disabled"}
				</button>
			</td>
			<td className="p-2 flex gap-4 justify-end">
				<Button
					className="text-blue-600 hover:text-blue-500 font-semibold sm:px-0"
					label="Edit"
					type="button"
					onClick={() => editClick(user)}
				/>

				<Button
					className="text-red-700 hover:text-red-500 font-semibold sm:px-0"
					label="Delete"
					type="button"
					onClick={() => deleteClick(user?._id)}
				/>
			</td>
		</tr>
	);

	// Show message if user is not admin (check this first to avoid making the API call)
	if (!user?.isAdmin) {
		return (
			<div className="w-full md:px-1 px-0 mb-6">
				<div className="flex items-center justify-between mb-8">
					<Title title="  Team Members" />
				</div>
				<div className="bg-white dark:bg-[#c9c3c3] px-2 md:px-4 py-4 shadow rounded">
					<div className="text-center py-8 text-gray-600">
						<p className="text-lg mb-4">
							Admin access required to view team members.
						</p>
						<Button
							label="Go to Dashboard"
							className="mt-4 bg-blue-600 text-white"
							onClick={() => navigate("/dashboard")}
						/>
					</div>
				</div>
			</div>
		);
	}

	// Show loading state (only if user is admin)
	if (isLoading) {
		return (
			<div className="py-10">
				<Loading />
			</div>
		);
	}

	// Show error or unauthorized message (only if user is admin but request failed)
	if (error) {
		const errorMessage =
			error?.data?.message || error?.error || "Unknown error";
		const isUnauthorized =
			error?.status === 401 ||
			errorMessage.toLowerCase().includes("authorized") ||
			errorMessage.toLowerCase().includes("admin");

		return (
			<div className="w-full md:px-1 px-0 mb-6">
				<div className="flex items-center justify-between mb-8">
					<Title title="  Team Members" />
					<Button
						label="Add New User"
						icon={<IoMdAdd className="text-lg" />}
						className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md 2xl:py-2.5"
						onClick={() => setOpen(true)}
					/>
				</div>
				<div className="bg-white px-2 md:px-4 py-4 shadow rounded">
					<div className="text-center py-8">
						<p className="text-lg mb-4 text-red-600">
							{isUnauthorized
								? "You don't have permission to view team members. Please log in as an admin."
								: `Error loading team members: ${errorMessage}`}
						</p>
						{isUnauthorized ? (
							<div className="flex gap-4 justify-center">
								<Button
									label="Go to Dashboard"
									className="mt-4 bg-blue-600 text-white"
									onClick={() => navigate("/dashboard")}
								/>
								<Button
									label="Retry"
									className="mt-4 bg-gray-600 text-white"
									onClick={() => refetch()}
								/>
							</div>
						) : (
							<Button
								label="Retry"
								className="mt-4 bg-blue-600 text-white"
								onClick={() => refetch()}
							/>
						)}
					</div>
				</div>
			</div>
		);
	}

	const teamMembers = Array.isArray(data) ? data : [];

	return (
		<>
			<div className="w-full md:px-1 px-0 mb-6">
				<div className="flex items-center justify-between mb-8">
					<Title title="  Team Members" />

					<Button
						label="Add New User"
						icon={<IoMdAdd className="text-lg" />}
						className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md 2xl:py-2.5"
						onClick={() => setOpen(true)}
					/>
				</div>
				<div className="bg-white px-2 md:px-4 py-4 shadow rounded">
					{teamMembers.length === 0 ? (
						<div className="text-center py-8 text-gray-500">
							<p>No team members found.</p>
							<p className="text-sm mt-2">
								Click "Add New User" to get started.
							</p>
						</div>
					) : (
						<div className="overflow-x-auto">
							<table className="w-full mb-5">
								<TableHeader />
								<tbody>
									{teamMembers.map((user, index) => (
										<TableRow key={user._id || index} user={user} />
									))}
								</tbody>
							</table>
						</div>
					)}
				</div>
			</div>

			<AddUser
				open={open}
				setOpen={setOpen}
				userData={selected}
				key={new Date().getTime().toString()}
			/>

			<ConfirmatioDialog
				open={openDialog}
				setOpen={setOpenDialog}
				onClick={deleteHandler}
			/>

			<UserAction
				open={openAction}
				setOpen={setOpenAction}
				onClick={userActionHandler}
			/>
		</>
	);
};

export default Users;
