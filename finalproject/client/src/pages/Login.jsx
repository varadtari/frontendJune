import React, { useState, useContext } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [details, setDetails] = useState({
    email: "",
    password: "",
    role: "",
  });

  const userData = [
    {
      email: "allwin.lima@rosenberger.in",
      password: "1234",
      role: "trainer",
      token: Math.random(10000000),
    },
    {
      email: "pragati.lotlikar@rosenberger.in",
      password: "1234",
      role: "trainer",
      token: Math.random(10000000),
    },
    {
      email: "janardan.velip@rosenberger.in",
      password: "1234",
      role: "trainer",
      token: Math.random(10000000),
    },
    {
      email: "manager@rosenberger.in",
      password: "1234",
      role: "manager",
      token: Math.random(10000000),
    },
    {
      email: "superviser@rosenberger.in",
      password: "1234",
      role: "supervisor",
      token: Math.random(10000000),
    },
  ];

  const authenticate = () => {
    const user = userData.find(
      (obj) =>
        obj.email === details.email &&
        obj.password === details.password &&
        obj.role === details.role
    );
    if (user) {
      return user.token;
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkUser = authenticate();
    if (checkUser) {
      setUser(details.role); // Set the user role using the setUser function from the context
      localStorage.setItem("user", details.role); // Update the user role in localStorage
      localStorage.setItem("token", checkUser);
      navigate("/Dashboard");
    } else {
      alert("Wrong credentials");
    }
  };

  return (
    <div className="bg-1">
      <div className="login-main d-flex justify-content-center align-items-center">
        <div className="login">
          <h2>LOGIN</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                placeholder="Email"
                required
                value={details.email}
                onChange={(e) =>
                  setDetails({ ...details, email: e.target.value })
                }
              />
            </div>
            <div>
              <input
                placeholder="Password"
                type="password"
                required
                value={details.password}
                onChange={(e) =>
                  setDetails({ ...details, password: e.target.value })
                }
              />
            </div>
            <div>
              <select
                onChange={(e) => {
                  setDetails({ ...details, role: e.target.value });
                }}
                id="selectsuccess"
                className="box"
                name="designation"
              >
                <option value="">--Select Role--</option>
                <option value="trainer">Trainer</option>
                <option value="supervisor">Supervisor</option>
                <option value="manager">Manager</option>
              </select>
            </div>
            <div className="button mt-5">
              <input type="submit" value="Log In" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;