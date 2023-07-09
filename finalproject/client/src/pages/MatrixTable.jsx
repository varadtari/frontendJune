import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useEffect, useState } from "react";
import { Button, Space } from "antd";
import Axios from "axios";
import { add } from "date-fns";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";


export default function MatrixTable({ tableData,setGeneratedData }) {
  // const [showExtendableRows, setShowExtendableRows] = useState(
  //   new Array(tableData.length).fill(false)
  // );

  // const handleExtendButtonClick = (index) => {
  //   setShowExtendableRows(
  //     showExtendableRows.map((value, i) => (i === index ? !value : value))
  //   );
  // };

  // const [selectedOption, setSelectedOption] = useState("");

  // const handleOptionChange = (event) => {
  //   setSelectedOption(event.target.value);
  // };

  // const [selectedOption1, setSelectedOption1] = useState("");

  // const handleOptionChange1 = (event) => {
  //   setSelectedOption1(event.target.value);
  // };
  const [skillList,setSkillList]=useState([]);
  
 const handleSkill=(skill,index)=>{
  let temp={...tableData[index],skills:skill}
  tableData[index]=temp
  setGeneratedData([...tableData])
 }
 const getSkillData=async()=>{
  let skillData=await Axios.get("http://localhost:4000/api/skills")
  console.log("test",skillData);
  setSkillList(skillData.data.data);
 }
 useEffect(()=>{getSkillData()},[])
  return (
    <div>
      <Container maxWidth="">
        <Typography
          style={{
            backgroundColor: "white",
            border: "1px solid black",
          }}
        >
          <table>
            <thead>
              <tr>
                <th>Sr No</th>
                <th>Joining Date</th>
                <th>Employee Name</th>
                <th>Emp Code</th>
                <th>Qualification</th>
                <th>Department</th>
                <th>Skills</th>
              </tr>
            </thead>
            <tbody>
              {tableData &&
                tableData.map((data, index) => (
                  <MatrixTableRow data={data} index={index} handleSkill={handleSkill} skillList={skillList}/>
                ))}
            </tbody>
          </table>
        </Typography>
      </Container>
    </div>
  );
}

function MatrixTableRow({ data, index,handleSkill,skillList}) {
  const [showExtra, setShowExtra] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const[selectedSkill,setSelectedSkill]=useState(null);
  const [selectedLevel,setSelectedLevel]=useState(null);

  const handleSubmit = async () => {
    if (selectedSkill && selectedLevel) {
      let tempSkills = [...(data.skills || []), { skill: selectedSkill, level: selectedLevel }];
      let response = await Axios.put(`http://localhost:4000/api/excels/updateUser/${data._id}`, {
        skills: tempSkills,
      });
      handleSkill(tempSkills, index);
      setShowExtra(false);
      setSelectedSkill("");
      setSelectedLevel("");
    }
  };


  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  
  const [selectedOption1, setSelectedOption1] = useState("");

  const handleOptionChange1 = (event) => {
    // setSelectedOption1(event.target.value);
    setSelectedSkill(event.target.value);
    console.log("testskill",event.target.value);
  };
  const handleSkillUpdate=async(skills,currentIndex)=>{
    let tempSkills=data.skills
    tempSkills[currentIndex]=skills
    let response=await Axios.put(`http://localhost:4000/api/excels/updateUser/${data._id}`,{skills:tempSkills})
 
    handleSkill(tempSkills,index)
  }
  useEffect(()=>{
console.log("skill", selectedSkill);
  },[selectedSkill])
 
  return (
    <>
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{data.DOJ}</td>
        <td>{data["EMPLOYEE NAME"]}</td>
        <td>{data["EMP CODE"]}</td>
        <td>{data["EDUCATION"]}</td>
        <td>{data["Dept"]}</td>
        <td>{data?.skills?.length ?data.skills?.map(skill=><p>{skill.skill+`(${skill.level})`}</p>):"No Skills"}</td>
        <td>
          <button style={{ height: "42px" }} onClick={() => setShowExtra(!showExtra)}>
            {showExtra ? (
              <img src={process.env.PUBLIC_URL + "/images/cross.jpg"} />
            ) : (
              "Add Skills+"
            )}
          </button>
        </td>
      </tr> 
      {showExtra && data?.skills?.length && (
        data.skills?.map((currentSkill,currentIndex)=><UpdateSkill skillList={skillList}  currentSkill={currentSkill} index={currentIndex} handleSkillUpdate={handleSkillUpdate}  handleSkill={handleSkill} />)
      )}
      {showExtra && (
        <tr>
          <td colSpan="7">
            <div style={{ display: "flex" }}>
           
            <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Select Skill</InputLabel>
  <Select
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  value={selectedSkill}
  label="Age"
  onChange={(e) => setSelectedSkill(e.target.value)}
>
  {skillList
    ?.filter((item) => item.Dept === data.Dept) // Filter skills based on Dept field
    .map((data) => (
      <MenuItem value={data.skill_name}>{data.skill_name}</MenuItem>
    ))}
</Select>
</FormControl>

{
  selectedSkill?
  <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Select Level</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={selectedLevel}
    label="Age"
    onChange={(e)=>setSelectedLevel(e.target.value)}
  >{skillList.filter(item=>{console.log("check", item.skill_name== selectedSkill);return item.skill_name==selectedSkill})?.[0]?.skill_level?.map((data)=><MenuItem value={data.level}>{data.level}</MenuItem>) }
    
  </Select>
</FormControl>
:null
}

              {/* <div style={{ marginLeft: "70px" }}>
                {" "}
                <select value={selectedSkill} onChange={handleOptionChange1}>
                <option value="">Select Skill</option>

                  {
                    skillList?.map((data)=><option value={data}>{data.skill_name}</option>)
                  }
                </select>
                <p> Skill Name: {selectedOption1}</p>
              </div>
            */}
              <div style={{ marginLeft: "110px", color: "green" }}>
                <button onClick={handleSubmit}
                  style={{
                    fontSize: "13px",
                    padding: "3px 22px",
                    borderRadius: "10px",
                    backgroundColor: " rgb(06,211,79)",
                    cursor: "pointer",
                  }}
                >
                  Done
                </button>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
const UpdateSkill=({currentSkill,handleSkill,data,index,handleSkillUpdate,skillList})=>{
  const[updatedSkill,setUpdatedSkill]=useState(currentSkill)
  const[level,setLevel]=useState(currentSkill.level)
  const[skill,setSkill]=useState(currentSkill.skill)
  const handleDeleteSkill = async (data) => {
    try {
      // Make an API request to delete the skill
      const response = await Axios.delete(`http://localhost:4000/api/excels/deleteSkill/${data._id}/${data.skill._id}`);
      // Handle the response as needed
      
      // Remove the skill from the skills array
      const updatedSkills = data.skills.filter((skill, i) => i !== index);
      handleSkill(updatedSkills, index);
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };
  useEffect(()=>{ 
    let temp =skillList.filter(item=>item.skill_name==skill)
    console.log("test6",skill,temp)
    setUpdatedSkill(temp?.[0])
  },[skill])
 
  return <tr>
  <td colSpan="7">
    <div style={{ display: "flex" }}>
      <div>
        <select value={skill} disabled onChange={e =>setSkill(e.target.value)}>
         { skillList.map((item)=><option value={item.skill_name}>
          {  item.skill_name}
          </option>)}
          
        </select>
        <p>Skill Name: {skill}</p>
      </div>

      <div style={{ marginLeft: "70px" }}>
        {" "}
        <select value={level} onChange={e =>setLevel(e.target.value)}>
          <option value="">Select Level</option>
          { updatedSkill?.skill_level?.map((item)=><option value={item.level}>
          {  item.level}
          </option>)}
          
        </select>
        <p> Skill Level: {level}</p>
      </div>
      <div style={{ marginLeft: "110px", color: "green" }}>
        <button onClick={()=>handleSkillUpdate({skill,level},index)}
          style={{
            fontSize: "13px",
            padding: "3px 22px",
            borderRadius: "10px",
            backgroundColor: " rgb(06,211,79)",
            cursor: "pointer",
          }}
        >
          Update
        </button>
      </div>
      <div style={{ marginLeft: "110px", color: "red" }}>
        <button
          onClick={()=>handleDeleteSkill(data)}
          style={{
            fontSize: "13px",
            padding: "3px 22px",
            borderRadius: "10px",
            backgroundColor: "red",
            color: "white",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>


    </div>
  </td>
</tr>
}