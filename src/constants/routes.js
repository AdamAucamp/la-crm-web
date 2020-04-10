import React from "react";
import Test from "../views/Test"
import CustomerList from "../views/CustomerList"
import Home from "../views/Home"
import Profile from "../views/Profile"


const routes = [
  { name: "Home", path: "/", exact: true, main: () => <Home/> },
  { name: "CustomerList", path: "/customer_list", exact: true, main: () => <CustomerList /> },
  { name: "Profile", path: "/profile", exact: true, main: () => <Profile /> },
  { name: "Test", path: "/test", exact: true, main: () => <Test /> },
];

export default routes;
