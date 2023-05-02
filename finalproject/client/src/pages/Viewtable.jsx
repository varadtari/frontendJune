import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

export default function Viewtable({ tableData }) {
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
            <tr>
              <th>Participant</th>
              <th>Area of Operation</th>
              <th>Employee Signature</th>
              <th>Date</th>
              <th>Trainer Name and Signature</th>
            </tr>
            {tableData &&
              tableData.map((data) => (
                <tr>
                  <td>{data["EMPLOYEE NAME"]}</td>
                  <td>{data.Dept}</td>
                  <td>{data["EMPLOYEE NAME"]}</td>
                  <td>{data.DOJ}</td>
                  <td>{data["CONTRACTOR"]}</td>
                </tr>
              ))}
          </table>
        </Typography>
      </Container>
    </div>
  );
}