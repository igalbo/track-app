import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import PauseIcon from "@mui/icons-material/Pause";
import RefreshIcon from "@mui/icons-material/Refresh";
import Chip from "@mui/material/Chip";

import { getTrackingInfo } from "../api/api";

function DataRow({ row }) {
  const [status, setStatus] = useState(row.status);

  const getTrackingUrl = (tracking, carrier) => {
    if (carrier.toLowerCase() === "usps") {
      return `https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1=${tracking}`;
    }

    return "#";
  };

  const refreshStatusHandler = async () => {
    const trackData = await getTrackingInfo(row.tracking);
    console.log("Inside status handler. Status is: ", trackData);
    setStatus(trackData?.Status);
  };

  return (
    <TableRow row>
      <TableCell>{row.date}</TableCell>
      <TableCell>{row.order}</TableCell>
      {row.tracking ? (
        <TableCell
          component="a"
          rel="noopener noreferrer"
          target="_blank"
          href={getTrackingUrl(row.tracking, row.carrier)}
          sx={{
            "&:hover": {
              backgroundColor: "#F7F9FA !important",
            },
          }}
        >
          {row.tracking}
        </TableCell>
      ) : (
        <TableCell>Not Available</TableCell>
      )}
      <TableCell>{row.carrier}</TableCell>
      <TableCell>
        <Chip label={status} />
      </TableCell>
      <TableCell>{row.marketplace}</TableCell>
      <TableCell>
        {row.tags?.map((tag) => (
          <Chip label={tag} />
        ))}
      </TableCell>

      <TableCell>
        <Button
          sx={{ minWidth: "10px" }}
          style={{ borderRadius: 4 }}
          variant="contained"
          disableElevation
          onClick={refreshStatusHandler}
        >
          <RefreshIcon />
        </Button>
        <Button
          sx={{ minWidth: "10px" }}
          style={{ borderRadius: 4 }}
          variant="outlined"
        >
          <PauseIcon />
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default DataRow;
