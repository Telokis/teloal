"use client";

import { createTheme } from "@mui/material/styles";
import darkScrollbar from "@mui/material/darkScrollbar";
import type {} from "@mui/lab/themeAugmentation";

export default createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6299ce",
    },
    secondary: {
      main: "#42a282",
    },
    background: {
      paper: "#202020",
      default: "#141414",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: "100vh",
          width: "100vw",
          margin: 0,
        },
        body: {
          ...darkScrollbar(),
          overflowY: "hidden",
          height: "100%",
        },
        "#root": {
          height: "100%",
          width: "100%",
        },
      },
    },
    MuiListItemButton: {
      defaultProps: {
        disableTouchRipple: true,
        dense: true,
      },
      styleOverrides: {
        root: {
          "&:active": {
            backgroundColor: "rgba(255, 255, 255, 0.15)",
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "white",
          color: "rgba(0, 0, 0, 0.87)",
          fontSize: 14,
        },
      },
    },
  },
});
