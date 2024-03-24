import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "./common/error";
import LoaderElement from "../shared/ui/loaderElement";
import ProtectedRoute from "./common/protectedRoute";

export default function Routing() {
  const Signin = lazy(() => import("./common/signin"));
  const Signup = lazy(() => import("./common/signup"));
  const Profile = lazy(() => import("./common/profile"));
  const Users = lazy(() => import("./admin/users"));
  const Roles = lazy(() => import("./admin/roles"));

  return (
    <Routes>
      <Route path="*" element={<ErrorPage />} errorElement={<ErrorPage />} />
      <Route element={<ProtectedRoute authRoutes />}>
        <Route
          path="/signin"
          element={
            <Suspense fallback={<LoaderElement />}>
              <Signin />
            </Suspense>
          }
          errorElement={<ErrorPage />}
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<LoaderElement />}>
              <Signup />
            </Suspense>
          }
          errorElement={<ErrorPage />}
        />
      </Route>

      <Route element={<ProtectedRoute commonRoutes />}>
        <Route
          path="/profile"
          element={
            <Suspense fallback={<LoaderElement />}>
              <Profile />
            </Suspense>
          }
          errorElement={<ErrorPage />}
        />
      </Route>

      <Route element={<ProtectedRoute onlyAdminRoutes />}>
        <Route
          path="/users"
          element={
            <Suspense fallback={<LoaderElement />}>
              <Users />
            </Suspense>
          }
          errorElement={<ErrorPage />}
        />
        <Route
          path="/roles"
          element={
            <Suspense fallback={<LoaderElement />}>
              <Roles />
            </Suspense>
          }
          errorElement={<ErrorPage />}
        />
      </Route>
    </Routes>
  );
}
