import {
  Box,
  Button,
  Container,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { Email, Phone, Whatsapp } from "mdi-material-ui"
import React from "react"
import { connect } from "react-redux"
import ContactForm from "../components/ContactForm"
import Seo from "../components/seo"

function ContactPage({ isMobile }) {
  const ContactMethod = ({ primary, secondary, url, Icon }) => (
    <Button
      color="secondary"
      variant="contained"
      fullWidth
      component="a"
      href={url}
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
          <Icon fontSize="large" />
        </ListItemIcon>
        <ListItemText
          primary={primary}
          secondary={secondary}
          primaryTypographyProps={{ variant: "h6", align: "center" }}
          secondaryTypographyProps={{ align: "center" }}
        />
      </ListItem>
    </Button>
  )

  return (
    <>
      <Seo title="Contact" />
      <Container maxWidth="md">
        <Typography variant="h2" gutterBottom>
          Contact
        </Typography>
        <Typography gutterBottom>
          You can contact me via the following methods...
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} md={4}>
            <ContactMethod
              primary="Phone"
              secondary="123 456 789"
              url="tel:123456789"
              Icon={Phone}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <ContactMethod
              primary="WhatsApp"
              secondary="123 456 789"
              url="https://wa.me/123456789"
              Icon={Whatsapp}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <ContactMethod
              primary="Email"
              secondary="fuertenerd@gmail.com"
              url="mailto:fuertenerd@gmail.com"
              Icon={Email}
            />
          </Grid>
          <Grid xs={12}>
            <Alert variant="outlined" severity="warning">
              Please note that I have my phone on silent when working in order
              to concentrate. If I don't answer your call, please leave a
              message and I will call you back as soon as I see it. Thanks.
            </Alert>
          </Grid>
        </Grid>
        <Box mt={3}>
          <ContactForm />
        </Box>
      </Container>
    </>
  )
}

const mapStateToProps = state => ({
  isMobile: state.isMobile,
})
export default connect(mapStateToProps)(ContactPage)
