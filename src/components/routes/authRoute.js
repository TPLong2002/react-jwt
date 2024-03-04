import Login from "@/components/pages/auth/Login";
import Register from "@/components/pages/auth/Register";
import { Route, Routes, Navigate } from "react-router-dom";
import DefaulLayout from "@/components/layout/DefaulLayout";
import { useSelector } from "react-redux";
export const authRoutes = [
  { path: "/login", component: Login },
  { path: "/register", component: Register },
];
const AuthRoute = () => {
  const isAuth = localStorage.getItem("isAuth");
  const auth = useSelector((state) => state.auth);
  return (
    <Routes>
      {!auth.isAuth ? (
        authRoutes.map((route, index) => {
          const Layout = route.layout || DefaulLayout;
          let Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })
      ) : (
        <Route path="*" element={<Navigate to={"/user"} />} />
      )}
    </Routes>
  );
};
export default AuthRoute;
