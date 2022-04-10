import { useState, useEffect } from "react";
import { getAllItems } from "../api/api";

function useSetData() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const response = await getAllItems();

      setData(response);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  return { data, isLoading };
}

export default useSetData;
