const baseURL = "http://localhost:5000";

export const ENDPOINTS = {
  AUTH: {
    SIGNIN: "auth/login",
    SIGNUP: "auth/registration",
    USER_DATA: "auth/userData",
  },
  ADMIN: {
    USERS: "users",
    ROLES: "roles",
    GIVE_ROLE: "users/give_role",
    TAKE_ROLE: "users/take_role",
    BAN: "users/ban",
    UNBAN: "users/unban",
  },
  USER: {
    RESIDENT: "personal/resident",
    TRANSFERS: "personal/transfers",
  },
};

export default baseURL;
