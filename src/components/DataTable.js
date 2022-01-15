import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import PauseIcon from "@mui/icons-material/Pause";
import RefreshIcon from "@mui/icons-material/Refresh";

function createData(
  key,
  date,
  order,
  tracking,
  carrier,
  status,
  marketplace,
  tags
) {
  return { key, date, order, tracking, carrier, status, marketplace, tags };
}

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

const rows = [
  createData(
    "1",
    "10 Jan 2022, 10:00PM",
    "159987654",
    "420892874928374237",
    "USPS",
    "Delivered",
    "Shopify ('StoreName')",
    ["Alibaba", "Low Priority"]
  ),
  createData(
    "2",
    "12 Jan 2022, 8:20AM",
    "159987481",
    "420892874928374798",
    "USPS",
    "On schedule",
    "Shopify ('StoreName')",
    []
  ),
  createData(
    "3",
    "12 Jan 2022, 8:20AM",
    "159987481",
    "420892874928374798",
    "USPS",
    "Late",
    "Shopify ('StoreName')",
    ["Petshop"]
  ),
];

export default function BasicTable() {
  return (
    <TableContainer
      component={Paper}
      style={{ border: "none", boxShadow: "none" }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{ background: "#f7f9fa" }}>
          <TableRow>{columns}</TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            // key, date, order, tracking, carrier, status, marketplace, tags
            <TableRow
              key={row.key}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell>{row.order}</TableCell>
              <TableCell>{row.tracking}</TableCell>
              <TableCell>{row.carrier}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.marketplace}</TableCell>
              <TableCell>{row.tags}</TableCell>
              <TableCell>
                <Button
                  sx={{ minWidth: "10px" }}
                  style={{ borderRadius: 4 }}
                  variant="outlined"
                >
                  <PauseIcon />
                </Button>
                <Button
                  sx={{ minWidth: "10px" }}
                  style={{ borderRadius: 4 }}
                  variant="contained"
                >
                  <RefreshIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
