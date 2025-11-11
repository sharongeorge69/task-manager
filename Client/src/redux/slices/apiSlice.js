import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const API_URI = "https://localhost:8800/api";
const API_URI = import.meta.env.VITE_APP_BASE_URL || "http://localhost:8800";

const baseQuery = fetchBaseQuery({ 
	baseUrl: API_URI + "/api",
	credentials: "include", // Always include cookies with requests
});

// Enhanced base query with better error handling
const baseQueryWithReauth = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);
	
	// Handle 401 errors
	if (result.error && result.error.status === 401) {
		// Don't redirect automatically, let components handle it
		// This allows for better user experience with specific error messages
		console.warn("Unauthorized request:", result.error);
	}
	
	return result;
};

export const apiSlice = createApi({
	baseQuery: baseQueryWithReauth,
	tagTypes: ["User", "Team"],
    endpoints: (builder)=>({}),
});
