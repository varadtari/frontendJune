import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Dataentry from "./Dataentry";
import Training from "./Training";
import Validation from "./Validation";
import View from "./View";

const Dashboard = () => {
  return (
    <div style={{textAlign:"center",fontSize:"60px", display:"flex"}}>
      

      <Sidebar/>
     
     
    </div>
  );
};

export default Dashboard;
