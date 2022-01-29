import React, { Fragment, useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import PauseIcon from "@mui/icons-material/Pause";
import RefreshIcon from "@mui/icons-material/Refresh";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";

import { getTrackingInfo } from "../api/api";

function DataRow({ row }) {
  const [status, setStatus] = useState(row.status);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const maxStatusLength = 50;
  const pauseText =
    "Stop tracking status updates for this item. Delivered items are automatically stopped from being updated";
  const handleOpenModal = () => setOpenStatusModal(true);
  const handleCloseModal = () => setOpenStatusModal(false);

  const getTrackingUrl = (tracking, carrier) => {
    if (carrier.toLowerCase() === "usps") {
      return `https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1=${tracking}`;
    }

    return "#";
  };

  const refreshStatusHandler = async () => {
    setIsLoading(true);
    const trackData = await getTrackingInfo(row.tracking);

    console.log(trackData);

    setStatus(trackData?.Status);
    setIsLoading(false);
  };

  const statusColor = () => {
    if (status.toLowerCase().startsWith("delivered")) {
      return "success";
    }
  };

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
    <Fragment>
      {status && (
        <Modal
          open={openStatusModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Paper sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Paper>
        </Modal>
      )}
      <TableRow row="true">
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
          {isLoading ? (
            <CircularProgress />
          ) : (
            status && (
              <Chip
                onClick={handleOpenModal}
                color={statusColor()}
                label={status.substring(0, maxStatusLength)}
              />
            )
          )}
        </TableCell>
        <TableCell>{row.marketplace}</TableCell>
        <TableCell>
          {row.tags?.map((tag, i) => (
            <Chip key={i} label={tag} />
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
    </Fragment>
  );
}

export default DataRow;
