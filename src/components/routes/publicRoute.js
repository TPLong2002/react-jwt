import Home from "@/components/pages/home";
import authLayout from "@/components/layout/authLayout";
import { Route, Routes } from "react-router-dom";
export const publicRoutes = [
  { path: "/", component: Home, layout: authLayout },
];
const PublicRoute = () => {
  return (
    <Routes>
      {publicRoutes.map((route, index) => {
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
      })}
    </Routes>
  );
};
export default PublicRoute;
