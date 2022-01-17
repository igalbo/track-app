import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DataRow from "./DataRow";

export default function DataTable({ data }) {
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

  const columns = columnNames.map((colName) => (
    <TableCell sx={{ fontWeight: 600 }}>{colName}</TableCell>
  ));

  const rows = [];

  for (const element in data) {
    rows.push({
      key: element,
      date: data[element].date,
      order: data[element].order,
      tracking: data[element].tracking,
      carrier: data[element].carrier,
      status: data[element].status,
      marketplace: data[element].marketplace,
      tags: data[element].tags,
    });
  }

  const tableData = rows.map((row) => <DataRow row={row} />);

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
