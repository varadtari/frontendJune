import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useEffect, useState } from "react";
import { Button, Space } from "antd";
import Axios from "axios";
import { add } from "date-fns";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

export default function MatrixTable({ tableData, setGeneratedData }) {
  const Navigate = useNavigate();

  const handleSkillFormClick = () => {
    Navigate("/SkillForm");
  };

  const [skillList, setSkillList] = useState([]);
  const [searchByNameQuery, setSearchByNameQuery] = useState("");
  const [searchBySkillQuery, setSearchBySkillQuery] = useState("");

  const handleSkill = (skill, index) => {
    let temp = { ...tableData[index], skills: skill };
    tableData[index] = temp;
    setGeneratedData([...tableData]);
  };

  const getSkillData = async () => {
    let skillData = await Axios.get("http://localhost:4000/api/skills");
    setSkillList(skillData.data.data);
  };

  useEffect(() => {
    getSkillData();
  }, []);

  return (
    <div>
      <br /> <br />
      <Container maxWidth="" style={{ marginBottom: "15px" }}>
        <Typography
          style={{
            backgroundColor: "white",
            border: "1px solid black",
          }}
        >
          <div>
            <input
              style={{ height: "38px", marginRight: "10px" }}
              type="text"
              value={searchByNameQuery}
              onChange={(e) => setSearchByNameQuery(e.target.value)}
              placeholder="Search by employee name..."
            />
            <input
              style={{ height: "38px" }}
              type="text"
              value={searchBySkillQuery}
              onChange={(e) => setSearchBySkillQuery(e.target.value)}
              placeholder="Search by skill name..."
            />
          </div>

          <button
            style={{
              background: "#a4afec",
              color: "black",
              position: "absolute",
              marginRight: "620px",
              marginTop:"-38px",
              right: "2px",
            }}
            onClick={handleSkillFormClick}
            className="btn my-6"
          >
            Skill Form
          </button>
          <table>
            <thead>
              <tr>
                <th style={{ width: "8%", height: "60px" }}>&nbsp; Sr No</th>
                <th style={{ width: "10%", height: "60px" }}>
                  &nbsp;Joining Date
                </th>
                <th style={{ width: "20%", height: "60px" }}>
                  &nbsp;Employee Name
                </th>
                <th style={{ width: "8%", height: "60px" }}>
                  &nbsp;&nbsp;Emp Code
                </th>
                <th style={{ width: "12%", height: "60px" }}>
                  &nbsp;Qualification
                </th>
                <th style={{ width: "12%", height: "60px" }}>
                  &nbsp;Department
                </th>
                <th style={{ width: "21%", height: "60px" }}>&nbsp;Skills</th>
              </tr>
            </thead>

            <tbody>
              {tableData &&
                tableData
                  .filter((data) =>
                    data["EMPLOYEE NAME"]
                      .toLowerCase()
                      .includes(searchByNameQuery.toLowerCase())
                  )
                  .filter((data) => {
                    if (searchBySkillQuery === "") return true;
                    return (
                      data.skills &&
                      data.skills.some((skill) =>
                        skill.skill
                          .toLowerCase()
                          .includes(searchBySkillQuery.toLowerCase())
                      )
                    );
                  })
                  .map((data, index) => (
                    <MatrixTableRow
                      data={data}
                      index={index}
                      handleSkill={handleSkill}
                      skillList={skillList}
                    />
                  ))}
            </tbody>
          </table>
        </Typography>
      </Container>
    </div>
  );
}

function MatrixTableRow({ data, index, handleSkill, skillList }) {
  const [showExtra, setShowExtra] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);

  const handleSubmit = async () => {
    if (selectedSkill && selectedLevel) {
      let tempSkills = [
        ...(data.skills || []),
        { skill: selectedSkill, level: selectedLevel },
      ];
      let response = await Axios.put(
        `http://localhost:4000/api/excels/updateUser4/${data._id}`,
        {
          skills: tempSkills,
        }
      );
      handleSkill(tempSkills, index);
      setShowExtra(false);
      setSelectedSkill("");
      setSelectedLevel("");
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleOptionChange1 = (event) => {
    setSelectedSkill(event.target.value);
  };

  const handleSkillUpdate = async (skills, currentIndex) => {
    let tempSkills = [...data.skills];
    tempSkills[currentIndex].level = skills.level;
    let response = await Axios.put(
      `http://localhost:4000/api/excels/updateUser4/${data._id}`,
      { skills: tempSkills }
    );

    handleSkill(tempSkills, index);
  };

  return (
    <>
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{data.DOJ}</td>
        <td>{data["EMPLOYEE NAME"]}</td>
        <td>{data["EMP CODE"]}</td>
        <td>{data["EDUCATION"]}</td>
        <td>{data["Dept"]}</td>
        <td>
          {data?.skills?.length ? (
            data.skills?.map((skill) => (
              <p>
                {skill.skill}({skill.level})
              </p>
            ))
          ) : (
            <p>No Skills</p>
          )}
        </td>
        <td>
          <button
            style={{
              height: "42px",
              padding: "0 16px",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "#A9A9A9",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.3s ease",
            }}
            onClick={() => setShowExtra(!showExtra)}
          >
            {showExtra ? (
              <img src={process.env.PUBLIC_URL + "/images/cross.jpg"} alt="cross" />
            ) : (
              "Add Skills+"
            )}
          </button>
        </td>
      </tr>
      {showExtra &&
        data?.skills?.length &&
        data.skills?.map((currentSkill, currentIndex) => (
          <UpdateSkill
            key={currentIndex}
            skillList={skillList}
            currentSkill={currentSkill}
            index={currentIndex}
            handleSkillUpdate={handleSkillUpdate}
            handleSkill={handleSkill}
          />
        ))}
      {showExtra && (
        <tr>
          <td colSpan="7">
            <div style={{ display: "flex" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Skill
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedSkill}
                  label="Age"
                  onChange={(e) => setSelectedSkill(e.target.value)}
                >
                  {skillList
                    ?.filter((item) => item.Dept === data.Dept)
                    .map((data) => (
                      <MenuItem value={data.skill_name}>
                        {data.skill_name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              {selectedSkill ? (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select Level
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedLevel}
                    label="Age"
                    onChange={(e) => setSelectedLevel(e.target.value)}
                  >
                    {skillList
                      .filter((item) => item.skill_name === selectedSkill)
                      ?.map((data) =>
                        data.skill_level.map((level) => (
                          <MenuItem value={level.level}>{level.level}</MenuItem>
                        ))
                      )}
                  </Select>
                </FormControl>
              ) : null}

              <div style={{ marginLeft: "110px", color: "green" }}>
                <button
                  onClick={handleSubmit}
                  style={{
                    fontSize: "13px",
                    padding: "3px 22px",
                    borderRadius: "10px",
                    backgroundColor: "rgb(06,211,79)",
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

const UpdateSkill = ({
  currentSkill,
  handleSkill,
  data,
  index,
  handleSkillUpdate,
  skillList,
}) => {
  const [updatedSkill, setUpdatedSkill] = useState(currentSkill);
  const [level, setLevel] = useState(currentSkill.level);
  const [skill, setSkill] = useState(currentSkill.skill);

  const handleDeleteSkill = async (data) => {
    try {
      const response = await Axios.delete(
        `http://localhost:4000/api/excels/deleteSkill/${data._id}/${data.skill._id}`
      );

      const updatedSkills = data.skills.filter((skill, i) => i !== index);
      handleSkill(updatedSkills, index);
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  useEffect(() => {
    let temp = skillList.filter((item) => item.skill_name === skill);
    setUpdatedSkill(temp?.[0]);
  }, [skill]);

  return (
    <tr>
      <td colSpan="7">
        <div style={{ display: "flex" }}>
          <div style={{ width: "25%" }}>
          </div>
          <div>
            <select
              value={skill}
              disabled
              onChange={(e) => setSkill(e.target.value)}
            >
              {skillList.map((item) => (
                <option value={item.skill_name}>{item.skill_name}</option>
              ))}
            </select>
            <p>Skill Name: {skill}</p>
          </div>

          <div style={{ width: "25%", marginLeft: "70px" }}>
            {" "}
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="">Select Level</option>
              {updatedSkill?.skill_level?.map((item) => (
                <option value={item.level}>{item.level}</option>
              ))}
            </select>
            <p> Skill Level: {level}</p>
          </div>
          <div style={{ width: "25%", marginLeft: "110px", color: "green" }}>
            <button
              onClick={() => handleSkillUpdate({ skill, level }, index)}
              style={{
                fontSize: "13px",
                padding: "3px 22px",
                borderRadius: "10px",
                backgroundColor: "rgb(06,211,79)",
                cursor: "pointer",
              }}
            >
              Update
            </button>
          </div>
          {/* <div style={{ width: "25%", marginLeft: "110px", color: "red" }}>
            <button
              onClick={() => handleDeleteSkill(data)}
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
          </div> */}
        </div>
      </td>
    </tr>
  );
}
