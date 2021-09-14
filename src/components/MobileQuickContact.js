import {
  Fab,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@material-ui/core"
import { Phone, Whatsapp } from "mdi-material-ui"
import React from "react"
import { connect } from "react-redux"

function MobileQuickContact({ isMobile }) {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleOpen = e => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    isMobile && (
      <>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          color="secondary"
          variant="menu"
        >
          <MenuItem
            component="a"
            href="https://wa.me/123456789"
            target="_blank"
          >
            <ListItemIcon>
              <Whatsapp />
            </ListItemIcon>
            <ListItemText primary="WhatsApp me" secondary="123 456 789" />
          </MenuItem>
          <MenuItem component="a" href="tel:123456789" target="_blank">
            <ListItemIcon>
              <Phone />
            </ListItemIcon>
            <ListItemText primary="Phone me" secondary="123 456 789" />
          </MenuItem>
        </Menu>
        <Fab
          style={{ position: "fixed", bottom: 20, right: 20, zIndex: 40 }}
          onClick={handleOpen}
          color="secondary"
        >
          <Whatsapp />
        </Fab>
      </>
    )
  )
}

const mapStateToProps = state => ({
  isMobile: state.isMobile,
})

export default connect(mapStateToProps)(MobileQuickContact)
