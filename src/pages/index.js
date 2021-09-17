import {
  Box,
  Button,
  Container,
  Icon,
  Typography,
  useTheme,
} from "@material-ui/core"
import { graphql, Link, useStaticQuery } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import * as React from "react"
import { connect } from "react-redux"

import PageWrapper from "../components/PageWrapper"
import Seo from "../components/seo"

const IndexPage = ({ isMobile }) => {
  return (
    <PageWrapper>
      <Seo title="Home" />
      <Box
        display="flex"
        bgcolor="primary.main"
        color="common.white"
        height="100vh"
        width="100%"
        justifyContent="end"
        alignItems="center"
        flexDirection="column"
      >
        <Box width="100vw" height="100vh" position="fixed">
          {isMobile ? (
            <StaticImage
              alt="Dave the Fuerte Nerd"
              quality={90}
              aspectRatio={9 / 16}
              src="../images/dave1.jpg"
              objectFit="cover"
              layout="fullWidth"
              style={{ height: "100%" }}
            />
          ) : (
            <StaticImage
              alt="Dave the Fuerte Nerd"
              quality={90}
              aspectRatio={4 / 3}
              src="../images/dave_landscape.jpg"
              objectFit="cover"
              layout="fullWidth"
              style={{ height: "100%" }}
            />
          )}
        </Box>
        <Box
          p={4}
          width="100%"
          display="flex"
          alignItems="center"
          style={{
            background: `linear-gradient(to top, ${
              useTheme().palette.common.black
            }, transparent`,
            zIndex: 50,
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="h1">Hi, I'm Dave!</Typography>
            <Typography
              style={{
                width: isMobile ? undefined : "45%",
                fontSize: isMobile ? "1.1rem" : "1.3rem",
              }}
              paragraph
            >
              I make professional websites, web apps, mobile apps, standalone
              apps and more using the latest industry-standard tech.
            </Typography>
            <Button
              size="large"
              color="secondary"
              variant="contained"
              startIcon={<Icon>info</Icon>}
              component={Link}
              to="/services"
            >
              How can I help?
            </Button>
          </Container>
        </Box>
      </Box>
    </PageWrapper>
  )
}
const mapStateToProps = state => ({
  isMobile: state.isMobile,
})
export default connect(mapStateToProps)(IndexPage)
