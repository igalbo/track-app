import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DataRow from "./DataRow";

import { deleteFromDatabase } from "../../api/api";

export default function DataTable({ data }) {
  const [filteredData, setFilteredData] = useState(data);
  const columnNames = [
    "Order date",
    "Order #",
    "Tracking #",
    "Carrier",
    "Status",
    "Marketplace",
    "Tags",
    "Actions",
  ];

  const handleDeleteItem = (key) => {
    deleteFromDatabase(key);
    setFilteredData(() => filteredData.filter((entry) => entry.key !== key));
  };

  const tableData =
    filteredData &&
    filteredData.map((entryData) => {
      console.log(entryData);
      return <DataRow data={entryData} onDelete={handleDeleteItem} />;
    });

  const columns = columnNames.map((colName, i) => (
    <TableCell key={i} sx={{ fontWeight: 600 }}>
      {colName}
    </TableCell>
  ));

  return (
    <TableContainer
      component={Paper}
      style={{ border: "none", boxShadow: "none" }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="data table">
        <TableHead style={{ background: "#f7f9fa" }}>
          <TableRow>{columns}</TableRow>
        </TableHead>
        <TableBody>{tableData}</TableBody>
      </Table>
    </TableContainer>
  );
}
