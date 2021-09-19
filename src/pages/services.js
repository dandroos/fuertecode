import {
  Box,
  Button,
  Container,
  Icon,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@material-ui/core"
import { graphql, Link as GatsbyLink, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"
import ReactMarkdown from "react-markdown"
import { connect } from "react-redux"
import PageWrapper from "../components/PageWrapper"

import Seo from "../components/seo"

function ServicesPage({ isMobile }) {
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
            services_heading
            services_intro
            services_cta_heading
            services_cta_icon
            services_cta_link
            services_cta_text
            services {
              service {
                service_heading
                service_icon
                service_body
              }
            }
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
  const Service = ({ title, children, icon, ind }) => (
    <ListItem
      divider={ind !== cms.services.length - 1}
      style={{
        flexDirection: isMobile ? "column" : "row",
        textAlign: isMobile ? "center" : undefined,
        marginTop: isMobile ? (ind !== 0 ? 10 : undefined) : undefined,
      }}
    >
      <ListItemIcon className={icon} style={{ fontSize: 35 }} />
      <ListItemText
        primary={<Typography variant="h5">{title}</Typography>}
        primaryTypographyProps={{
          style: { fontWeight: "bold" },
        }}
        secondary={<Typography>{children}</Typography>}
        secondaryTypographyProps={{ align: "justify" }}
        disableTypography
      />
    </ListItem>
  )
  const Faq = ({ question, children }) => (
    <Box mb={3}>
      <Typography variant="h5" gutterBottom>
        {question}
      </Typography>
      <Box>{children}</Box>
    </Box>
  )
  return (
    <PageWrapper>
      <Seo title="Services" />
      <Container maxWidth="md">
        <Typography variant="h2" gutterBottom>
          {cms.services_heading}
        </Typography>
        <Box mb={5}>
          <Typography paragraph>{cms.services_intro}</Typography>
          <List
            style={{
              maxWidth: useTheme().breakpoints.values.md,
              margin: "auto",
            }}
          >
            {cms.services.map(({ service }, ind) => (
              <Service
                title={service.service_heading}
                icon={service.service_icon}
                key={ind}
                ind={ind}
              >
                {service.service_body}
              </Service>
            ))}
          </List>
        </Box>
      </Container>
      <Box mb={5}>
        <Container>
          <Typography variant="h4" align="center" gutterBottom>
            {cms.faq_heading}
          </Typography>
        </Container>
        {isMobile ? (
          <GatsbyImage image={getImage(cms.faq_img_mobile)} alt="FAQ image" />
        ) : (
          <GatsbyImage image={getImage(cms.faq_img_desktop)} alt="FAQ image" />
        )}
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
                    const { value } = node.children[0]
                    return <Typography paragraph>{value}</Typography>
                  },
                  a: ({ node }, ...props) => {
                    const value = node.children[0]
                    return (
                      <Link
                        color="secondary"
                        component={GatsbyLink}
                        to="/contact"
                        {...props}
                      >
                        {value}
                      </Link>
                    )
                  },
                }}
              >
                {faq.answer}
              </ReactMarkdown>
            </Faq>
          ))}
          {/* <Faq question="What is the first step?">
            Please{" "}
            <Link color="secondary" component={GatsbyLink} to="/contact">
              get in touch
            </Link>
            {` `}and provide me with as many details about what you need for
            your project. It doesn't need to be technical or have lots of
            detail. I will respond as soon as possible with a quote or a request
            for further information in order to give you a more accurate quote.
            There is absolutely no obligation and I do not pressure potential
            clients after quoting them. Once you have the quotation, the ball is
            in your court to ask further questions or give the green light!
          </Faq> */}
          {/* <Faq question="My question isn't listed...">
            No worries!{" "}
            <Link color="secondary" component={GatsbyLink} to="/contact">
              Contact me
            </Link>{" "}
            and I'll happily answer it for you!
          </Faq> */}
        </Container>
      </Box>
      <Container>
        <Box align="center">
          <Typography gutterBottom variant="h4">
            {cms.services_cta_heading}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            component={GatsbyLink}
            to={cms.services_cta_link}
            startIcon={<Icon className={cms.services_cta_icon} />}
          >
            {cms.services_cta_text}
          </Button>
        </Box>
      </Container>
    </PageWrapper>
  )
}

const mapStateToProps = state => ({
  isMobile: state.isMobile,
})

export default connect(mapStateToProps)(ServicesPage)
