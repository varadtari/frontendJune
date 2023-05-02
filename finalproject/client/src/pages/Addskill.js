import React from "react";
import TableRow from "./MatrixTable";
import MatrixTable from "./MatrixTable";

export default function Table() {
  const data = [
    {
      name: "John",
      dropdownOptions: ["Option 1", "Option 2", "Option 3"],
    },
    {
      name: "Jane",
      dropdownOptions: ["Option A", "Option B", "Option C"],
    },
  ];

  return (
    <table>
      <tbody>
        {data.map((row) => (
          <MatrixTable key={row.name} data={row} />
        ))}
      </tbody>
    </table>
  );
}
    