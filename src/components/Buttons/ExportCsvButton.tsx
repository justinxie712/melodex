import React from "react";
import ButtonWidget from "./ButtonWidget";

interface ExportCSVProps {
  className?: string;
  data: any[];
  series: string[];
  headers: string[];
  formatData: (headers: string[], data: any[], series: string[]) => string;
}

const ExportCSV: React.FC<ExportCSVProps> = ({
  className,
  data,
  series,
  headers,
  formatData,
}) => {
  const generateCSV = () => {
    const csvContent = formatData(headers, data, series);

    // Create and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", "chart_data.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ButtonWidget
      className={className ? className : ""}
      text={"Export CSV"}
      onClick={generateCSV}
      disabled={!data.length}
    />
  );
};

export default ExportCSV;
