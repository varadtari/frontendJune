import React, { useState } from 'react';
import Axios from "axios";

const FormatForm = () => {
  const [formatName, setFormatName] = useState('');
  
 // const [skillLevel, setSkillLevel] = useState('');
 

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send the form data to the backend (e.g., via API call)
    const formData = {
      FORMAT_NO: formatName,
     
    };
    // Call your backend API to save the data (e.g., using Axios, fetch, etc.)
    // Example:
    // axios.post('/api/skills', formData)
    //   .then(response => {
    //     // Handle success
    //   })
    //   .catch(error => {
    //     // Handle error
    //   });
    
    Axios.post("http://localhost:4000/api/excels/format", { data: formData})
    .then(() => {
      alert("success...");
    })
    .catch(() => {
      alert("Try Again ");
    });
   
   
    // Clear the form fields after submitting
    setFormatName('');
    //setSkillLevel('');
   
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="formatName">Format Number:</label>
        <input
          type="text"
          id="formatName"
          value={formatName}
          onChange={(event) => setFormatName(event.target.value)}
          required
        />
      </div>
      
      
      <button type="submit">Submit</button>
    </form>
  );
};


export default FormatForm