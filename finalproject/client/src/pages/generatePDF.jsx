import React from "react";
import JsPDF from "jspdf";

export default function generatePDF() {
  const report = new JsPDF("portrait", "pt", "a2");
  report.html(document.querySelector("#report")).then(() => {
    report.save("report.pdf");
  });
}
