import {
  Box,
  Dialog,
  Fab,
  List,
  ListItem,
  ListItemText,
  Portal,
  Slide,
  Typography,
} from "@material-ui/core"
import { graphql, useStaticQuery, Link } from "gatsby"
import { Close } from "mdi-material-ui"
import React from "react"
import { connect } from "react-redux"
import useNavigation from "../hooks/useNavigation"
import { setMobileMenu } from "../state/actions"
import Logo from "./Logo"

function MobileMenu({ dispatch, isOpen }) {
  const handleClose = () => {
    dispatch(setMobileMenu(false))
  }

  const { title } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
        }
      }
    }
  `).site.siteMetadata

  return (
    <Portal>
      <Dialog
        fullScreen
        open={isOpen}
        onClose={handleClose}
        TransitionComponent={Slide}
      >
        <Fab
          style={{ position: "fixed", top: 15, right: 15 }}
          onClick={handleClose}
        >
          <Close />
        </Fab>
        <Box
          minHeight="100vh"
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgcolor="primary.light"
          flexDirection="column"
        >
          <Box mb={2} align="center">
            <Logo style={{ fontSize: "6rem" }} />
            <Typography variant="h5">{title}</Typography>
          </Box>
          <List style={{ width: "100%" }}>
            {useNavigation().internal.map((i, ind) => (
              <ListItem
                key={ind}
                button
                component={Link}
                to={i.link}
                onClick={handleClose}
                activeStyle={{ fontWeight: "bold" }}
              >
                <ListItemText
                  primary={i.label}
                  primaryTypographyProps={{
                    align: "center",
                    style: {
                      textTransform: "uppercase",
                      fontWeight: "inherit",
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Dialog>
    </Portal>
  )
}

const mapStateToProps = state => ({
  isOpen: state.showMobileMenu,
})

export default connect(mapStateToProps)(MobileMenu)
