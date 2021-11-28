import { useState, useEffect } from "react";
import TrackingItem from "./TrackingItem";

const URL =
  "https://react-http-a246f-default-rtdb.firebaseio.com/tr-numbers.json";

const TrackingNumberList = () => {
  const [trackingNumbers, setTrackingNumbers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await fetch(URL);

      const responseData = await result.json();

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

  return <h2>{trackingNumbersList}</h2>;
};

export default TrackingNumberList;
