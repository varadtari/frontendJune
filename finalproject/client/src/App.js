import React,{useState,useEffect} from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Training from "./pages/Training.jsx";
import Header from "./components/Header";
import Dataentry from "./pages/Dataentry";
import Validation from "./pages/Validation.jsx";
import View from "./pages/View.jsx";
import Layout from "./components/Layout";
import Login, { isSupervisor } from "./pages/Login";
// import Login, { isTrainer } from "./pages/Login";
// import Login, { isManager } from "./pages/Login";
import Register from "./pages/Register";
import Induction from "./pages/Induction";




import Matrix from "./pages/Matrix";
import MatrixTable from "./pages/MatrixTable";
import Pvalidation from "./pages/Pvalidation";
import Fvalidation from "./pages/Fvalidation";
import SkillForm from "./pages/Skillform";


const App = () => {
 
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/Skillform" element={<SkillForm/>} />
  
          <Route path="/Matrix" element={<Matrix/>} />     
          <Route path="/Dashboard" >
            <Route
              path=""
              element={<Layout>
                <div className="bgimg">
                <div className="text" >
                  <h1>
              
                  WELCOME
                  <br />
                  TO <br />
                  ROSENBERGER'S DASHBOARD
                  </h1>
                 
                </div>
                </div>
                
                </Layout>
              }
            />
            {/* <Route path="Training" element={<Layout><Training /></Layout>} /> */}
            <Route path="Training"> 
            <Route path="" element={(!isSupervisor())?<Layout><Training /></Layout>:null} />
              <Route path=":dept" element={<Layout><Induction/></Layout>}/>
            </Route>
            <Route path="Dataentry" element={<Layout>{(!isSupervisor())?<Dataentry />:null}</Layout>} />
            <Route path="Validation" element={(!isSupervisor())?<Layout><Matrix /></Layout>:null} />
            <Route path="View" element={(!isSupervisor())?<Layout><View /></Layout>:null} />
            <Route path="Pvalidation" element={<Layout><Pvalidation /></Layout>}/>
            <Route path="Fvalidation" element={(!isSupervisor())?<Layout><Fvalidation /></Layout>:null} />
          </Route>
        </Routes>
        {/* <Route path="/" element={<Dashboard />} /> */}
        {/* <Route path="/Dashboard" element={<Dashboard />} /> */}
        {/* <Route path="/Training" element={<Training />} />
            <Route path="/Dataentry" element={<Dataentry />} />
            <Route path="/Validation" element={<Validation />} />
            <Route path="/View" element={<View />} /> */}
      </BrowserRouter>
    </div>
  );
};

export default App;