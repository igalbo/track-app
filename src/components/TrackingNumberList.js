import { useState, useEffect } from "react";
import TrackingItem from "./TrackingItem";
import Card from "./UI/Card";
import { getAllItems } from "../api/api";

const TrackingNumberList = () => {
  const [trackingNumbers, setTrackingNumbers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const responseData = await getAllItems();

      const loadedNumbers = [];

      for (const key in responseData) {
        loadedNumbers.push({
          id: key,
          trNumber: responseData[key].trNumber,
          carrier: responseData[key].carrier,
          marketplace: responseData[key].marketplace,
          mktOrderNumber: responseData[key].mktOrderNumber,
        });
      }

      setTrackingNumbers(loadedNumbers);
    }

    fetchData();
  }, []);

  console.log(trackingNumbers);

  const trackingNumbersList = trackingNumbers.map((item) => (
    <TrackingItem itemData={item} key={item.id} />
  ));

  return <Card>{trackingNumbersList}</Card>;
};

export default TrackingNumberList;
