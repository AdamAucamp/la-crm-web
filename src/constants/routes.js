import React from "react";
import Test from "../views/Test"
import CustomerList from "../views/CustomerList"
import CustomerDetails from "../views/CustomerDetails"
import Home from "../views/Home"
import Profile from "../views/Profile"
import Settings from "../views/Settings";


const routes = [
  { name: "Home", path: "/", exact: true, main: () => <Home/> },
  { name: "CustomerList", path: "/customer_list", exact: true, main: () => <CustomerList /> },
  { name: "CustomerDetails", path: "/customer_details/:id", main: () => <CustomerDetails /> },
  { name: "Profile", path: "/profile", exact: true, main: () => <Profile /> },
  { name: "Settings", path: "/settings", exact: true, main: () => <Settings /> },
  { name: "Test", path: "/test", exact: true, main: () => <Test /> },
];

export default routes;
