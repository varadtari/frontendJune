import React, { useState } from "react"
import "./Register.css"
import axios from "axios"
import {  useNavigate } from "react-router-dom"
import Login from "./Login"

const Register = () => {

    const navigate = useNavigate()

    const [ user, setUser] = useState({
        name: "",
        email:"",
        password:"",
        reEnterPassword: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const Register = () => {
        const { name, email, password, reEnterPassword } = user
        if( name && email && password && (password === reEnterPassword)){
            console.log("api1",user);
            axios.post("http://localhost:3001/register", user)
            .then( res => {
                alert(res.data.message)
                navigate("/")
            })
        } else {
            alert("invlid input")
        }
        
    }

    return (
        <div className="Register">
            {console.log("User", user)}
            <h1>Register</h1>
            <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={ handleChange }></input>
            <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={ handleChange }></input>
            <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={ handleChange }></input>
            <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={ handleChange }></input>
            <div className="button" onClick={Register} >Register</div>
            <div>or</div>
            <div className="button" onClick={() => navigate("/")}>Login</div>
        </div>
    )
}

export default Register