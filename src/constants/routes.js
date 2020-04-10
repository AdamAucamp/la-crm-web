import React from "react";
import Card from "../views/card"
import CustomerList from "../views/CustomerList"
import Home from "../views/Home"
import Profile from "../views/Profile"


const routes = [
  { name: "Home", path: "/", exact: true, main: () => <Home/> },
  { name: "CustomerList", path: "/customer_list", exact: true, main: () => <CustomerList /> },
  { name: "Profile", path: "/profile", exact: true, main: () => <Profile /> },
  { name: "Card", path: "/card", exact: true, main: () => <Card /> },
];

export default routes;
