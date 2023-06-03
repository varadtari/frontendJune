import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Training from "./pages/Training.jsx";
import Header from "./components/Header";
import Dataentry from "./pages/Dataentry";
import Validation from "./pages/Validation.jsx";
import View from "./pages/View.jsx";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Induction from "./pages/Induction";




import Matrix from "./pages/Matrix";
import MatrixTable from "./pages/MatrixTable";
import Svalidation from "./pages/Svalidation";
import Fvalidation from "./pages/Fvalidation";


const App = () => {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
  
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
            <Route path="" element={<Layout><Training /></Layout>} />
              <Route path=":dept" element={<Layout><Induction/></Layout>}/>
            </Route>
            <Route path="Dataentry" element={<Layout><Dataentry /> </Layout>} />
            <Route path="Validation" element={<Layout><Matrix /></Layout>} />
            <Route path="View" element={<Layout><View /></Layout>} />
            <Route path="Svalidation" element={<Layout><Svalidation /></Layout>} />
            <Route path="Fvalidation" element={<Layout><Fvalidation /></Layout>} />
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
