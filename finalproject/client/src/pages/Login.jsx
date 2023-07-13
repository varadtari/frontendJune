import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { setUser } from "../App";



const Login = ({ setLoginUser }) => {
  const navigate = useNavigate();

  const [details, setDetails] = React.useState({
    email: "",
    password: "",
  });
  

  const authenticate = async () => {
    let user = userData.find((obj) => {
      return obj.email === details.email && obj.password === details.password;
    });
    if (user) {
      return user.token;
    }
    return null;
  };
  const handleSubmit = async () => {
    let checkUser = await authenticate();
    console.log("check", checkUser);
    if (checkUser) {
      localStorage.setItem("token", checkUser);
      navigate("/Dashboard");
    } else {
      alert("Wrong credentials");
    }
  };
  

  // const [user, setUser] = useState({
  //   email: "",
  //   password: "",
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setUser({
  //     ...user,
  //     [name]: value,
  //   });
  // };

  // const login = () => {
  //   axios.post("http://localhost:3001/login", user).then((res) => {
  //     alert(res.data.message);
  //     setLoginUser = res.data.user;
  //     navigate("/");
  //   });
  // };

  return (
    <div className="bg-1">
    <div className="login-main d-flex justify-content-center align-items-center" >
    <div className="login">
      <h2>LOGIN</h2>
      {/* <h1>Login</h1>
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email"></input>
            <input type="password" name="password" value={user.password} onChange={handleChange}  placeholder="Enter your Password" ></input>
            <div className="button" onClick={login}>Login</div>
            <div>or</div>
            <div className="button" onClick={() => navigate("/Register")}>Register</div> */}
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <input
            type="email"
            placeholder="Email"
            required
            value={details.email}
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
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
          <select onChange={(e)=>{setUser(e.target.value)}} id='selectsuccess' className='box' name='designation' >
            <option selected>--Select Role--</option>
            <option value={0}>Trainer</option>
            <option value={1}>Supervisor</option>
            <option value={2}>Manager</option>
          </select>
        </div>
        <div className="button mt-5">
          <input type="submit" value="Log In" onClick={() => handleSubmit()} />
        </div>
      </form>
    </div>
    </div>
    </div>
  );
};
const setUser=(value)=>{
  localStorage.setItem("user",value);
  
}
export const isTrainer=()=>{
return localStorage.getItem("user")==0;
}
export const isManager=()=>{
  return localStorage.getItem("user")==2;
  }
  export const isSupervisor=()=>{
    return localStorage.getItem("user")==1;
    }

export default Login;
console.log("isTrainer value",isTrainer())
console.log("isSupervisor value",isSupervisor())
console.log("isManager value",isManager())

const userData = [
  {
    email: "allwin.lima@rosenberger.in",
    password: "1234",
    token: Math.random(10000000),
  },
  {
    email: "admin@gmail.com",
    password: "1234",
    token: Math.random(10000000),
  },
  {
    email: "pcce@gmail.com",
    password: "1234",
    token: Math.random(10000000),
  },
];