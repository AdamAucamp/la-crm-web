import React from "react";
import Card from "../views/card"
import CustomerList from "../views/CustomerList"
import Home from "../views/Home"


const routes = [
  { name: "Home", path: "/", exact: true, main: () => <Home/> },
  { name: "Card", path: "/card", exact: true, main: () => <Card /> },
  { name: "CustomerList", path: "/customer_list", exact: true, main: () => <CustomerList /> },
];

export default routes;
