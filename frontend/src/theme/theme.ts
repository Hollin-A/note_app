import { createTheme } from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: blueGrey
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: grey
  },
});
