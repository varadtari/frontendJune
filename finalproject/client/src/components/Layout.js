import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'


export default function Layout({children}) {
  const navigate=useNavigate()
   useEffect(function() {
    let token=localStorage.getItem("token")
    if(!token){navigate("/")}
   },[])
  return (
    <div style={{display:"flex"}}><Sidebar/>
    {children}</div>
  )
}
