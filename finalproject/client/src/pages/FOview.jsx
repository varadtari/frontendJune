import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";


export default function FOview({ tableData }) {
  return (
    <div>
      <Container maxWidth="">
        <Typography
          style={{
            backgroundColor: "white",
            border: "1px solid black",
            maxWidth:"50%"
          }}
        >
          <div className="img">
            <img
              style={{ maxWidth: "80%", marginLeft:"100px"}}
              src={process.env.PUBLIC_URL + "/images/heads.png"}
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
            {tableData &&
              tableData.map((data) => (
                <tr>
                  <td>{data["EMPLOYEE NAME"]}</td>
                  <td>{data.Dept}</td>
                  <td>{data[""]}</td>
                  <td>{data.DOJ}</td>
                  <td>{data[""]}</td>
                </tr>
              ))}
              
          </table>
        </Typography>
      </Container>
      {/* <PdfComponent /> */}
    </div>
  );
}
