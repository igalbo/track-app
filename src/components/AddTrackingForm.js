import React, { useRef } from "react";
import Card from "./UI/Card";
import { submitToDatabase } from "../api/api";
import { v4 as uuid } from "uuid";

const AddTrackingForm = (props) => {
  const trNumber = useRef();
  const carrier = useRef();
  const marketplace = useRef();
  const mktOrderNumber = useRef();
  const key = uuid();

  const formSubmitHandler = (event) => {
    event.preventDefault();

    props.updateList(false);

    // create data object
    const enteredData = {
      key,
      trNumber: trNumber.current.value,
      carrier: carrier.current.value,
      marketplace: marketplace.current.value,
      mktOrderNumber: mktOrderNumber.current.value,
    };

    // add tracking number to database
    submitToDatabase(enteredData);
    // tell tracking number list to update (via props, later via contextAPI)
    props.updateList(true);

    console.log(enteredData);
  };

  return (
    <Card>
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
    </Card>
  );
};

export default AddTrackingForm;
