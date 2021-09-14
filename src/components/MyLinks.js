import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core"
import { Facebook, Github, Instagram } from "mdi-material-ui"
import React from "react"

function MyLinks() {
  const ExternalLink = ({ title, children, Icon, url, noDivider }) => (
    <ListItem
      button
      component="a"
      href={url}
      target="_blank"
      divider={!noDivider}
    >
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText
        primary={title}
        secondary={children}
        primaryTypographyProps={{ variant: "h6" }}
      />
    </ListItem>
  )
  return (
    <>
      <Typography variant="h5" align="center">
        My Links
      </Typography>
      <List>
        <ExternalLink
          title="Instagram"
          Icon={Instagram}
          url="https://instagram.com"
        >
          If photos of dogs are your thing, this is the place! I sometimes post
          about my work here, but lovely rescue doggies make much better
          photographs!
        </ExternalLink>
        <ExternalLink title="GitHub" Icon={Github} url="https://github.com">
          GitHub is a code repository. If you would like to see examples of my
          work, here is where you will find them. You'll also get a glimpse at
          what the code looks like 'under the hood'!
        </ExternalLink>
        <ExternalLink
          title="Facebook"
          Icon={Facebook}
          url="https://facebook.com"
          noDivider
        >
          I tend to use Facebook for marketing purposes only, so not much to see
          here! That said, if you would like to follow and share my page, I
          would be very grateful!
        </ExternalLink>
      </List>
    </>
  )
}

export default MyLinks
