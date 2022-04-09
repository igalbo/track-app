import { useState, useEffect } from "react";

import { getAllItems, getTrackingInfo } from "../api/api";

function useSetData() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const response = await getAllItems();

      for (const key in response) {
        const trackData = await getTrackingInfo(response[key].tracking);
        response[key].status = trackData?.Status;
      }
      setData(response);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  return { data, isLoading };
}

export default useSetData;
