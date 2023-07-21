import * as React from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateRangePicker } from "react-date-range";
import Axios from "axios";
import Viewtable from "./Viewtable";
import MatrixTable from "./MatrixTable";

const Matrix = () => {
  const [dept, setDept] = React.useState("");
  const [loading, setLoading] = React.useState("");
  const [generated, setGenerated] = React.useState(false);
  const [date, setDate] = React.useState({
    startDate: "",
    endDate: "",
  });
  const [generatedData, setGeneratedData] = React.useState([]);
  const [departments, setDepartments] = React.useState([]);
  
  React.useEffect(() => {
    // Fetch the departments from the Excel model in the backend
    Axios.get('http://localhost:4000/api/excels/departments') // Replace with your backend endpoint
      .then((response) => {
        // Extract unique department names from the response

        setDepartments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching departments:', error);
      });
  }, []);
  
  async function generate() {
    try {
      setLoading(true);
      let response = await Axios.get(
        `http://localhost:4000/api/excels/filter?${dept && `dept=${dept}&`}${
          date.startDate &&
          date.endDate &&
          `fromDate=${date.startDate}&toDate=${date.endDate}`
        }`
      );
      if (!response.data.status) {
        setLoading(false);
        return;
      }

      setLoading(false);
      setGeneratedData(response.data.data);
      setGenerated(true);
    } catch (error) {}
  }
 
  return (

    
    <div className="calender">
      <div>
        <h2 style={{background: '-webkit-linear-gradient(left, blue, red)', WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent', fontWeight: "bold"}} >SKILL MATRIX</h2>
      </div>
      <div className="d-flex">
        <div>
          <p>From Date</p>
          <input
            type="date"
            onChange={(e) => setDate({ ...date, startDate: e.target.value })}
            max={date.endDate}
            value={date.startDate}
          />
        </div> 
        <div>
          <p>End Date</p>
          <input
            disabled={!date.startDate}
            onChange={(e) => setDate({ ...date, endDate: e.target.value })}
            type="date"
            min={date.startDate}
            value={date.endDate}
          />
        </div>
      </div>
      <br></br>
      <div>
        <p>Choose Dept</p>
        <select
          id="selectsuccess"
          className="box"
          name="designation"
          onChange={(e) => setDept(e.target.value)}
        >
         <option value="">Select a department</option>
            {departments.map((department, index) => (
              <option key={index} value={department}>
                {department}
              </option>
            ))}
        </select>
      </div>
      <button className="mt-4" disabled={loading} onClick={generate}>
        {generated ? "Generated" : "Generate"}
      </button>
    
      {generated && generatedData ? (
        <MatrixTable tableData={generatedData}setGeneratedData={setGeneratedData}/>
      ) : null}
    </div>
  );
};
const options = [
  { value: "", show: "All" },
  { value: "FO", show: "FO" },
  { value: "STORE", show: "STORE" },
  { value: "POWER", show: "POWER" },
  { value: "RF", show: "RF" },
  { value: "ENTERPRISE", show: "ENTERPRISE" },
  { value: "OFC", show: "OFC" },
  { value: "AISG", show: "AISG" },
  { value: "AUTOMOTIVE", show: "AUTOMOTIVE" },

];
export default Matrix;