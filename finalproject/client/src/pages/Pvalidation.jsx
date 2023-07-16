import React, { useState, useEffect } from "react";
import Axios from "axios";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Button, Space } from "antd";
import { add } from "date-fns";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { isTrainer } from "../App";

export default function Pvalidation({ tableData, setGeneratedData, data }) {
  const [date, setDate] = useState({
    startDate: "",
    endDate: "",
  });
  const [userList, setUserList] = useState([]);
  const [skillList, setSkillList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const handleSkill = (skill, index) => {
    let temp = { ...tableData[index], skills: skill };
    tableData[index] = temp;
    setGeneratedData([...tableData]);
  };

  const handleApproval = async (userid, currentSkill, index, allSkills) => {
    let tempSkills = allSkills;
    tempSkills[index] = currentSkill;
    let response = await Axios.put(
      `http://localhost:4000/api/excels/updateUser/${userid}`,
      { skills: tempSkills }
    );
  };

  const getSkillData = async () => {
    try {
      let skillData = await Axios.get("http://localhost:4000/api/skills");
      setSkillList(skillData.data.data);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  const [isChecked, setIsChecked] = useState(false);
  const [isSecondCheckboxChecked, setIsSecondCheckboxChecked] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem('checkboxState');
    if (savedState) {
      const { isChecked, isSecondCheckboxChecked } = JSON.parse(savedState);
      setIsChecked(isChecked);
      setIsSecondCheckboxChecked(isSecondCheckboxChecked);
    }
  }, []);

  useEffect(() => {
    const stateToSave = JSON.stringify({
      isChecked,
      isSecondCheckboxChecked
    });
    localStorage.setItem('checkboxState', stateToSave);
  }, [isChecked, isSecondCheckboxChecked]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSecondCheckboxChange = () => {
    setIsSecondCheckboxChecked(!isSecondCheckboxChecked);
  };

  useEffect(() => {
    getSkillData();
  }, []);

  async function generate() {
    try {
      setLoading(true);
      let response = await Axios.get(
        `http://localhost:4000/api/excels/filter?${date.startDate &&
        date.endDate &&
        `fromDate=${date.startDate}&toDate=${date.endDate}`
        }`
      );

      let userData = response.data.data;
      userData = userData.filter((item) => {
        let count = 0;
        item.skills.forEach((skill) => {
          if (skilltest.includes(skill.level)) count += 1;
        });
        return !!count;
      });

      setUserList(userData);
      localStorage.setItem("userList", JSON.stringify(userData));
      setLoading(false);
      setGenerated(true);
    } catch (error) {
      console.error("Error generating data:", error);
      setLoading(false);
    }
  }

  async function handleSValidation(e, user) {
    try {
      const updatedUser = {
        ...user,
        readyForValidationTemp: e.target.checked,
      };

      setUserList((prevUserList) => {
        const updatedUserList = prevUserList.map((obj) =>
          obj._id === user._id ? updatedUser : obj
        );
        localStorage.setItem("userList", JSON.stringify(updatedUserList));
        return updatedUserList;
      });
    } catch (error) {
      console.error("error", error);
    }
  }

  return (
    <div>
      <div className="calender">
        <div className="d-flex">
          <div>
            <p>from date</p>
            <input
              type="date"
              onChange={(e) => setDate({ ...date, startDate: e.target.value })}
              max={date.endDate}
              value={date.startDate}
            />
          </div>
          <div>
            <p>end date</p>
            <input
              disabled={!date.startDate}
              onChange={(e) => setDate({ ...date, endDate: e.target.value })}
              type="date"
              min={date.startDate}
              value={date.endDate}
            />
          </div>
        </div>
        <button className="mt-4" onClick={generate} disabled={loading}>
          {loading ? "Generating..." : generated ? "Generated" : "Generate"}
        </button>
      </div>

      {generated && (
        <div>
          <h2>Validation</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th colSpan={2}>Skills</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((obj, count) => (
                <tr key={count}>
                  <td>{count}</td>
                  <td>{obj["EMPLOYEE NAME"]}</td>
                  <td>
                    {obj.skills.map((skills, index) => {
                      if (!skilltest.includes(skills.level)) return <p>test</p>;
                      return (
                        <div key={index}>
                          {`${skills.skill}(${skills.level})`}
                          <input
                            type="checkbox"
                            checked={isChecked[index]}
                            onChange={(e) => {
                              handleApproval(
                                obj._id,
                                { ...skills, approve: !skills.approve },
                                index,
                                obj.skills
                              );
                              // handleCheckboxChange(index);
                            }}
                          />
                          {console.log("ischecked",isChecked)}
                          {isChecked && (
                            <input
                              type="checkbox"
                              checked={isChecked[index]}
                              onChange={(e) => {
                              handleApproval(
                                obj._id,
                                { ...skills, approve: !skills.approve },
                                index,
                                obj.skills
                              );
                              // handleCheckboxChange(index);
                            }}
                            />
                          )}
                          {skills.approve && isTrainer() ? (
                            <button>Approve</button>
                          ) : null}
                        </div>
                      );
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

let skilltest = [
  "3.Can work independently",
  "2.Trained and can work under observation",
]