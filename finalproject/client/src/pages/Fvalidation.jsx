import React, { useEffect, useState } from 'react';
import Axios from 'axios';

export default function Fvalidation() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const storedUserList = JSON.parse(localStorage.getItem('userList'));
    setUserList(storedUserList || []);
  }, []);

  useEffect(() => {
    generate();
  }, []);

  async function generate() {
    try {
      let response = await Axios.get('http://localhost:4000/api/excels/filter');
      let userData = response.data.data;
      userData = userData.filter((item) => item.readyForValidation && item.validated);
      setUserList(userData);
      localStorage.setItem('userList', JSON.stringify(userData));
    } catch (error) {
      console.error('error', error);
    }
  }

  async function handleApproval(e, user) {
    try {
      const updatedUser = {
        ...user,
        validated: e.target.checked,
      };

      setUserList((prevUserList) => {
        const updatedList = prevUserList.map((obj) => (obj._id === user._id ? updatedUser : obj));
        localStorage.setItem('userList', JSON.stringify(updatedList));
        return updatedList;
      });

      await Axios.put(`http://localhost:4000/api/excels/updateUser/${user._id}`, {
        validated: updatedUser.validated,
      });
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
            <th>Validation</th>
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
                  checked={obj.validated}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
