import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login/login";
import Dashboard from "./layouts/dashboard";
import Guest from "./layouts/guest";
import Root from "./layouts/root";
import Categories from "./pages/Categories";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '',
                element: <Dashboard />,
                children: [
                    {
                        path: '',
                        element: <Home />
                    },
                    {
                        path: 'categories',
                        element: <Categories />
                    },
                ]
            },
            {
                path: '/auth',
                element: <Guest />,
                children: [
                    {
                        path: 'login',
                        element: <Login />
                    },
                ]
            },
        ]
    },


])