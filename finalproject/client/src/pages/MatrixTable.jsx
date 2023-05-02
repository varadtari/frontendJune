import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useEffect, useState } from "react";
import { Button, Space } from "antd";
import Axios from "axios";
import { add } from "date-fns";


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
  const [addSkill, setAddSkill] = useState([]);
 const handleSkill=(skill,index)=>{
  let temp={...tableData[index],skills:skill}
  tableData[index]=temp
  setGeneratedData([...tableData])
 }
 const getSkillData=async()=>{
  let skillData=await Axios.get("http://localhost:4000/api/skills")
  console.log("test",skillData);
  setAddSkill(skillData.data.data);
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
                <th>Company</th>
                <th>Skills</th>
              </tr>
            </thead>
            <tbody>
              {tableData &&
                tableData.map((data, index) => (
                  <MatrixTableRow data={data} index={index} handleSkill={handleSkill} addSkill={addSkill}/>
                ))}
            </tbody>
          </table>
        </Typography>
      </Container>
    </div>
  );
}

function MatrixTableRow({ data, index,handleSkill,addSkill}) {
  const [showExtra, setShowExtra] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const[selectedSkill,setSelectedSkill]=useState({});

  const handleSubmit=()=>{
    let tempSkills=[...(data.skills || []),{skill:selectedOption,level:selectedOption1}]
    handleSkill(tempSkills,index)
  };


  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const [selectedOption1, setSelectedOption1] = useState("");

  const handleOptionChange1 = (event) => {
    // setSelectedOption1(event.target.value);
    setSelectedSkill(event.target.value);
    console.log("",event.target.value);
  };
  const handleSkillUpdate=(skills,currentIndex)=>{
    let tempSkills=data.skills
    tempSkills[currentIndex]=skills
    handleSkill(tempSkills,index)
  }
 
  return (
    <>
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{data.DOJ}</td>
        <td>{data["EMPLOYEE NAME"]}</td>
        <td>{data["EMP CODE"]}</td>
        <td>{data["EDUCATION"]}</td>
        <td>{data["CONTRACTOR"]}</td>
        <td>{data?.skills?.length ?data.skills.map(skill=><p>{skill.skill+`(${skill.level})`}</p>):"No Skills"}</td>
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
        data.skills.map((currentSkill,currentIndex)=><UpdateSkill currentSkill={currentSkill} index={currentIndex} handleSkillUpdate={handleSkillUpdate}/>)
      )}
      {showExtra && (
        <tr>
          <td colSpan="7">
            <div style={{ display: "flex" }}>
              <div>
                <select value={selectedOption} onChange={handleOptionChange1}>
                  <option value="">Skill Level</option>
                  {/* <option value="Under Training"> 1-Under Training</option>
                  <option value="Trained and can work under observation">
                    2-Trained and can work under observation{" "}
                  </option>
                  <option value="Can work independently">
                    {" "}
                    3-Can work independently
                  </option>
                  <option value="Can trained others">
                    {" "}
                    4-Can trained others
                  </option> */}
                {
                  selectedOption?.skill_level?.map((data)=><option value={data}>{data.name}</option>)
                }
                </select>
                <p>Skill Level: {selectedOption}</p>
              </div>

              <div style={{ marginLeft: "70px" }}>
                {" "}
                <select value={selectedSkill} onChange={handleOptionChange1}>
                <option value="">Select Skill</option>
                  {/* <option value="">Select Skill</option>
                  <option value="Skill-1"> Skill-1</option>
                  <option value="Skill-2">Skill-2 </option>
                  <option value="Skill-3"> Skill-3</option>
                  <option value="Skill-4"> Skill-4</option> */}
                  {
                    addSkill.map((data)=><option value={data}>{data.skill_name}</option>)
                  }
                </select>
                <p> Skill Name: {selectedOption1}</p>
              </div>
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
const UpdateSkill=({currentSkill,index,handleSkillUpdate})=>{
  const[level,setLevel]=useState(currentSkill.level)
  const[skill,setSkill]=useState(currentSkill.skill)
  return <tr>
  <td colSpan="7">
    <div style={{ display: "flex" }}>
      <div>
        <select value={currentSkill.skill} onChange={e =>setSkill(e.target.value)}>
          <option value="">Skill Level</option>
          <option value="Under Training"> 1-Under Training</option>
          <option value="Trained and can work under observation">
            2-Trained and can work under observation{" "}
          </option>
          <option value="Can work independently">
            {" "}
            3-Can work independently
          </option>
          <option value="Can trained others">
            {" "}
            4-Can trained others
          </option>
        </select>
        <p>Skill Level: {level}</p>
      </div>

      <div style={{ marginLeft: "70px" }}>
        {" "}
        <select value={currentSkill.level} onChange={e =>setLevel(e.target.value)}>
          <option value="">Select Skill</option>
          <option value="Skill-1"> Skill-1</option>
          <option value="Skill-2">Skill-2 </option>
          <option value="Skill-3"> Skill-3</option>
          <option value="Skill-4"> Skill-4</option>
        </select>
        <p> Skill Name: {skill}</p>
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
    </div>
  </td>
</tr>
}