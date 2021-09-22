import React from "react"
import { useStaticQuery, graphql, Link as GatsbyLink } from "gatsby"
import { Box, Typography, Link, Container } from "@material-ui/core"
import ReactMarkdown from "react-markdown"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { connect } from "react-redux"
import { Fade } from "react-awesome-reveal"

function Faqs({ isMobile }) {
  const data = useStaticQuery(graphql`
    {
      content: file(
        sourceInstanceName: { eq: "content" }
        name: { eq: "services" }
        extension: { eq: "md" }
      ) {
        childMarkdownRemark {
          frontmatter {
            faq_heading
            faq_image_caption
            faqs {
              faq {
                answer
                question
              }
            }
          }
        }
      }
      image_desktop: file(
        sourceInstanceName: { eq: "content" }
        name: { eq: "services" }
        extension: { eq: "md" }
      ) {
        childMarkdownRemark {
          frontmatter {
            faq_image {
              childImageSharp {
                gatsbyImageData(aspectRatio: 3.55555555556, layout: FULL_WIDTH)
              }
            }
          }
        }
      }
      image_mobile: file(
        sourceInstanceName: { eq: "content" }
        name: { eq: "services" }
        extension: { eq: "md" }
      ) {
        childMarkdownRemark {
          frontmatter {
            faq_image {
              childImageSharp {
                gatsbyImageData(aspectRatio: 2.5, layout: FULL_WIDTH)
              }
            }
          }
        }
      }
    }
  `)
  const cms = {
    ...data.content.childMarkdownRemark.frontmatter,
    faq_img_desktop:
      data.image_desktop.childMarkdownRemark.frontmatter.faq_image,
    faq_img_mobile: data.image_mobile.childMarkdownRemark.frontmatter.faq_image,
  }
  const Faq = ({ question, children }) => (
    <Box mb={3}>
      <Fade triggerOnce>
        <Typography variant="h5" gutterBottom>
          {question}
        </Typography>
        {children}
      </Fade>
    </Box>
  )
  return (
    <Box mb={5}>
      <Container>
        <Fade triggerOnce>
          <Typography variant="h4" align="center" gutterBottom>
            {cms.faq_heading}
          </Typography>
        </Fade>
      </Container>
      <Fade triggerOnce>
        {isMobile ? (
          <GatsbyImage image={getImage(cms.faq_img_mobile)} alt="FAQ image" />
        ) : (
          <GatsbyImage image={getImage(cms.faq_img_desktop)} alt="FAQ image" />
        )}
      </Fade>
      <Container>
        <Typography
          variant="caption"
          display="block"
          align="center"
          style={{ marginBottom: 10 }}
        >
          {cms.faq_image_caption}
        </Typography>
        {cms.faqs.map(({ faq }, ind) => (
          <Faq question={faq.question} key={ind}>
            <ReactMarkdown
              components={{
                p: ({ node }) => {
                  return (
                    <Typography paragraph>
                      {node.children.map((i, ind) => {
                        return i.tagName === "a" ? (
                          <Link
                            color="secondary"
                            component={GatsbyLink}
                            to={i.properties.href}
                            key={ind}
                          >
                            {i.children[0].value}
                          </Link>
                        ) : (
                          i.value
                        )
                      })}
                    </Typography>
                  )
                },
              }}
            >
              {faq.answer}
            </ReactMarkdown>
          </Faq>
        ))}
      </Container>
    </Box>
  )
}

const mapStateToProps = state => ({
  isMobile: state.isMobile,
})

export default connect(mapStateToProps)(Faqs)
