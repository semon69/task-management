import { createBrowserRouter } from "react-router-dom";
import Home from "../Components/Home/Home";
import Main from "../Layout/Main";
import AddTask from "../Components/AddTask/AddTask";
import AllTask from "../Components/AllTask/AllTask";
import Login from "../Components/Login_Sign up/Login";
import Registration from "../Components/Login_Sign up/Registration";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path:  '/',
            element: <Home></Home>
        },
        {
            path: '/addTask',
            element: <AddTask></AddTask>
        },
        {
          path: '/allTask',
          element: <AllTask></AllTask>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/registration',
          element: <Registration></Registration>
        }
      ]
    },
  ]);
  export default router;