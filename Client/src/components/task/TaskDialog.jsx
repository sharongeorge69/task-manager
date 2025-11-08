import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiTwotoneFolderOpen } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { HiDuplicate } from "react-icons/hi";
import { MdAdd, MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Menu, Transition } from "@headlessui/react";
import AddTask from "./AddTask";
import AddSubTask from "./AddSubTask";
import ConfirmatioDialog from "../Dialogs";

const TaskDialog = ({ task }) => {
	const [open, setOpen] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const [openDialog, setOpenDialog] = useState(false);

	const navigate = useNavigate();

	const duplicateHandler = () => {};
	const deleteClicks = () => {};
	const deleteHandler = () => {};

	const items = [
		{
			label: "Open Task",
			icon: <AiTwotoneFolderOpen className="mr-2 h-5 w-5" aria-hidden="true" />,
			onClick: () => navigate(`/task/${task?._id}`),
		},
		{
			label: "Edit",
			icon: <MdOutlineEdit className="mr-2 h-5 w-5" aria-hidden="true" />,
			onClick: () => setOpenEdit(true),
		},
		{
			label: "Add Sub-Task",
			icon: <MdAdd className="mr-2 h-5 w-5" aria-hidden="true" />,
			onClick: () => setOpen(true),
		},
		{
			label: "Duplicate",
			icon: <HiDuplicate className="mr-2 h-5 w-5" aria-hidden="true" />,
			onClick: () => duplicateHandler(),
		},
	];

	return (
		<>
			{/* 
				Why might <BsThreeDots /> not appear?
				1. The parent may have `overflow: hidden` or not enough width.
				2. Button width is set to "w-full" - if parent has small width, icon is squished.
				3. The icon is there, but is colored white on white, too small, or covered.
				4. Maybe user is not admin and this button is not shown at all (see TaskCard).
				We'll adjust styles and parent container to ensure visibility.
			*/}
			<div style={{ minWidth: 32, minHeight: 32, display: "inline-block" }}>
				<Menu as="div" className="relative inline-block text-left">
					<Menu.Button
						className="flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 focus:outline-none"
						style={{ minWidth: 32, minHeight: 32 }}
						title="Task options"
					>
						<BsThreeDots size={20} />
					</Menu.Button>

					<Transition
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Menu.Items className="absolute p-4 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-[100]">
							<div className="px-1 py-1 space-y-2">
								{items.map((el) => (
									<Menu.Item key={el.label}>
										{({ active }) => (
											<button
												onClick={el?.onClick}
												type="button"
												className={`${
													active ? "bg-blue-500 text-white" : "text-gray-900"
												} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
											>
												{el.icon}
												{el.label}
											</button>
										)}
									</Menu.Item>
								))}
							</div>

							<div className="px-1 py-1">
								<Menu.Item>
									{({ active }) => (
										<button
											onClick={() => deleteClicks()}
											type="button"
											className={`${
												active ? "bg-blue-500 text-white" : "text-red-900"
											} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
										>
											<RiDeleteBin6Line
												className="mr-2 h-5 w-5 text-red-400"
												aria-hidden="true"
											/>
											Delete
										</button>
									)}
								</Menu.Item>
							</div>
						</Menu.Items>
					</Transition>
				</Menu>
			</div>

			<AddTask
				open={openEdit}
				setOpen={setOpenEdit}
				task={task}
				key={new Date().getTime()}
			/>

			<AddSubTask open={open} setOpen={setOpen} />

			<ConfirmatioDialog
				open={openDialog}
				setOpen={setOpenDialog}
				onClick={deleteHandler}
			/>
		</>
	);
};

export default TaskDialog;
