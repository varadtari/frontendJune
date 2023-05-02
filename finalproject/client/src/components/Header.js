import React from "react";



export default function Header() {
  return (

    <div
      style={{
        alignItems: "flex-end",
        justifyContent: "flex-end",
        flexDirection: "column",
        display: "flex",
        backgroundColor:"rgb(0,0,70)",
  
        padding:"10px",
        filter: "contrast(130%)"
        
        
      }}
      
    >
      <img style={{filter: "contrast(120%)"}} height="50px" src={process.env.PUBLIC_URL + "/images/rosenbergerr.png"} />
     
    </div>
  );
}



