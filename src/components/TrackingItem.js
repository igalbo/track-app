import React, { useEffect, useState } from "react";
import { getTrackingInfo } from "../api/api";

const TrackingItem = (props) => {
  const [status, setStatus] = useState("Not available");

  useEffect(() => {
    async function getTracking() {
      const result = await getTrackingInfo(props.itemData.trNumber);

      setStatus(result?.status);
    }
    getTracking();
  });

  return (
    <div>
      <p>{props.itemData.trNumber}</p>
      <p>{status}</p>
      <button>Refresh</button>
    </div>
  );
};

export default TrackingItem;
