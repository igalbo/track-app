import { useState, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Button } from "@mui/material";

import { submitToDatabase } from "../api/api";

function AddItemForm() {
  const [carrier, setCarrier] = useState("");
  const [marketplace, setMarketplace] = useState("");
  const [date, setDate] = useState();

  const orderRef = useRef();
  const trackingRef = useRef();
  const tagsRef = useRef();

  const handleCarrierChange = (event) => {
    setCarrier(event.target.value);
  };

  const handleMarketplaceChange = (event) => {
    setMarketplace(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.toLocaleString("en-US"));
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const tags = tagsRef.current.value ? tagsRef.current.value.split(",") : [];

    const enteredData = {
      tracking: trackingRef.current.value,
      carrier: carrier,
      marketplace: marketplace,
      order: orderRef.current.value,
      date: date,
      tags: tags,
    };

    submitToDatabase(enteredData);
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={submitHandler}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          label="Select Date"
          value={date}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <TextField
        id="order"
        label="Order #"
        variant="standard"
        inputRef={orderRef}
      />
      <TextField
        id="tracking"
        label="Tracking #"
        variant="standard"
        inputRef={trackingRef}
      />
      <FormControl fullWidth>
        <InputLabel id="select-carrier-label">Carrier</InputLabel>
        <Select
          labelId="select-carrier-label"
          id="select-carrier"
          value={carrier}
          label="Carrier"
          onChange={handleCarrierChange}
        >
          <MenuItem value="USPS">USPS</MenuItem>
          <MenuItem value="China Post">China Post</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="select-market-label">Marketplace</InputLabel>
        <Select
          labelId="select-market-label"
          id="select-market"
          value={marketplace}
          label="Marketplace"
          onChange={handleMarketplaceChange}
        >
          <MenuItem value="Shopify">Shopify</MenuItem>
          <MenuItem value="Amazon">Amazon</MenuItem>
          <MenuItem value="Ebay">eBay</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </FormControl>

      <TextField
        id="tags"
        label="Tags (comma separated)"
        variant="standard"
        inputRef={tagsRef}
      />

      <Button type="submit">Add</Button>
    </Box>
  );
}

export default AddItemForm;
