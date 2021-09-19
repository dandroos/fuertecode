import {
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core"
import { graphql, useStaticQuery } from "gatsby"
import React from "react"

function MyLinks() {
  const cms = useStaticQuery(graphql`
    {
      file(
        sourceInstanceName: { eq: "content" }
        name: { eq: "about" }
        extension: { eq: "md" }
      ) {
        childMarkdownRemark {
          frontmatter {
            my_links_heading
            my_links {
              link {
                link_name
                link_icon
                link_url
                link_description
              }
            }
          }
        }
      }
    }
  `).file.childMarkdownRemark.frontmatter
  const ExternalLink = ({ title, ind, children, icon, url }) => (
    <ListItem
      button
      component="a"
      href={url}
      target="_blank"
      divider={ind !== cms.my_links.length - 1}
    >
      <ListItemIcon>
        <Icon className={icon} />
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
        {cms.my_links_heading}
      </Typography>
      <List>
        {cms.my_links.map((i, ind) => (
          <ExternalLink
            title={i.link.link_name}
            icon={i.link.link_icon}
            url={i.link.link_url}
            key={ind}
            ind={ind}
          >
            {i.link.link_description}
          </ExternalLink>
        ))}
      </List>
    </>
  )
}

export default MyLinks
