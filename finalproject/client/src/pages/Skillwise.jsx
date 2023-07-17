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
//   const [date, setDate] = useState({
//     startDate: "",
//     endDate: "",
//   });
//   const [userList, setUserList] = useState([]);
//   const [generated, setGenerated] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [skillList, setSkillList] = useState([]);
//   const [selectedDepartment, setSelectedDepartment] = useState("");
//   const [employees, setEmployees] = useState([]);
//   let skilltest = [
//     "4.Can train others",
//     "3.Can work independently",
//     "2.Trained and can work under observation",
//   ];

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

//   async function generate() {
//     try {
//       setLoading(true);
//       let response = await Axios.get(
//         `http://localhost:4000/api/excels/filter?${date.startDate &&
//           date.endDate &&
//           `fromDate=${date.startDate}&toDate=${date.endDate}`}`
//       );

//       let userData = response.data.data;
//       userData = userData.filter((item) => {
//         let count = 0;
//         item.skills.forEach((skill) => {
//           if (
//             skilltest.includes(skill.level) &&
//             skill.skillId === selectedDepartment
//           ) {
//             count += 1;
//           }
//         });
//         return count > 0;
//       });

//       setUserList(userData);
//       setLoading(false);
//       setGenerated(true);
//     } catch (error) {
//       console.error("Error generating data:", error);
//       setLoading(false);
//     }
//   }

//   return (
//     <div>
//       <div className="calender">
//         <h2
//           style={{
//             background: '-webkit-linear-gradient(left, blue, red)',
//             WebkitBackgroundClip: 'text',
//             WebkitTextFillColor: 'transparent',
//             fontWeight: "bold"
//           }}
//         >
//           Validation
//         </h2>
//         <div className="d-flex">
//           <div>
//             <p>from date</p>
//             <input
//               type="date"
//               onChange={(e) => setDate({ ...date, startDate: e.target.value })}
//               max={date.endDate}
//               value={date.startDate}
//             />
//           </div>
//           <div>
//             <p>end date</p>
//             <input
//               disabled={!date.startDate}
//               onChange={(e) => setDate({ ...date, endDate: e.target.value })}
//               type="date"
//               min={date.startDate}
//               value={date.endDate}
//             />
//           </div>
//         </div>
//         <button className="mt-4" onClick={generate} disabled={loading}>
//           {loading ? "Generating..." : generated ? "Generated" : "Generate"}
//         </button>
//       </div>

//       <FormControl>
//         <InputLabel>Select Department</InputLabel>
//         <Select value={selectedDepartment} onChange={handleDepartmentChange}>
//           <MenuItem value="dept1">FO</MenuItem>
//           <MenuItem value="dept2">Department 2</MenuItem>
//           <MenuItem value="dept3">Department 3</MenuItem>
//           {/* Add more departments as needed */}
//         </Select>
//       </FormControl>

//       {generated ? (
//         <div>
//           <table>
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Name</th>
//                 <th colSpan={2}>Skills</th>
//               </tr>
//             </thead>
//             <tbody>
//               {userList.map((obj, count) => (
//                 <tr key={count}>
//                   <td>{count}</td>
//                   <td>{obj["EMPLOYEE NAME"]}</td>
//                   <td>
//                     {obj.skills.map((skills, count) => {
//                       if (
//                         !skilltest.includes(skills.level) 
//                       ) {
//                         return (
//                           <div key={count}>
//                             {`${skills.skill}(${skills.level})`}
//                           </div>
//                         );
//                       }
//                       return null;
//                     })}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : null}
//     </div>
//   );
// }
