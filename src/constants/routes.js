import React from "react";
import Card from "../views/card"
import CustomerList from "../views/CustomerList"


const routes = [
  { name: "Join", path: "/", exact: true, main: () => <div>join</div> },
  { name: "Card", path: "/card", exact: true, main: () => <Card /> },
  { name: "CustomerList", path: "/customer_list", exact: true, main: () => <CustomerList /> },
  { name: "Home", path: "/home", exact: true, main: () => <Card/> }
];

export default routes;
