import React, { useState } from 'react';
import Axios from "axios";

const SkillForm = () => {
  const [skillName, setSkillName] = useState('');
  const [dept, setDept] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send the form data to the backend (e.g., via API call)
    const formData = {
      skill_name: skillName,
      skill_level:  [
        {
          "level": "4.Can train others",
          "name": "Can train others"
        },
       
       
        {
          "level": "3.Can work independently",
          "name": "Can work independently"
        },
        {
          "level": "2.Trained and can work under observation",
          "name": "Trained and can work under observation"
        },
        {
          "level": "1.Under Training",
          "name": "Under Training"
        }
      ],
      Dept: dept,
    };

    Axios.post("http://localhost:4000/api/skills", { data: formData})
    .then(() => {
      alert("Success!");
    })
    .catch(() => {
      alert("Try Again");
    });

    // Clear the form fields after submitting
    setSkillName('');
    setDept('');
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "50vh",
      
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

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="skillName" style={styles.label}>
            Skill Name:
          </label>
          <input
            type="text"
            id="skillName"
            value={skillName}
            onChange={(event) => setSkillName(event.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="dept" style={styles.label}>
            Department:
          </label>
          <input
            type="text"
            id="dept"
            value={dept}
            onChange={(event) => setDept(event.target.value)}
            required
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SkillForm;