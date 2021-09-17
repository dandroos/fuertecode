import { CssBaseline, ThemeProvider } from "@material-ui/core"
import React from "react"
import { Helmet } from "react-helmet"
import { Provider } from "react-redux"

import store from "../../src/state/store"
import theme from "../../src/theme"
import style from "../../style.json"

function TopLayout({ children }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Helmet>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href={`https://fonts.googleapis.com/css2?family=${style.fonts.header.replaceAll(
              " ",
              "+"
            )}&family=${style.fonts.body.replaceAll(" ", "+")}&display=swap`}
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
        </Helmet>
        {children}
      </ThemeProvider>
    </Provider>
  )
}

export default TopLayout
