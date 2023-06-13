import React, { useState } from 'react';
import Axios from "axios";

const SkillForm = () => {
  const [skillName, setSkillName] = useState('');
 // const [skillLevel, setSkillLevel] = useState('');
  const [dept, setDept] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send the form data to the backend (e.g., via API call)
    const formData = {
      skill_name: skillName,
      skill_level:  [
        {
          "level": "3",
          "name": "level 3"
        },
        {
          "level": "2",
          "name": "level 2"
        },
        {
          "level": "1",
          "name": "level 1"
        }
      ],
      dept: dept,
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


    Axios.post("http://localhost:4000/api/skills", { data: formData})
    .then(() => {
      alert("success...");
    })
    .catch(() => {
      alert("Try Again ");
    });
    // Clear the form fields after submitting
    setSkillName('');
    //setSkillLevel('');
    setDept('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="skillName">Skill Name:</label>
        <input
          type="text"
          id="skillName"
          value={skillName}
          onChange={(event) => setSkillName(event.target.value)}
          required
        />
      </div>
      
      <div>
        <label htmlFor="dept">Department:</label>
        <input
          type="text"
          id="dept"
          value={dept}
          onChange={(event) => setDept(event.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SkillForm;
