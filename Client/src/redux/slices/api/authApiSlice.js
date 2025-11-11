import constants from "../../../utils/contants";
import { apiSlice } from "../apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (data) => ({
				url: `${constants.USERS_URL}/login`,
				method: "POST",
				body: data,
				credentials: "include",
			}),
		}),
		register: builder.mutation({
			query: (data) => ({
				url: `${constants.USERS_URL}/register`,
				method: "POST",
				body: data,
				credentials: "include",
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: `${constants.USERS_URL}/logout`,
				method: "POST",
				credentials: "include",
			}),
		}),
	}),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
	authApiSlice;
