import React, { useEffect, useState } from 'react';
import Axios from 'axios';

export default function Fvalidation() {
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
      userData = userData.filter((item) => item.readyForValidation);
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

  async function handleApproval(e, user) {
    try {
      // Update the validated field in the user object
      user.validated = e.target.checked;
      setUserList((prevUserList) => {
        // Update the userList state with the modified user object
        const updatedUserList = prevUserList.map((obj) => (obj._id === user._id ? user : obj));
        // Save the updated checkbox state to local storage
        localStorage.setItem('userList', JSON.stringify(updatedUserList));
        return updatedUserList;
      });

      // Send the updated user object to the backend API
      await Axios.put(`http://localhost:4000/api/excels/updateUser/${user._id}`, { validated: user.validated });
    } catch (error) {
      console.error('error', error);
    }
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Approval</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((obj, count) => (
            <tr key={count}>
              <td>{count}</td>
              <td>{obj['EMPLOYEE NAME']}</td>
              <td>
                <input
                  onChange={(e) => handleApproval(e, obj)}
                  className=""
                  type="checkbox"
                  checked={obj.validated} // Bind the checkbox state to the validated field
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
