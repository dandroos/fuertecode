import { Container, Grid, Typography } from "@material-ui/core"
import React from "react"
import { connect } from "react-redux"
import Gallery from "../components/Gallery"
import Toolbox from "../components/Toolbox"
import MyLinks from "../components/MyLinks"

import Seo from "../components/seo"
import PageWrapper from "../components/PageWrapper"
import { graphql, useStaticQuery } from "gatsby"
import ReactMarkdown from "react-markdown"
import { Fade } from "react-awesome-reveal"

function AboutPage({ isMobile }) {
  const cms = useStaticQuery(graphql`
    {
      file(
        sourceInstanceName: { eq: "content" }
        name: { eq: "about" }
        extension: { eq: "md" }
      ) {
        childMarkdownRemark {
          frontmatter {
            about_heading
            biog
            my_links {
              link {
                link_name
                link_icon
                link_url
                link_description
              }
            }
            toolbox {
              toolbox_languages {
                toolbox_language
              }
              toolbox_other {
                toolbox_technology
              }
            }
          }
        }
      }
    }
  `).file.childMarkdownRemark.frontmatter

  return (
    <PageWrapper>
      <Seo title="About" />
      <Container>
        <Fade triggerOnce>
          <Typography variant="h2">{cms.about_heading}</Typography>
        </Fade>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Fade triggerOnce>
              <ReactMarkdown
                components={{
                  p: ({ node }) => {
                    const { value } = node.children[0]
                    return <Typography paragraph>{value}</Typography>
                  },
                }}
              >
                {cms.biog}
              </ReactMarkdown>
            </Fade>
            <Fade triggerOnce>{isMobile ? <Gallery /> : <MyLinks />}</Fade>
          </Grid>
          <Grid item xs={12} md>
            <Fade triggerOnce>{isMobile ? <MyLinks /> : <Gallery />}</Fade>
            <Fade triggerOnce>
              <Toolbox />
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </PageWrapper>
  )
}

const mapStateToProps = state => ({
  isMobile: state.isMobile,
})
export default connect(mapStateToProps)(AboutPage)
