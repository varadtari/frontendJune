import React, { useEffect, useState } from "react";
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
import Pvalidation from "./pages/Pvalidation";
import Fvalidation from "./pages/Fvalidation";
import SkillForm from "./pages/Skillform";
import Skillwise from "./pages/Skillwise";
import FormatForm from "./pages/Formatform";

export const UserContext = React.createContext();

const App = () => {
  const [user, setUser] = useState(localStorage.getItem("user") || "");

  useEffect(() => {
    localStorage.setItem("user", user);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Skillform" element={<SkillForm />} />
            <Route path="/Skillwise" element={<Skillwise />} />
            <Route path="/Formatform" element={<FormatForm />} />
            <Route
              path="/Dashboard"
              element={
                <Layout>
                  <div className="bgimg">
                    <div className="text">
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
            <Route
              path="/Dashboard/Training"
              element={!isSupervisor() ? <Layout><Training /></Layout> : null}
            />
            <Route
              path="/Dashboard/Training/:dept"
              element={
                !isSupervisor() ? <Layout><Induction /></Layout> : null
              }
            />
            <Route
              path="/Dashboard/Dataentry"
              element={!isSupervisor() ? <Layout><Dataentry /></Layout> : null}
            />
            <Route
              path="/Dashboard/Validation"
              element={!isSupervisor() ? <Layout><Matrix /></Layout> : null}
            />
            <Route
              path="/Dashboard/View"
              element={!isSupervisor() ? <Layout><View /></Layout> : null}
            />
            <Route
              path="/Dashboard/Pvalidation"
              element={
                isTrainer() || isManager() || isSupervisor() ? <Layout><Pvalidation /></Layout> : null
              }
            />
            <Route
              path="/Dashboard/Fvalidation"
              element={!isSupervisor() ? <Layout><Fvalidation /></Layout> : null}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
};

export const isTrainer = () => {
  return localStorage.getItem("user") === "trainer";
};

 export const isManager = () => {
  return localStorage.getItem("user") === "manager";
};

export const isSupervisor = () => {
  return localStorage.getItem("user") === "supervisor";
};

export default App;