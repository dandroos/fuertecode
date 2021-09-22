import {
  Box,
  Button,
  Container,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@material-ui/core"
import { graphql, Link as GatsbyLink, useStaticQuery } from "gatsby"
import React from "react"
import { Fade } from "react-awesome-reveal"
import { connect } from "react-redux"
import Faqs from "../components/Faqs"
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
          }
        }
      }
    }
  `)

  const cms = {
    ...data.content.childMarkdownRemark.frontmatter,
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
  return (
    <PageWrapper>
      <Seo title="Services" />
      <Container maxWidth="md">
        <Fade cascade triggerOnce>
          <Typography variant="h2" gutterBottom>
            {cms.services_heading}
          </Typography>
          <Box mb={5}>
            <Fade cascade triggerOnce>
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
            </Fade>
          </Box>
        </Fade>
      </Container>
      <Faqs />
      <Container>
        <Box align="center">
          <Fade cascade>
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
          </Fade>
        </Box>
      </Container>
    </PageWrapper>
  )
}

const mapStateToProps = state => ({
  isMobile: state.isMobile,
})

export default connect(mapStateToProps)(ServicesPage)
