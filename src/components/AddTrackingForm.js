import React, { useRef } from "react";

const URL =
  "https://react-http-a246f-default-rtdb.firebaseio.com/tr-numbers.json";

const AddTrackingForm = () => {
  const trNumber = useRef();
  const carrier = useRef();
  const marketplace = useRef();
  const mktOrderNumber = useRef();

  const submitToDatabase = async (data) => {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    // create data object
    const enteredData = {
      trNumber: trNumber.current.value,
      carrier: carrier.current.value,
      marketplace: marketplace.current.value,
      mktOrderNumber: mktOrderNumber.current.value,
    };

    // add tracking number to database
    submitToDatabase(enteredData);

    console.log(enteredData);

    // tell tracking number list to update (via contextAPI)
  };
  return (
    <form onSubmit={formSubmitHandler}>
      <label htmlFor="tr_number">Tracking number:</label>
      <input type="text" name="tr_number" ref={trNumber} />

      <label htmlFor="carrierr">Carrier:</label>
      <input type="text" name="carrier" ref={carrier} />

      <label htmlFor="marketplace">Marketplace:</label>
      <input type="text" name="marketplace" ref={marketplace} />

      <label htmlFor="mktOrderNumber">Marketplace order Number:</label>
      <input type="text" name="mktOrderNumber" ref={mktOrderNumber} />

      <input type="submit" value="Submit" />
    </form>
  );
};

export default AddTrackingForm;
