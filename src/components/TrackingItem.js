import React, { useEffect, useState } from "react";
import {
  getTrackingInfo,
  deleteFromDatabase,
  addTrackingInfo,
} from "../api/api";

const TrackingItem = (props) => {
  const [status, setStatus] = useState("Not available");
  const [isUpdated, setIsUpdated] = useState(true);

  const trackingId = props.itemData.trNumber;
  const itemId = props.itemData.id;

  useEffect(() => {
    async function getTracking() {
      const result = await getTrackingInfo(trackingId);

      const currentStatus = result.Status
        ? result.Status
        : "Can't retrieve tracking info";

      await addTrackingInfo(itemId, result);
      setStatus(currentStatus);
      setIsUpdated(true);
    }
    getTracking();
  }, [itemId, isUpdated, status, trackingId]);

  const refreshClickHandler = () => {
    setIsUpdated(false);
  };

  const deleteClickHandler = () => {
    deleteFromDatabase(props.itemData.id);
    setIsUpdated(false);
  };

  return (
    <div>
      <p>{trackingId}</p>
      <p>{props.itemData.id}</p>
      <p>{status}</p>
      <button onClick={refreshClickHandler}>Refresh</button>
      <button onClick={deleteClickHandler}>Delete</button>
    </div>
  );
};

export default TrackingItem;
