import PrintIcon from "@mui/icons-material/Print";
import DownloadIcon from "@mui/icons-material/Download";
import { useEffect, useState } from "react";
import { ThemeProvider, Button } from "@mui/material";

// import AddTrackingForm from "./components/AddTrackingForm";
import InfoBox from "./components/InfoBox";
import DataTable from "./components/DataTable";
import { getAllItems, getTrackingInfo } from "./api/api";
import THEME from "./components/UI/muiTheme";

import "./App.css";

/*
TO DO
=====

V Put data from database into table
- Make "refresh" and "pause" work
- Add "Loading" spinner
- Make sure data updates correctly (add a short delay before refresh?)
- Add "Add order button" that opens a modal for adding items
- Add color to status
V Add url to tracking #
- Make list sortable
- Add/Remove Tag modal

*/

function App() {
  // const [isUpdated, setIsUpdated] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      const response = await getAllItems();

      for (const key in response) {
        const trackData = await getTrackingInfo(response[key].tracking);
        response[key].status = trackData?.Status;
      }
      setData(response);
    }

    fetchData();
  }, []);

  console.log(data);
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
        <DataTable data={data} />
      </div>

      {/* <AddTrackingForm updateList={setIsUpdated} /> */}
    </ThemeProvider>
  );
}

export default App;
