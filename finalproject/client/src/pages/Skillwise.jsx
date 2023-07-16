// import React, { useEffect, useState } from "react";
// import Axios from "axios";

// import {
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   Typography,
// } from "@material-ui/core";

// export default function Skillwise() {
//   const [skillList, setSkillList] = useState([]);
//   const [selectedDepartment, setSelectedDepartment] = useState("");
//   const [employees, setEmployees] = useState([]);

//   useEffect(() => {
//     getSkillData();
//   }, []);

//   const getSkillData = async () => {
//     try {
//       const response = await Axios.get("http://localhost:4000/api/skills");
//       setSkillList(response.data.data);
//     } catch (error) {
//       console.error("Error fetching skill data:", error);
//     }
//   };

//   const handleDepartmentChange = (event) => {
//     setSelectedDepartment(event.target.value);
//   };

//   const filterEmployeesByLevel = (level) => {
//     // Filter employees based on the selected department and skill level
//     const filteredEmployees = tableData.filter(
//       (employee) =>
//         employee["Dept"] === selectedDepartment &&
//         (employee.skills?.some((skill) => skill.level === level) || false)
//     );
//     setEmployees(filteredEmployees);
//   };

//   return (
//     <div>
//       <Typography variant="h4">Skill View Page</Typography>
//       <FormControl>
//         <InputLabel id="department-label">Select Department</InputLabel>
//         <Select
//           labelId="department-label"
//           value={selectedDepartment}
//           onChange={handleDepartmentChange}
//         >
//           {skillList.map((skill) => (
//             <MenuItem key={skill.Dept} value={skill.Dept}>
//               {skill.Dept}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//       <div>
//         <Typography variant="h6">Employees on Level 3</Typography>
//         {employees
//           .filter((employee) =>
//             employee.skills?.some((skill) => skill.level === 3)
//           )
//           .map((employee) => (
//             <p key={employee._id}>{employee["EMPLOYEE NAME"]}</p>
//           ))}
//       </div>
//       <div>
//         <Typography variant="h6">Employees on Level 4</Typography>
//         {employees
//           .filter((employee) =>
//             employee.skills?.some((skill) => skill.level === 4)
//           )
//           .map((employee) => (
//             <p key={employee._id}>{employee["EMPLOYEE NAME"]}</p>
//           ))}
//       </div>
//     </div>
//   );
// }
