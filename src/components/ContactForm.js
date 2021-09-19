import {
  Box,
  Button,
  Grid,
  Icon,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { graphql, useStaticQuery } from "gatsby"
import React from "react"

const ContactForm = () => {
  const cms = useStaticQuery(graphql`
    {
      file(
        sourceInstanceName: { eq: "content" }
        name: { eq: "contact" }
        extension: { eq: "md" }
      ) {
        childMarkdownRemark {
          frontmatter {
            contact_form_intro
            contact_form_message_error
            contact_form_message_sending
            contact_form_message_sent
            contact_form_send_button_icon
            contact_form_send_button_text
          }
        }
      }
    }
  `).file.childMarkdownRemark.frontmatter

  const [fields, setFields] = React.useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const [toast, setToast] = React.useState({
    open: false,
    msg: "",
    severity: "success",
  })

  const handleChange = e => {
    setFields({
      ...fields,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }
  const handleSubmit = e => {
    e.preventDefault()

    const encode = data => {
      return Object.keys(data)
        .map(
          key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
        )
        .join("&")
    }

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "contact",
        ...fields,
      }),
    })
      .then(() => {
        setToast({
          open: true,
          msg: cms.contact_form_message_sent,
          severity: "success",
        })
        setFields({
          name: "",
          email: "",
          phone: "",
          message: "",
        })
      })
      .catch(() =>
        setToast({
          open: true,
          msg: cms.contact_form_message_error,
          severity: "error",
        })
      )
  }
  return (
    <>
      <Typography gutterBottom>{cms.contact_form_intro}</Typography>
      <form
        name="contact"
        action="#"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value="contact" />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              variant="outlined"
              label="Name"
              name="name"
              required
              id="name"
              onChange={handleChange}
              value={fields.name}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              name="email"
              required
              id="email"
              type="email"
              onChange={handleChange}
              value={fields.email}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              variant="outlined"
              label="Phone"
              name="phone"
              id="phone"
              onChange={handleChange}
              value={fields.phone}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              multiline
              required
              label="Message"
              name="message"
              id="message"
              onChange={handleChange}
              value={fields.message}
            />
          </Grid>
        </Grid>
        <Box mt={2} align="center">
          <Button
            variant="contained"
            color="secondary"
            endIcon={<Icon className={cms.contact_form_send_button_icon} />}
            type="submit"
            size="large"
          >
            {cms.contact_form_send_button_text}
          </Button>
        </Box>
      </form>
      <Snackbar
        open={toast.open}
        autoHideDuration={5000}
        onClose={() => setToast({ ...toast, open: false })}
      >
        <Alert variant="filled" severity={toast.severity}>
          {toast.msg}
        </Alert>
      </Snackbar>
    </>
  )
}

export default ContactForm
