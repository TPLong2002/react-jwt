import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
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
    dispatch(accountUser()).then((res) => {
      localStorage.setItem("isAuth", res.payload.isAuth);
    });
  }, []);

  const isAuth = localStorage.getItem("isAuth");
  console.log(localStorage.getItem("prePath"));
  return (
    <Router>
      <Routes>
        {privateRoutes.map((route, index) => {
          const Layout = route.layout;
          let Page = route.component;
          if (isAuth === "true") {
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
          }
          return (
            <Route key={index} path="*" element={<Navigate to={"/login"} />} />
          );
        })}
        {authRoutes.map((route, index) => {
          const Layout = route.layout || DefaulLayout;
          let Page = route.component;

          if (isAuth === "true") {
            return (
              <Route
                key={index}
                path="*"
                element={<Navigate to={`${localStorage.getItem("prePath")}`} />}
              />
            );
          }
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
