import React, { useEffect, useState } from "react";
import Axios from "axios";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Button, Space } from "antd";
import { add } from "date-fns";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import {isTrainer} from "./Login";

export default function Pvalidation({ tableData, setGeneratedData, data }) {
  const [userList, setUserList] = useState([]);
  const [skillList, setSkillList] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const handleSkill = (skill, index) => {
    let temp = { ...tableData[index], skills: skill };
    tableData[index] = temp;
    setGeneratedData([...tableData]);
  };
  const getSkillData = async () => {
    let skillData = await Axios.get("http://localhost:4000/api/skills");
    console.log("test", skillData);
    setSkillList(skillData.data.data);
  };

  //  useEffect(()=>{getSkillData()},[])
  useEffect(() => {
    generate();
    getSkillData();
  }, []);
  useEffect(() => {
    console.log("skill", selectedSkill);
  }, [selectedSkill]);

  async function generate() {
    try {
      let response = await Axios.get("http://localhost:4000/api/excels/filter");
      let userData = response.data.data;
      console.log("data1",userData);
      userData=userData.filter((item)=>{
        let count=0;
        item.skills.forEach(skill=>{if(skilltest.includes(skill.level))count+=1})
        return !!count
      })

      // userData = userData.map((item) => {
      //   const skillsDone = item.skills.filter(
      //     (skill) => skill.level === "3.Can work independently"
      //   );
      //   return {
      //     ...item,
      //     readyForValidationTemp:
      //       item.skills.length > 0 && item.skills.length === skillsDone.length,
      //     validated: false,
      //     dropdownValue: "",
      //   };
      // });
      console.log("data1",userData);
      setUserList(userData);
      // Save the updated checkbox state to local storage
      localStorage.setItem("userList", JSON.stringify(userData));
    } catch (error) {
      console.error("error", error);
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

  async function handleFValidation(e, user) {
    try {
      const updatedUser = {
        ...user,
        validated: e.target.checked,
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

  function handleDropdownChange(e, user) {
    const updatedUser = {
      ...user,
      dropdownValue: e.target.value,
    };

    setUserList((prevUserList) => {
      const updatedUserList = prevUserList.map((obj) =>
        obj._id === user._id ? updatedUser : obj
      );
      localStorage.setItem("userList", JSON.stringify(updatedUserList));
      return updatedUserList;
    });
  }
  const handleApproval=async (userid,currentSkill,index,allSkills)=>{
    let tempSkills=allSkills
    tempSkills[index]=currentSkill
    let response=await Axios.put(`http://localhost:4000/api/excels/updateUser/${userid}`,{skills:tempSkills})
  }
  console.log("isTrainer value",!isTrainer())
  return (
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
              <td>{obj.skills.map((skills,count)=>{
                if(!skilltest.includes(skills.level)) return <p>test</p>
                return <div>
                  {`${skills.skill}(${skills.level})`}
                  <input type="checkbox" onChange={(e)=>{handleApproval(obj._id,{...skills,approve:e.target.checked},count,obj.skills)}}></input>
                  {skills.approve && isTrainer()?<button>Approve</button>:null}
                </div>
              })}
                {/* <select
                  value={obj.dropdownValue}
                  onChange={(e) => handleDropdownChange(e, obj)}
                >
                  <option value="">Select an option</option>
                  <option
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedSkill}
                    onChange={(e) => setSelectedSkill(e.target.value)}
                  >
                    {skillList?.map((data) => (
                      <MenuItem value={data.skill_name}>
                        {data.skill_name}
                      </MenuItem>
                    ))}
                  </option>
                </select> */}
                {/* {obj.dropdownValue &&
                obj.skills.some(
                  (skill) =>
                    skill.level ===
                      "2.Trained and can work under observation" ||
                    skill.level === "3.Can work independently"
                ) ? (
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
                {obj.readyForValidationTemp ? (
                  <input
                    onChange={(e) => handleFValidation(e, obj)}
                    type="checkbox"
                    checked={obj.validated}
                  />
                ) : null} */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
let skilltest=["3.Can work independently","2.Trained and can work under observation"]