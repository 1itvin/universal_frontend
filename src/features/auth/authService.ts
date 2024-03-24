import { createApi } from "@reduxjs/toolkit/query/react";
import { ENDPOINTS } from "../../shared/endpoints";
import IAdmin from "../../shared/interfaces/user";
import { baseQueryWithReauth } from "../baseQueryWithReauth";

interface IProps {
  email: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: ({ email, password }: IProps) => ({
        url: ENDPOINTS.AUTH.SIGNIN,
        method: "POST",
        body: { email, password },
      }),
    }),
    signup: builder.mutation({
      query: ({ email, password }: IProps) => ({
        url: ENDPOINTS.AUTH.SIGNUP,
        method: "POST",
        body: { email, password },
      }),
    }),
    getUser: builder.mutation<IAdmin, void>({
      query: () => ({
        url: ENDPOINTS.AUTH.USER_DATA,
        method: "GET",
      }),
    }),
  }),
});

export const { useSigninMutation, useSignupMutation, useGetUserMutation } =
  authApi;
