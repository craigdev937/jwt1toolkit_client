import React from "react";
import { createBrowserRouter,
    RouterProvider } from "react-router-dom";
import { Container } from "react-bootstrap";
import { NotFound } from "../components/NotFound";
import { Header } from "../components/Header";
import { ToastContainer } from "react-toastify";
import { Home } from "../pages/Home";
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";
import { Profile } from "../pages/Profile";
import { PrivateRoute } from "../components/PrivateRoute";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Header />,
        errorElement: <NotFound />,
        children: [
            {
                path: "/",
                element: <Home />,
                errorElement: <NotFound />
            },
            {
                path: "/register",
                element: <Register />,
                errorElement: <NotFound />
            },
            {
                path: "/login",
                element: <Login />,
                errorElement: <NotFound />
            },
            {
                path: "/profile",
                element: <Profile />,
                errorElement: <NotFound />
            }
        ]
    }
]);

export const Main = () => {
    return (
        <React.Fragment>
            <ToastContainer />
            <Container>
                <RouterProvider router={Router} />
            </Container>
        </React.Fragment>
    );
};


// const Router = createBrowserRouter(
//     createRoutesFromElements(
//         <Route>
//             <Route index={true} path="/" element={<Home />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="" element={<PrivateRoute />} >
//                 <Route path="/profile" element={<Profile />} />
//             </Route>
//         </Route>
//     )
// );
