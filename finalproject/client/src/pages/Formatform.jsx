import React, { useState } from 'react';
import Axios from "axios";

const FormatForm = () => {
  const [formatName, setFormatName] = useState('');
  
 // const [skillLevel, setSkillLevel] = useState('');
 const styles = {
  container: {
    marginTop:"130px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "20vh",
    
  },
  form: {
    
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "400px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    background: "#f2f2f2",
  },
  formGroup: {
    marginTop:"30px",
    margin: "10px 0",
    width: "100%",
  },
  label: {
    fontWeight: "bold",
  },
  input: {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "100%",
  },
  button: {
    
    marginTop: "20px",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    background: "#2196f3",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    background: "#1976d2",
  },
};


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
    <div style={styles.container}>
    <form onSubmit={handleSubmit}style={styles.form}>
    <div style={styles.formGroup}>
        <label htmlFor="formatName" style={styles.label}>Format Number:</label>
        <input
          type="text"
          id="formatName"
          value={formatName}
          onChange={(event) => setFormatName(event.target.value)}
          required
          style={styles.input}
        />
      </div>
      
      
      <button type="submit"style={styles.button}>Submit</button>
    </form>
    </div>
  );
};


export default FormatForm