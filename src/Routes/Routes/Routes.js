import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import AddProduct from "../../Pages/AddProduct/AddProduct";
import AllBuyers from "../../Pages/Admin/AllBuyers";
import AllSellers from "../../Pages/Admin/AllSellers";
import Report from "../../Pages/Admin/Report";
import Blogs from "../../Pages/Blogs/Blogs";
import MyOrders from "../../Pages/Buyer/MyOrders";
import Checkout from "../../Pages/Checkout/Checkout";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import Products from "../../Pages/Products/Products";
import Register from "../../Pages/Register/Register";
import MyProdcut from "../../Pages/Seller/MyProdcut";
import PrivateRouter from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/category/:id',
                element: <PrivateRouter><Products></Products></PrivateRouter>,
                loader: ({ params }) => fetch(`https://popup-server-mdsajedulra.vercel.app/products/${params.id}`),
            },
            {
                path: '/addproduct',
                element: <AddProduct></AddProduct>,
            },
            {
                path: '/login',
                element: <Login></Login>,
            },
            {
                path: '/register',
                element: <Register></Register>,
            },
            {
                path: '/blogs',
                element: <Blogs></Blogs>,
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRouter><DashboardLayout></DashboardLayout></PrivateRouter>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/dashboard',
                // element: <AddProduct></AddProduct>
            },
            {
                path: '/dashboard/addproduct',
                element: <AddProduct></AddProduct>
            },
            {
                path: '/dashboard/myorders',
                element: <MyOrders></MyOrders>
            },
            {
                path: '/dashboard/myproducts',
                element: <MyProdcut></MyProdcut>
            },
            {
                path: '/dashboard/allbuyers',
                element: <AllBuyers></AllBuyers>
            },
            {
                path: '/dashboard/allsellers',
                element: <AllSellers></AllSellers>
            },
            {
                path: '/dashboard/checkout/:id',
                element: <Checkout></Checkout>,
                loader: ({ params }) => fetch(`https://popup-server-mdsajedulra.vercel.app/productinfo/${params.id}`)
            },
            {
                path: '/dashboard/reports',
                element: <Report></Report>,
            }
        ]
    }
])
export default router;