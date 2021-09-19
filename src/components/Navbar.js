import * as React from "react"
import PropTypes from "prop-types"
import {
  AppBar,
  Box,
  Button,
  Icon,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core"
import { Link, navigate } from "gatsby"
import { connect } from "react-redux"
import useNavigation from "../hooks/useNavigation"
import { setMobileMenu } from "../state/actions"
import Logo from "./Logo"

const Navbar = ({ dispatch, isMobile, siteTitle, atTop }) => {
  const { internal, external } = useNavigation()
  return (
    <AppBar component="header">
      <Toolbar
        variant={atTop ? undefined : "dense"}
        style={{ transition: "all .25s" }}
      >
        <Box
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
          display="flex"
          alignItems="center"
        >
          <Logo
            size="large"
            style={{ marginRight: 15, transition: "all .2s" }}
          />
          <Typography variant="h5" variantMapping={{ h5: "h1" }}>
            {siteTitle}
          </Typography>
        </Box>
        <Box flexGrow={1} />
        {isMobile ? (
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => dispatch(setMobileMenu(true))}
          >
            <Icon className="fas fa-bars" />
          </IconButton>
        ) : (
          <>
            {internal.map((i, ind) => {
              return (
                <Button
                  key={ind}
                  size={atTop ? "large" : "small"}
                  color="inherit"
                  component={Link}
                  to={i.link}
                  style={{
                    marginRight: ind !== internal.length - 1 ? 28 : 14,
                    transition: "all .1s",
                  }}
                  activeStyle={{ fontWeight: "bold" }}
                >
                  {i.label}
                </Button>
              )
            })}
            {external.map((i, ind) => (
              <IconButton
                key={ind}
                color="inherit"
                component="a"
                href={i.link}
                target="_blank"
                edge={ind === external.length - 1 ? "end" : undefined}
              >
                <Icon className={i.icon} fontSize="small" />
              </IconButton>
            ))}
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}
Navbar.propTypes = {
  siteTitle: PropTypes.string,
}

Navbar.defaultProps = {
  siteTitle: ``,
}

const mapStateToProps = state => ({
  isMobile: state.isMobile,
  atTop: state.atTop,
})

export default connect(mapStateToProps)(Navbar)
