import {
  Box,
  Button,
  Container,
  Grid,
  Icon,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { connect } from "react-redux"

import ContactForm from "../components/ContactForm"
import PageWrapper from "../components/PageWrapper"
import Seo from "../components/seo"

function ContactPage({ isMobile }) {
  const data = useStaticQuery(graphql`
    {
      content: file(
        sourceInstanceName: { eq: "content" }
        name: { eq: "contact" }
        extension: { eq: "md" }
      ) {
        childMarkdownRemark {
          frontmatter {
            contact_heading
            contact_buttons {
              contact_button {
                contact_method_primary
                contact_method_secondary
                contact_method_icon
                contact_method_url
              }
            }
            contact_buttons_intro
            silent_phone_warning
          }
        }
      }
      contact_info: file(
        sourceInstanceName: { eq: "content" }
        name: { eq: "contact-info" }
        extension: { eq: "md" }
      ) {
        childMarkdownRemark {
          frontmatter {
            email
            phone
          }
        }
      }
    }
  `)
  const cms = {
    ...data.content.childMarkdownRemark.frontmatter,
    ...data.contact_info.childMarkdownRemark.frontmatter,
  }

  const ContactMethod = ({ primary, secondary, url, icon }) => {
    const sanitize = (field, value) => {
      switch (field) {
        case "url":
          if (/{{.*phone.*}}/g.test(value)) {
            return value.replace(
              /{{.*phone.*}}/g,
              "34" + cms.phone.replaceAll(" ", "")
            )
          }
          if (/{{.*email.*}}/g.test(value)) {
            return value.replace(/{{.*email.*}}/g, cms.email)
          }
          break
        case "secondary":
          if (/{{.*phone.*}}/g.test(value)) {
            return value.replace(/{{.*phone.*}}/g, cms.phone)
          }
          if (/{{.*email.*}}/g.test(value)) {
            return value.replace(/{{.*email.*}}/g, cms.email)
          }
          break
        default:
          break
      }
    }

    return (
      <Button
        color="secondary"
        variant="contained"
        fullWidth
        component="a"
        href={sanitize("url", url)}
        target="_blank"
      >
        <ListItem
          style={{ flexDirection: isMobile ? "row" : "column" }}
          component="div"
        >
          <ListItemIcon
            style={{
              justifyContent: isMobile ? undefined : "center",
              color: "inherit",
            }}
          >
            <Icon className={icon} />
          </ListItemIcon>
          <ListItemText
            primary={primary}
            secondary={sanitize("secondary", secondary)}
            primaryTypographyProps={{ variant: "h6", align: "center" }}
            secondaryTypographyProps={{ align: "center" }}
          />
        </ListItem>
      </Button>
    )
  }

  return (
    <PageWrapper>
      <Seo title="Contact" />
      <Container maxWidth="md">
        <Typography variant="h2" gutterBottom>
          {cms.contact_heading}
        </Typography>
        <Typography gutterBottom>{cms.contact_buttons_intro}</Typography>
        <Grid container spacing={1}>
          {cms.contact_buttons.map(({ contact_button }, ind) => (
            <Grid item xs={12} md={4} key={ind}>
              <ContactMethod
                primary={contact_button.contact_method_primary}
                secondary={contact_button.contact_method_secondary}
                url={contact_button.contact_method_url}
                icon={contact_button.contact_method_icon}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Alert variant="outlined" severity="warning">
              {cms.silent_phone_warning}
            </Alert>
          </Grid>
        </Grid>
        <Box mt={3}>
          <ContactForm />
        </Box>
      </Container>
    </PageWrapper>
  )
}

const mapStateToProps = state => ({
  isMobile: state.isMobile,
})
export default connect(mapStateToProps)(ContactPage)
