import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import generatePDF from "./generatePDF";

export default function DisplayTable({ tableData, title }) {
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
              style={{ maxWidth: "80%", marginLeft: "100px", }}
              src={title ? title : process.env.PUBLIC_URL + "/images/heads.png"}
            />
          </div>
          <table>
            <tr>
              <th>
                &nbsp;&nbsp;&nbsp;&nbsp;Participant&nbsp;&nbsp;&nbsp;&nbsp;
              </th>
              <th>
                {" "}
                &nbsp;&nbsp;&nbsp;&nbsp;Area of
                Operation&nbsp;&nbsp;&nbsp;&nbsp;{" "}
              </th>
              <th>
                &nbsp;Employee <br />
                Signature&nbsp;&nbsp;
              </th>
              <th>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Date&nbsp;&nbsp;&nbsp;&nbsp;
              </th>
              <th>
                &nbsp;&nbsp;&nbsp;&nbsp;Trainer Name and Signature&nbsp;&nbsp;
              </th>
            </tr>
            {tableData &&
              tableData.map((data) => (
                <tr>
                  <td>{data["EMPLOYEE NAME"]}</td>
                  <td>{data.Dept}</td>
                  <td>{<input type="checkbox"></input>}</td>
                  <td>{data.DOJ}</td>
                  <td>{data[""]}</td>
                </tr>
              ))}
          </table>
          
        </Typography>
        <br/>
        <div>RFB00960/05.19/V1.2</div>
      </Container>
      {/* <PdfComponent /> */}
    </div>
  );
}
