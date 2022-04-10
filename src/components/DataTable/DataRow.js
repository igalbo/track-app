import { useState, useEffect } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import PauseIcon from "@mui/icons-material/Pause";
import RefreshIcon from "@mui/icons-material/Refresh";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import CircularProgress from "@mui/material/CircularProgress";

import { getTrackingInfo } from "../../api/api";

function DataRow({ data }) {
  const [isLoading, setIsLoading] = useState(false);
  const { date, order, tracking, carrier, marketplace, tags } = data;
  const [itemStatus, setItemStatus] = useState("");

  const maxStatusLength = 50;
  const pauseText =
    "Stop tracking status updates for this item. Delivered items are automatically stopped from being updated";

  const getTrackingUrl = (tracking, carrier) => {
    if (carrier.toLowerCase() === "usps") {
      return `https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1=${tracking}`;
    }

    return "#";
  };

  useEffect(() => {
    async function getStatus() {
      setIsLoading(true);
      const trackData = await getTrackingInfo(tracking);
      console.log(trackData.message);

      setItemStatus(trackData?.Status);
      setIsLoading(false);
    }
    getStatus();
  }, [tracking]);

  // const refreshStatusHandler = async () => {
  //   setIsLoading(true);
  //   const trackData = await getTrackingInfo(tracking);
  //   console.log(trackData);
  //   setItemStatus(trackData?.Status);
  //   setIsLoading(false);
  // };

  // const statusColor = () => {
  //   if (itemStatus.toLowerCase().startsWith("delivered")) {
  //     return "success";
  //   }
  // };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <TableRow row="true">
      <TableCell>{date}</TableCell>
      <TableCell>{order}</TableCell>

      {tracking ? (
        <TableCell
          component="a"
          rel="noopener noreferrer"
          target="_blank"
          href={getTrackingUrl(tracking, carrier)}
          sx={{
            "&:hover": {
              backgroundColor: "#F7F9FA !important",
            },
          }}
        >
          {tracking}
        </TableCell>
      ) : (
        <TableCell>Not Available</TableCell>
      )}

      <TableCell>{carrier}</TableCell>
      <TableCell>
        {isLoading ? (
          <CircularProgress />
        ) : (
          itemStatus && (
            <Chip
              // color={statusColor()}
              label={itemStatus?.substring(0, maxStatusLength)}
            />
          )
        )}
      </TableCell>
      <TableCell>{marketplace}</TableCell>
      <TableCell>
        {tags?.map((tag, i) => (
          <Chip key={i} label={tag} />
        ))}
      </TableCell>

      <TableCell>
        <Button
          sx={{ minWidth: "10px" }}
          style={{ borderRadius: 4 }}
          variant="contained"
          disableElevation
          // onClick={refreshStatusHandler}
        >
          <RefreshIcon />
        </Button>
        <Tooltip title={pauseText}>
          <Button
            sx={{ minWidth: "10px" }}
            style={{ borderRadius: 4 }}
            variant="outlined"
          >
            <PauseIcon />
          </Button>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}

export default DataRow;
