import * as React from "react"
import PropTypes from "prop-types"
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core"
import { Link } from "gatsby"
import { connect } from "react-redux"
import useNavigation from "../hooks/useNavigation"
import { Menu } from "mdi-material-ui"

const navbar = ({ isMobile, siteTitle }) => {
  const { internal, external } = useNavigation()
  return (
    <AppBar component="header">
      <Toolbar>
        <Typography>{siteTitle}</Typography>
        <Box flexGrow={1} />
        {isMobile ? (
          <IconButton color="inherit">
            <Menu />
          </IconButton>
        ) : (
          <>
            {internal.map(i => {
              return <Button color="inherit">{i.label}</Button>
            })}
            {external.map((i, ind) => (
              <IconButton
                color="inherit"
                component="a"
                href={i.link}
                target="_blank"
                edge={ind === external.length - 1 ? "end" : undefined}
              >
                <i.Icon />
              </IconButton>
            ))}
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}
navbar.propTypes = {
  siteTitle: PropTypes.string,
}

navbar.defaultProps = {
  siteTitle: ``,
}

const mapStateToProps = state => ({
  isMobile: state.isMobile,
})

export const Navbar = connect(mapStateToProps)(navbar)
