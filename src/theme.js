import { createTheme, responsiveFontSizes } from "@material-ui/core"
import style from "../style.json"

const theme = createTheme({
  palette: {
    primary: {
      main: style.colors.primary,
    },
    secondary: {
      main: style.colors.secondary,
    },
    common: {
      white: style.colors.white,
      black: style.colors.black,
    },
    background: { default: style.colors.white, paper: style.colors.white },
  },
  typography: {
    fontFamily: style.fonts.body,
    h1: {
      fontFamily: style.fonts.header,
      textTransform: "uppercase",
      fontWeight: "bold",
      letterSpacing: 2,
    },
    h2: {
      fontFamily: style.fonts.header,
      textTransform: "uppercase",
      fontWeight: "bold",
      letterSpacing: 2,
    },
    h3: {
      fontFamily: style.fonts.header,
      textTransform: "uppercase",
      fontWeight: "bold",
      letterSpacing: 2,
    },
    h4: {
      fontFamily: style.fonts.header,
      textTransform: "uppercase",
      fontWeight: "bold",
      letterSpacing: 2,
    },
    h5: {
      fontFamily: style.fonts.header,
      textTransform: "uppercase",
      fontWeight: "bold",
      letterSpacing: 2,
    },
    h6: {
      fontFamily: style.fonts.header,
      textTransform: "uppercase",
      fontWeight: "bold",
      letterSpacing: 2,
    },
  },
  props: {
    MuiContainer: {
      maxWidth: "md",
    },
  },
})

export default responsiveFontSizes(theme)
