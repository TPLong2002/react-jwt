import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";
import { publicRoutes } from "@/components/routes/publicRoute";
import { privateRoutes } from "@/components/routes/PrivateRoute";
import { authRoutes } from "@/components/routes/authRoute";
import { Routes, Route, Navigate } from "react-router-dom";
import DefaulLayout from "@/components/layout/DefaulLayout";

import { useDispatch, useSelector } from "react-redux";
import { accountUser } from "@/common/redux-toolkit/features/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(accountUser()).then((res) =>
      localStorage.setItem("isAuth", res.payload.isAuth)
    );
  }, []);

  return (
    <Router>
      {/* <PrivateRoute />
      <PublicRoutes />
      <AuthRoutes /> */}
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
    </Router>
  );
  // return <Test />;
}

export default App;
