import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import generatePDF from "./generatePDF";
import Format from "./Format1";
import axios from "axios";

export default function DisplayTable({ tableData, title }) {
  const [data, setData] = useState(tableData);
  const [signature,setSignature]=useState(false);
    async function handleCheckboxChange  (id, isChecked) {
      console.log("ids",isChecked);
      setSignature(isChecked);
      console.log("ids2",data);
      const updatedTableData = data.map((dataItem) =>
        dataItem.id === id ? { ...dataItem, hasCheckbox: isChecked } : dataItem
        
      );
      setData(updatedTableData);
     
      const employeeSignatures = data.map((dataItem) => ({
          id: dataItem._id,
        
        hasCheckbox: dataItem.hasCheckbox||false,
        
      }));
      console.log("idf",employeeSignatures);
      setSignature(employeeSignatures);
      // Extract the id from the first data item (assuming it exists)
      //const id2 = data.length > 0 ? data[0]._id : "";
     // console.log("idv",id2);
  
      // Make an API call to save the checkbox state in the database
      let response=await axios
        .put(`http://localhost:4000/api/excels/check/${id}`, {hasCheckbox:isChecked})
        .then((response) => {
          console.log("Employee signatures saved successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error saving employee signatures:", error);
        });
  
  
      
    };
  
  

  const saveToDatabase = () => {
    // Extract the signature checkbox state from the table data

  };

  return (
    <div>
      <button onClick={generatePDF} className="btn my-6">
        download
      </button>
      <Container id="report" maxWidth="">
        <Typography
          style={{
            backgroundColor: "white",
            border: "1px solid black",
            maxWidth: "100%",
          }}
        >
          <div className="img">
            <img
              style={{ maxWidth: "80%", marginLeft: "100px" }}
              src={title ? title : process.env.PUBLIC_URL + "/images/heads.png"}
              alt=""
            />
          </div>
          <table>
            <tr>
              <th>Participant</th>
              <th>Area of Operation</th>
              <th>Employee Signature</th>
              <th>Date</th>
              <th>Trainer Name and Signature</th>
            </tr>
            {data &&
              data.map((dataItem) => (
                <tr key={dataItem.id}>
                  <td>{dataItem["EMPLOYEE NAME"]}</td>
                  <td>{dataItem.Dept}</td>
                  <td>
                    <input
                      type="checkbox"
                     checked ={dataItem.hasCheckbox}
                      onChange={(e) =>
                        handleCheckboxChange(
                          dataItem._id,
                          dataItem.hasCheckbox=e.target.checked
                        )
                      }
                    />
                  </td>
                  <td>{dataItem.DOJ}</td>
                  <td>{dataItem["TRAINER"]}</td>
                </tr>
              ))}
          </table>
        </Typography>
        <br />
        <div>
          <Format />
        </div>
        <button onClick={saveToDatabase}>Save</button>
      </Container>
    </div>
  );
}