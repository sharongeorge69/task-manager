export const formatDate = (date) => {
	// Get the month, day, and year
	const month = date.toLocaleString("en-US", { month: "short" });
	const day = date.getDate();
	const year = date.getFullYear();

	const formattedDate = `${day}-${month}-${year}`;

	return formattedDate;
};

export function dateFormatter(dateString) {
	const inputDate = new Date(dateString);

	if (isNaN(inputDate)) {
		return "Invalid Date";
	}

	const year = inputDate.getFullYear();
	const month = String(inputDate.getMonth() + 1).padStart(2, "0");
	const day = String(inputDate.getDate()).padStart(2, "0");

	const formattedDate = `${year}-${month}-${day}`;
	return formattedDate;
}

export function getInitials(fullName) {
	if (!fullName || typeof fullName !== "string") {
		return "?";
	}

	const names = fullName
		.trim()
		.split(" ")
		.filter((name) => name.length > 0);

	if (names.length === 0) {
		return "?";
	}

	const initials = names.slice(0, 2).map((name) => name[0].toUpperCase());

	const initialsStr = initials.join("");

	return initialsStr;
}

export const PRIOTITYSTYELS = {
	high: "text-red-600",
	medium: "text-yellow-600",
	low: "text-blue-600",
};

export const TASK_TYPE = {
	todo: "bg-blue-600",
	"in progress": "bg-yellow-600",
	completed: "bg-green-600",
};

export const BGS = [
	"bg-blue-600",
	"bg-yellow-600",
	"bg-red-600",
	"bg-green-600",
];

// Get count of completed subtasks
export function getCompletedSubTasks(subTasks) {
	if (!subTasks || !Array.isArray(subTasks)) {
		return 0;
	}
	return subTasks.filter((subTask) => subTask?.isCompleted === true).length;
}

// Count tasks by stage (todo, in progress, completed)
export function countTasksByStage(tasks) {
	if (!tasks || !Array.isArray(tasks)) {
		return {
			todo: 0,
			"in progress": 0,
			inProgress: 0,
			completed: 0,
		};
	}

	const counts = tasks.reduce(
		(acc, task) => {
			const stage = task?.stage || "todo";
			if (stage === "todo") {
				acc.todo += 1;
			} else if (stage === "in progress") {
				acc.inProgress += 1;
				acc["in progress"] += 1;
			} else if (stage === "completed") {
				acc.completed += 1;
			}
			return acc;
		},
		{
			todo: 0,
			"in progress": 0,
			inProgress: 0,
			completed: 0,
		}
	);

	return counts;
}

// Update URL with search parameters
export function updateURL({ searchTerm, navigate, location }) {
	const params = new URLSearchParams(location.search);

	if (searchTerm && searchTerm.trim()) {
		params.set("search", searchTerm.trim());
	} else {
		params.delete("search");
	}

	const newSearch = params.toString();
	const newPath = newSearch
		? `${location.pathname}?${newSearch}`
		: location.pathname;

	navigate(newPath, { replace: true });
}
