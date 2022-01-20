import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function AddItemForm() {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="date"
        label="Order date"
        type="datetime-local"
        //defaultValue="2021-05-24T10:30"
        sx={{ width: 250 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField id="order" label="Order #" variant="standard" />
      <TextField id="tracking" label="Tracking #" variant="standard" />
      {/* options dropdown - carrier */}
      {/* options dropdown - marketplace */}
      <TextField id="tags" label="Tags" variant="standard" />
    </Box>
  );
}

export default AddItemForm;
