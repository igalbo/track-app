import { useState, useEffect, useCallback } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import PauseIcon from "@mui/icons-material/Pause";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import CircularProgress from "@mui/material/CircularProgress";

import { getTrackingInfo } from "../../api/api";

function DataRow({ data, onDelete }) {
  const [isLoading, setIsLoading] = useState(false);
  const { key, date, order, tracking, carrier, marketplace, tags } = data;
  const [itemStatus, setItemStatus] = useState("");
  const maxStatusLength = 50;
  const pauseText =
    "Stop tracking status updates for this item. Delivered items stop updating automatically";

  const getLabel = () =>
    itemStatus?.substring(0, maxStatusLength).concat("...");

  const getTrackingUrl = (tracking, carrier) => {
    if (carrier.toLowerCase() === "usps") {
      return `https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1=${tracking}`;
    }

    return "#";
  };

  console.log(data);

  const handleRefreshStatus = useCallback(async () => {
    setIsLoading(true);
    const trackData = await getTrackingInfo(tracking);
    setItemStatus(trackData.Status || trackData.Error?.Description);
    setIsLoading(false);
  }, [tracking]);

  const handleDelete = () => {
    onDelete(key);
  };
  useEffect(() => {
    handleRefreshStatus();
  }, [handleRefreshStatus]);

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
            <Tooltip title={itemStatus}>
              <Chip
                // color={statusColor()}
                label={getLabel()}
              />
            </Tooltip>
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
          onClick={handleRefreshStatus}
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
        <Tooltip title="Delete item">
          <Button
            sx={{ minWidth: "10px" }}
            style={{ borderRadius: 4 }}
            variant="outlined"
            onClick={handleDelete}
          >
            <DeleteIcon />
          </Button>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}

export default DataRow;
