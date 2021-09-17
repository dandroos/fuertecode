import {
  Box,
  Button,
  Container,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@material-ui/core"
import { Link as GatsbyLink } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { Cellphone, Laptop, Phone, Web } from "mdi-material-ui"
import React from "react"
import { connect } from "react-redux"
import PageWrapper from "../components/PageWrapper"

import Seo from "../components/seo"

function ServicesPage({ isMobile }) {
  const Service = ({ title, children, Icon, noDivider }) => (
    <ListItem
      divider={!noDivider}
      style={{
        flexDirection: isMobile ? "column" : "row",
        textAlign: isMobile ? "center" : undefined,
      }}
    >
      <ListItemIcon>
        <Icon style={{ fontSize: 40 }} />
      </ListItemIcon>
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
      <Typography paragraph>{children}</Typography>
    </Box>
  )
  return (
    <PageWrapper>
      <Seo title="Services" />
      <Container maxWidth="md">
        <Typography variant="h2" gutterBottom>
          Services
        </Typography>
        <Box mb={5}>
          <Typography paragraph>
            With over 20 years coding experience, I have acquired a wealth of
            knowledge to provide you with an expert service. Here are just some
            of the things I can build for you...
          </Typography>
          <List
            style={{
              maxWidth: useTheme().breakpoints.values.md,
              margin: "auto",
            }}
          >
            <Service title="Websites and web applications" Icon={Web}>
              From a basic blog to a large scale e-commerce site, I have you
              covered. I have experience with various languages and tech to be
              able to offer you the best advice to suit your goal(s) and budget.
              I design responsive web content, meaning that the design adapts to
              look great on mobile and desktop devices. I know how to optimise
              your site/app so that it loads and runs as fast as possible. I can
              also provide hosting and domain services/advice.
            </Service>
            <Service title="Mobile applications" Icon={Cellphone}>
              Need a mobile app for your business, but don't know where to
              start? I create mobile applications using technology that works on
              both Android and iOS. This means that programmers don't have to
              write separate codebases and therefore it halves the amount of
              work. For some kinds of apps this isn't possible, but don't
              worry... I can also write native code to bring out the best of
              both operating systems. From design to deployment to app stores,
              I'll be there to guide you.
            </Service>
            <Service title="Standalone applications" Icon={Laptop} noDivider>
              I can build applications that run locally on your home/office
              computers. For example, perhaps you/your business would benefit
              from a bespoke invoicing and/or order fulfilment solution. It can
              have a pretty GUI (Graphical User Interface) or it can have a
              basic CLI (Command Line Interface). There are too many use cases
              for standalone applications to list here, but if you can think of
              a repetitive task you perform on your computer, there is a big
              possibility that it can be automated!
            </Service>
          </List>
        </Box>
      </Container>
      <Box mb={5}>
        <Container>
          <Typography variant="h4" align="center" gutterBottom>
            Frequently Asked Questions
          </Typography>
        </Container>
        {isMobile ? (
          <StaticImage
            src="../images/dog_raising_paw.jpg"
            alt="Dog raising paw"
            layout="fullWidth"
            aspectRatio={5 / 2}
          />
        ) : (
          <StaticImage
            src="../images/dog_raising_paw.jpg"
            alt="Dog raising paw"
            layout="fullWidth"
            aspectRatio={16 / 4.5}
          />
        )}
        <Container>
          <Typography
            variant="caption"
            display="block"
            align="center"
            style={{ marginBottom: 10 }}
          >
            Nothing to see here. Just a cute dog putting her paw up! (Photo:
            Camylla Battani)
          </Typography>
          <Faq question="Where is your price list?">
            I don't have a price list because every project is unique and it is
            impossible to give you a quote without knowing your requirements.
            When I provide you with a quote, I separate labour and running costs
            (if applicable) so you can see exactly what you are paying for. I
            charge a fair rate for my services and I check my competitors prices
            regularly to ensure I am offering you the best price.
          </Faq>
          <Faq question="What is the first step?">
            Pleae{" "}
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
          </Faq>
          <Faq question="How does payment work?">
            Inline with the process of many developers, I request half the total
            costs for the project before commencing work and the remainder upon
            completion.
          </Faq>
          <Faq question="Am I protected?">
            Of course! We sign a contract for our mutual protection. Don't worry
            though, it is not a complicated contract and the basic gist is that
            you are legally fully protected from any shenanigans....and so am I!
          </Faq>
          <Faq question="Can you explain processes to me without jargon?">
            Yes. I don't expect everyone to know the ins and outs of
            development. That's why it is a specialist area and why you should
            hire a specialist to carry out the work! Some of the concepts of
            developing applications are abstract and so I like to explain the
            processes using analogies (usually restaurant analogies!). That
            said, if you'd rather not know how it works, I completely understand
            and respect that too!
          </Faq>
          <Faq question="Are you contactable by phone?">
            I am, but please bear in mind that I may not be able to answer your
            call immediately. The reason being that writing code requires focus
            so I put my phone on silent when I am working. If you leave a
            message, I will call you back as soon as I see it. I check my phone
            intermittently through the day and I have a number you can call in
            case of emergencies.
          </Faq>
          <Faq question="Do you keep me informed about the work?">
            At the end of every working day, I will send you a progress report
            so that you can stay up-to-date on where I am with your project.
          </Faq>
          <Faq question="Can I hire you to work in a team?">
            Absolutely. Although I prefer to work independently these days, I am
            well-versed in version control and have previously worked in a team.
          </Faq>
          <Faq question="My question isn't listed...">
            No worries!{" "}
            <Link color="secondary" component={GatsbyLink} to="/contact">
              Contact me
            </Link>{" "}
            and I'll happily answer it for you!
          </Faq>
        </Container>
      </Box>
      <Container>
        <Box align="center">
          <Typography gutterBottom variant="h4">
            Want to know more?
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            component={GatsbyLink}
            to="/contact"
            startIcon={<Phone />}
          >
            Get in touch!
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
