import { Box, Typography } from "@material-ui/core"
import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { Fade } from "react-awesome-reveal"
import Logo from "./Logo"

function Footer() {
  const { title } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
        }
      }
    }
  `).site.siteMetadata
  const getCopyrightYear = () => {
    const currentYear = new Date().getFullYear()
    return currentYear > 2021 ? `2021 - ${currentYear}` : `2021`
  }
  return (
    <Box maxWidth="sm" align="center" my={3}>
      <Fade triggerOnce cascade>
        <Logo style={{ fontSize: 38 }} />
        <Typography variant="h6">{title}</Typography>
        <Typography variant="caption" display="block" align="center">
          All content &copy; {getCopyrightYear()} {title}
        </Typography>
      </Fade>
    </Box>
  )
}

export default Footer
