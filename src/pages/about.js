import { Container, Grid, Typography } from "@material-ui/core"
import React from "react"
import { connect } from "react-redux"
import Gallery from "../components/Gallery"
import Toolbox from "../components/Toolbox"
import MyLinks from "../components/MyLinks"

import Seo from "../components/seo"
import PageWrapper from "../components/PageWrapper"

function AboutPage({ isMobile }) {
  return (
    <PageWrapper>
      <Seo title="About" />
      <Container>
        <Typography variant="h2">About</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Typography paragraph>
              Hi! My name is Dave! I am an Englishman fast-approaching middle
              age (fine by me! &#128514;) and have been living happily on the
              Canary Island of Fuerteventura for the past few years. When I am
              not in front of a computer, I am usually volunteering at my local
              dog rescue centre. I enjoy hanging out with, and taking photos of,
              all the dogs! I am also an amateur musician and enjoy playing the
              piano to unwind.
            </Typography>
            <Typography paragraph>
              I am a full-stack web developer, primarily working with the MERN
              stack and Gatsby. However, I have experience with other languages
              and tech, such as Python, PHP, Go, Electron, WordPress, Django,
              Laravel and more!
            </Typography>
            {isMobile ? <Gallery /> : <MyLinks />}
          </Grid>
          <Grid item xs={12} md>
            {isMobile ? <MyLinks /> : <Gallery />}
            <Toolbox />
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
