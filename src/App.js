import PrintIcon from "@mui/icons-material/Print";
import DownloadIcon from "@mui/icons-material/Download";
import { ThemeProvider, Button, LinearProgress, Box } from "@mui/material";

import InfoBox from "./components/InfoBox/InfoBox";
import DataTable from "./components/DataTable/DataTable";
import AddItemForm from "./components/AddItemForm";
import useSetData from "./hooks/useSetData";
import THEME from "./components/UI/muiTheme";

import "./App.css";

/*
TO DO
=====

V Put data from database into table
V Make "refresh" work
V Add url to tracking #
- Add colors to status
- Make "pause" work
V Add "Loading" spinner
- Make sure data updates correctly (add a short delay before refresh?)
- Add "Add order" button that opens a modal for adding items
- Make list sortable
- "Add/Remove Tags" modal

*/

function App() {
  const { data, isLoading } = useSetData();

  const loadingBar = (
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  );

  return (
    <ThemeProvider theme={THEME}>
      <div className="header">
        <h1>Dashboard</h1>
        {isLoading && <h2>Loading...</h2>}
        <div className="header-controls">
          {/* Date filter */}
          <Button variant="contained" disableElevation>
            <PrintIcon />
          </Button>
          <Button variant="contained" disableElevation>
            <DownloadIcon />
          </Button>
        </div>
      </div>
      <div className="info-boxes">
        <InfoBox type="Late" total="154" />
        <InfoBox type="On Hold/Lost" total="8" />
        <InfoBox type="On Schedule" total="1809" />
        <InfoBox type="Delivered" total="114" />
        <InfoBox type="Unknown" total="27" />
      </div>
      <div className="stats">
        {/* shipments pie chart */}
        {/* breakdown filter */}
        {/* bar chart */}
        <Button variant="contained" disableElevation>
          Add Item
        </Button>
        <AddItemForm />
      </div>
      <div className="table">
        {isLoading ? loadingBar : <DataTable data={data} />}
      </div>
    </ThemeProvider>
  );
}

export default App;
