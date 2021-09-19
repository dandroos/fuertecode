import {
  Box,
  Button,
  Container,
  Icon,
  Typography,
  useTheme,
} from "@material-ui/core"
import { graphql, Link, useStaticQuery } from "gatsby"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import * as React from "react"
import { connect } from "react-redux"

import PageWrapper from "../components/PageWrapper"
import Seo from "../components/seo"

const IndexPage = ({ isMobile }) => {
  const cms = useStaticQuery(graphql`
    {
      file(
        sourceInstanceName: { eq: "content" }
        name: { eq: "homepage" }
        extension: { eq: "md" }
      ) {
        childMarkdownRemark {
          frontmatter {
            homepage_cta_text
            homepage_cta_link
            homepage_cta_icon
            homepage_heading
            homepage_subheading
            homepage_image_landscape {
              childImageSharp {
                gatsbyImageData(
                  aspectRatio: 1.3333333333
                  quality: 90
                  layout: FULL_WIDTH
                  transformOptions: { fit: COVER }
                )
              }
            }
            homepage_image_portrait {
              childImageSharp {
                gatsbyImageData(
                  aspectRatio: 0.5625
                  layout: FULL_WIDTH
                  quality: 90
                  transformOptions: { fit: COVER }
                )
              }
            }
          }
        }
      }
    }
  `).file.childMarkdownRemark.frontmatter

  const landscapeImage = getImage(cms.homepage_image_landscape)
  const portraitImage = getImage(cms.homepage_image_portrait)

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
            <GatsbyImage
              image={portraitImage}
              alt="Dave from Fuertecode"
              style={{ height: "100%" }}
            />
          ) : (
            <GatsbyImage
              image={landscapeImage}
              alt="Dave from Fuertecode"
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
            <Typography variant="h2">{cms.homepage_heading}</Typography>
            <Typography
              style={{
                width: isMobile ? undefined : "45%",
                fontSize: isMobile ? "1.1rem" : "1.3rem",
              }}
              paragraph
            >
              {cms.homepage_subheading}
            </Typography>
            <Button
              size="large"
              color="secondary"
              variant="contained"
              startIcon={<Icon className={cms.homepage_cta_icon} />}
              component={Link}
              to={cms.homepage_cta_link}
            >
              {cms.homepage_cta_text}
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
