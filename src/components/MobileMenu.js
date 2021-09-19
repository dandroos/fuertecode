import {
  Box,
  Dialog,
  Fab,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Portal,
  Slide,
  Typography,
} from "@material-ui/core"
import { graphql, useStaticQuery, Link } from "gatsby"
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
          <Icon className="fas fa-times" />
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
          <Box>
            {useNavigation().external.map((i, ind) => (
              <IconButton
                key={ind}
                className={i.icon}
                color="inherit"
                component="a"
                href={i.link}
                target="_blank"
              />
            ))}
          </Box>
        </Box>
      </Dialog>
    </Portal>
  )
}

const mapStateToProps = state => ({
  isOpen: state.showMobileMenu,
})

export default connect(mapStateToProps)(MobileMenu)
