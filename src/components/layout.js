import * as React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { AnimatePresence, motion } from "framer-motion"

import { Box, useTheme, useMediaQuery, Toolbar } from "@material-ui/core"
import { setAtTop, setIsMobile } from "../state/actions"
import Navbar from "./Navbar"
import MobileMenu from "./MobileMenu"
import MobileQuickContact from "./MobileQuickContact"
import Footer from "./Footer"

const Layout = ({ dispatch, location, children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  const duration = 0.5
  const variants = {
    initial: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
      transition: {
        duration,
        delay: duration,
        when: "beforeChildren",
      },
    },
    exit: {
      opacity: 0,
      transition: duration,
    },
  }

  const isMobile = useMediaQuery(useTheme().breakpoints.down("md"), {
    noSsr: true,
  })
  React.useEffect(() => {
    dispatch(setIsMobile(isMobile))
    //eslint-disable-next-line
  }, [isMobile])

  React.useEffect(() => {
    document.addEventListener("scroll", () => {
      dispatch(setAtTop(window.scrollY === 0))
    })
  }, [])

  return (
    <>
      <Navbar siteTitle={data.site.siteMetadata?.title || `Title`} />
      <MobileMenu />
      <MobileQuickContact />
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={location.pathname}
          variants={variants}
          initial="initial"
          animate="enter"
          exit="exit"
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box component="main" py={location.pathname !== "/" ? 3 : 0}>
            {location.pathname !== "/" && <Toolbar />}
            {children}
          </Box>
          {location.pathname !== "/" && <Footer />}
        </motion.div>
      </AnimatePresence>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default connect()(Layout)
