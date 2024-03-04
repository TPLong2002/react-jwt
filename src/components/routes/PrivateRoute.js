import User from "@/components/pages/user";
import Role from "@/components/pages/role";
import Group from "@/components/pages/group";
import authLayout from "@/components/layout/authLayout";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
export const privateRoutes = [
  { path: "/user", component: User, layout: authLayout },
  { path: "/role", component: Role, layout: authLayout },
  { path: "/group", component: Group, layout: authLayout },
];
const PrivateRoute = () => {
  const auth = useSelector((state) => state.auth);
  const isAuth = localStorage.getItem("isAuth");
  return (
    <Routes>
      {auth.isAuth ? (
        privateRoutes.map((route, index) => {
          const Layout = route.layout;
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
        <Route path="*" element={<Navigate to={"/login"} />} />
      )}
    </Routes>
  );
};

export default PrivateRoute;
