import { Button } from "@material-ui/core";
import PrintIcon from "@mui/icons-material/Print";
import DownloadIcon from "@mui/icons-material/Download";
import { Fragment, useState } from "react";

import AddTrackingForm from "./components/AddTrackingForm";
import TrackingNumberList from "./components/TrackingNumberList";
import InfoBox from "./components/InfoBox";

import "./App.css";

function App() {
  const [isUpdated, setIsUpdated] = useState(false);

  return (
    <Fragment>
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
      <TrackingNumberList updateVal={isUpdated} />
    </Fragment>
  );
}

export default App;
