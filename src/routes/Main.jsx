import React from "react";
import { createBrowserRouter, Route, 
    createRoutesFromElements,
    RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Home } from "../pages/Home";
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";
import { Profile } from "../pages/Profile";
import { PrivateRoute } from "../components/PrivateRoute";

const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route index={true} path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="" element={<PrivateRoute />} >
                <Route path="/profile" element={<Profile />} />
            </Route>
        </Route>
    )
);

export const Main = () => {
    return (
        <React.Fragment>
            <ToastContainer />
            <RouterProvider router={Router} />
        </React.Fragment>
    );
};


