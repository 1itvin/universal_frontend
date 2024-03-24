import { createApi } from "@reduxjs/toolkit/query/react";
import { ENDPOINTS } from "../../shared/endpoints";
import { baseQueryWithReauth } from "../baseQueryWithReauth";
import IUser from "../../shared/interfaces/user";
import IRole from "../../shared/interfaces/role";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Users", "Roles"],
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => ({
        url: ENDPOINTS.ADMIN.USERS,
      }),
      providesTags: ["Users"],
    }),
    createUser: builder.mutation<
      void,
      {
        email: string;
        password: string;
      }
    >({
      query: (user) => ({
        url: ENDPOINTS.ADMIN.USERS,
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation<void, { id: number; email: string }>({
      query: (user) => ({
        url: `${ENDPOINTS.ADMIN.USERS}/${user.id}`,
        method: "PUT",
        body: {
          email: user.email,
        },
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `${ENDPOINTS.ADMIN.USERS}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),

    banUser: builder.mutation<void, { id: number; banReason: string }>({
      query: ({ id, banReason }) => ({
        url: `${ENDPOINTS.ADMIN.BAN}/${id}`,
        method: "POST",
        body: { userId: id, banReason: banReason },
      }),
      invalidatesTags: ["Users"],
    }),
    unBanUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `${ENDPOINTS.ADMIN.UNBAN}/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Users"],
    }),

    getRoles: builder.query<IRole[], void>({
      query: () => ({
        url: ENDPOINTS.ADMIN.ROLES,
      }),
      providesTags: ["Roles"],
    }),
    createRole: builder.mutation<void, IRole>({
      query: (role) => ({
        url: ENDPOINTS.ADMIN.ROLES,
        method: "POST",
        body: {
          value: role.value,
          description: role.description,
        },
      }),
      invalidatesTags: ["Roles"],
    }),
    updateRole: builder.mutation<void, IRole>({
      query: (role) => ({
        url: `${ENDPOINTS.ADMIN.ROLES}/${role.id}`,
        method: "PUT",
        body: {
          value: role.value,
          description: role.description,
        },
      }),
      invalidatesTags: ["Roles", "Users"],
    }),
    deleteRole: builder.mutation<void, number>({
      query: (id) => ({
        url: `${ENDPOINTS.ADMIN.ROLES}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Roles", "Users"],
    }),

    giveRole: builder.mutation<void, { id: number; value: string }>({
      query: ({ id, value }) => ({
        url: `${ENDPOINTS.ADMIN.GIVE_ROLE}/${id}`,
        method: "POST",
        body: { value },
      }),
      invalidatesTags: ["Users"],
    }),
    takeRole: builder.mutation<void, { id: number; value: string }>({
      query: ({ id, value }) => ({
        url: `${ENDPOINTS.ADMIN.TAKE_ROLE}/${id}`,
        method: "POST",
        body: { value },
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,

  useBanUserMutation,
  useUnBanUserMutation,

  useGetRolesQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,

  useGiveRoleMutation,
  useTakeRoleMutation,
} = adminApi;
