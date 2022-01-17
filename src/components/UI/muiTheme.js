import { createTheme } from "@mui/material";

const THEME = createTheme({
  typography: {
    fontFamily: [
      "Quicksand",
      "Segoe UI",
      "Roboto",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue",
    ].join(","),
  },
  shape: {
    borderRadius: 16,
  },
});

export default THEME;
