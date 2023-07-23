import React, { useState } from "react";
import MaterialTable from "material-table";
import XLSX from "xlsx";
import Axios from "axios";


const EXTENSIONS = ["xlsx", "xls", "csv"];
function Dataentry() {
  const [colDefs, setColDefs] = useState();
  const [data, setData] = useState();
  let fileData;
  let finalData;


  const getExention = (file) => {
    const parts = file.name.split(".");
    const extension = parts[parts.length - 1];
    return EXTENSIONS.includes(extension); // return boolean
  };


  const convertToJson = (headers, data) => {
    const rows = [];
    data.forEach((row) => {
      let rowData = {};
      row.forEach((element, index) => {
        rowData[headers[index]] = element;
      });
      rows.push(rowData);
    });
    return rows;
  };


  const importExcel = (e) => {
    const file = e.target.files[0];
    console.log("file1", file);
    const reader = new FileReader();
    console.log("file2", reader);
    reader.onload = (event) => {
      //parse data


      const bstr = event.target.result;


      const workBook = XLSX.read(bstr, {
        type: "binary",
        dateNF: "yyyy/mm/dd;@",
        cellDates: true,
      });
      console.log("data 1", workBook);
      var x = 0;
      //get first sheet
      const sheet_namelist = workBook.SheetNames;


      //convert to array
      //console.log("data 2", workSheet);
      fileData = XLSX.utils.sheet_to_json(workBook.Sheets[sheet_namelist[x]], {
        header: 1,
        raw: true,
      });
      console.log("data 3", fileData);
      // console.log(fileData)
      const headers = fileData[0];

     // Check if the headers are in the expected format
    const expectedHeaders = [
      "SL NO",
      "DOJ",
      "EMP CODE",
      "EMPLOYEE NAME",
      "FATHER NAME",
      "EDUCATION",
      "Dept",
      "CONTRACTOR",
      "TRAINER",
    ];
    if (!headers.every((header, index) => header === expectedHeaders[index])) {
      alert("Please check the Excel headers. They should be in the expected format.");
      setData([]);
      setColDefs([]);
      return;
    }


      const heads = headers.map((head) => ({ title: head, field: head }));
      setColDefs(heads);
      console.log("data 4", headers);


      //removing header
      fileData.splice(0,1);
      const isDataInCapitalCase = fileData.every((row) =>
      row.every((value) => {
        // Check if the value is a string and in capital case (all uppercase)
        if (typeof value === "string") {
          return value === value.toUpperCase();
        }
        // For number values, we don't need to check, so return true
        return true;
      })
    );

    if (!isDataInCapitalCase) {
      alert("All values should be in capital case (all uppercase) except for headers.");
      setData([]);
      setColDefs([]);
      return;
    }
      finalData = convertToJson(headers, fileData);
      console.log("data 6", finalData);
      finalData = finalData.map((dataOne) => {
        return {
          ...dataOne,
          DateJoin: `${dataOne.DOJ?.valueOf() || new Date().valueOf()}`,
          DOJ: `${dataOne.DOJ?.toLocaleDateString('en-GB')}`,
        };
        
       
       
      });
      finalData = finalData.filter((dataTwo) => {
        if (dataTwo.Dept) return true;
        return false;
      });
      console.log("data 7", finalData);
      setData(finalData);


      console.log("data 5", fileData);
      //adding to database...
      //alert("varad boi");
      // console.log("data",fileData);
    };


    if (file) {
      if (getExention(file)) {
        reader.readAsBinaryString(file);
      } else {
        alert("Invalid file input, Select Excel, CSV file");
      }
    } else {
      setData([]);
      setColDefs([]);
    }
  };
  const importToDatabase = (e) => {
    // setData(finalData);
    console.log("api", data);
    Axios.post("http://localhost:4000/api/excels/insert", { data: data })
      .then(() => {
        alert("success...");
      })
      .catch(() => {
        alert("Try Again ");
      });
  };
  return (
    <div
      style={{
        margin: "0px",
        width: "100%",
        height: "100%",
        marginTop: "50px",
        padding: "12px 20px",
       
      }}
      className="App"
    >
      <h1 align="center"></h1>
      <h4 align="center"></h4>
      <input
        style={{
          fontSize: "15px",


          cursor: "pointer",
        }}
        type="file"
        onChange={importExcel}
      />
     


      <MaterialTable
        title=""
        data={data}
        columns={colDefs}
        editable={{
          onRowAdd: (newRow) =>
            new Promise((resolve, reject) => {
              setData([...data, newRow]);
              console.log("data after row add", ...data);
              setTimeout(() => resolve(), 500);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              console.log("updated data", newData);
              setData([...dataUpdate]);
              console.log("full updated data", dataUpdate);


              setTimeout(() => resolve(), 500);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                console.log("datadeleted", dataDelete);


                console.log("final updated data", data);
                resolve();
              }, 500);
            }),
        }}
        options={{
          pageSizeOptions: [3, 5, 10, 20, 50],
          exportButton: true,
          exportAllData: true,
          actionsColumnIndex: -1,
          addRowPosition: "first",
          paginationType: "stepped",
          paginationPosition: "bottom",
          sorting: true,
          grouping: true,
        }}
      />
       <button
        style={{
          fontSize: "15px",
          padding: "5px 25px",
          borderRadius: "10px",
          backgroundColor: "#008CBA",
          cursor: "pointer",
          marginTop:"20px"
         
        }}
        onClick={importToDatabase}
      >
        Submit
      </button>
    </div>
  );
}


export default Dataentry;
//`${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`


