import {
  Fab,
  Icon,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@material-ui/core"
import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { connect } from "react-redux"

function MobileQuickContact({ isMobile }) {
  const cms = useStaticQuery(graphql`
    {
      file(
        sourceInstanceName: { eq: "content" }
        name: { eq: "contact-info" }
        extension: { eq: "md" }
      ) {
        childMarkdownRemark {
          frontmatter {
            phone
          }
        }
      }
    }
  `).file.childMarkdownRemark.frontmatter

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
            href={`https://wa.me/34${cms.phone.replaceAll(" ", "")}`}
            target="_blank"
          >
            <ListItemIcon>
              <Icon className="fab fa-whatsapp" />
            </ListItemIcon>
            <ListItemText primary="WhatsApp me" secondary={cms.phone} />
          </MenuItem>
          <MenuItem
            component="a"
            href={`tel:34${cms.phone.replaceAll(" ", "")}`}
            target="_blank"
          >
            <ListItemIcon>
              <Icon className="fas fa-phone" />
            </ListItemIcon>
            <ListItemText primary="Phone me" secondary={cms.phone} />
          </MenuItem>
        </Menu>
        <Fab
          style={{ position: "fixed", bottom: 20, right: 20, zIndex: 400 }}
          onClick={handleOpen}
          color="secondary"
        >
          <Icon className="fab fa-whatsapp" />
        </Fab>
      </>
    )
  )
}

const mapStateToProps = state => ({
  isMobile: state.isMobile,
})

export default connect(mapStateToProps)(MobileQuickContact)
