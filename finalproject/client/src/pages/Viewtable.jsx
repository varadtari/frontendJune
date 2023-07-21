import MaterialTable from "material-table";
import React, { useState } from 'react';
import Axios from "axios";


export default function Viewtable({ tableData }) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [viewData, setViewData] = useState(tableData);
  const columns = [
    { title: "Participant", field: "EMPLOYEE NAME" },
    { title: "Area of Operation", field: "Dept" },
    { title: "Contractor", field: "CONTRACTOR" },
    { title: "Date", field: "DOJ" },
    { title: "Trainer Name and Signature", field: "TRAINER" },
  ];

  const handleBulkDelete = async () => {
    try {
      const updatedData = viewData.filter(row => !selectedRows.includes(row));

      // Replace 'YOUR_API_ENDPOINT' with the actual endpoint to handle the delete operation on the server side
      const deletePromises = selectedRows.map(row => Axios.delete(`http://localhost:4000/api/excels/${row._id}`));

      // Wait for all the delete promises to complete
      await Promise.all(deletePromises);

      setViewData(updatedData);
      setSelectedRows([]);
      
      console.log("Selected entries successfully deleted from the database.");
    } catch (error) {
      console.error("Error deleting selected entries:", error.message);
      // Handle error scenarios if necessary
    }
    
  };

  return (
    <div>
      <br /><br />
      <MaterialTable
        title="Table Data"
        columns={columns}
        data={viewData}
        onSelectionChange={(rows) => setSelectedRows(rows)}
        options={{
          filtering: true,
          selection: true
        }}
        actions={[
          {
            icon: 'delete',
            tooltip: "Delete all selected rows",
            onClick: () => handleBulkDelete()
          }
        ]}
      />
    </div>
  );
}
