import React, { useEffect, useState } from 'react';
import Axios from 'axios';

export default function Pvalidation() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    // Load the checkbox state from local storage on component mount
    const storedUserList = JSON.parse(localStorage.getItem('userList'));
    setUserList(storedUserList || []);
  }, []);

  async function generate() {
    try {
      let response = await Axios.get('http://localhost:4000/api/excels/filter');
      let userData = response.data.data;
      userData = userData.map((item) => {
        const skillsDone = item.skills.filter((skill) => skill.level === '3.Can work independently');
        return {
          ...item,
          readyForValidationTemp: item.skills.length > 0 && item.skills.length === skillsDone.length,
          validated: false,
         
        };
      });
      setUserList(userData);
      // Save the updated checkbox state to local storage
      localStorage.setItem('userList', JSON.stringify(userData));
    } catch (error) {
      console.error('error', error);
    }
  }

  useEffect(() => {
    generate();
  }, []);

  async function handleSValidation(e, user) {
    try {
      const updatedUser = {
        ...user,
        readyForValidationTemp: e.target.checked,
      };
  
      setUserList((prevUserList) => {
        const updatedUserList = prevUserList.map((obj) => (obj._id === user._id ? updatedUser : obj));
        localStorage.setItem('userList', JSON.stringify(updatedUserList));
        return updatedUserList;
      });
    } catch (error) {
      console.error('error', error);
    }
  }
  
  async function handleFValidation(e, user) {
    try {
      const updatedUser = {
        ...user,
        validated: e.target.checked,
      };
  
      setUserList((prevUserList) => {
        const updatedUserList = prevUserList.map((obj) => (obj._id === user._id ? updatedUser : obj));
        localStorage.setItem('userList', JSON.stringify(updatedUserList));
        return updatedUserList;
      });
    } catch (error) {
      console.error('error', error);
    }
  }
  
  
  return (
    <div>
      <h2>Validation</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>S Validation</th>
            <th>F Validation</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((obj, count) => (
            <tr key={count}>
              <td>{count}</td>
              <td>{obj['EMPLOYEE NAME']}</td>
              <td>
                {obj.skills.some((skill) => skill.level === '2.Trained and can work under observation'|| skill.level === '3.Can work independently') ? (
                  <input
                    onChange={(e) => handleSValidation(e, obj)}
                    type="checkbox"
                    checked={obj.readyForValidationTemp}
                  />
                ) : (
                  <input
                    onChange={(e) => handleSValidation(e, obj)}
                    type="checkbox"
                    checked={false}
                    disabled
                  />
                )}
              </td>
              <td>
                {obj.readyForValidationTemp ? (
                  <input onChange={(e) => handleFValidation(e, obj)} type="checkbox" checked={obj.validated} />
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
}


