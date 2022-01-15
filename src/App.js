import { Button } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import DownloadIcon from "@mui/icons-material/Download";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material";

import AddTrackingForm from "./components/AddTrackingForm";
import TrackingNumberList from "./components/TrackingNumberList";
import InfoBox from "./components/InfoBox";
import DataTable from "./components/DataTable";

import "./App.css";

const THEME = createTheme({
  typography: {
    fontFamily: [
      "Quicksand",
      "Segoe UI",
      "Roboto",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue",
    ].join(","),
  },
  shape: {
    borderRadius: 16,
  },
});

function App() {
  const [isUpdated, setIsUpdated] = useState(false);

  return (
    <ThemeProvider theme={THEME}>
      <div className="header">
        <h1>Dashboard</h1>
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
        <InfoBox type="On Schedule" total="1809" />
        <InfoBox type="Delivered" total="114" />
        <InfoBox type="Unknown" total="27" />
      </div>
      <div className="stats">
        {/* shipments pie chart */}
        {/* breakdown filter */}
        {/* bar chart */}
        {/* add order button */}
      </div>
      <div className="table">
        {/* table. fields: order date, order, tr. #, carrier, status, marketplace, tags, actions */}
      </div>

      <AddTrackingForm updateList={setIsUpdated} />
      <DataTable />
      <TrackingNumberList updateVal={isUpdated} />
    </ThemeProvider>
  );
}

export default App;
