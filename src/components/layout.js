import * as React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { AnimatePresence, motion } from "framer-motion"
import FontFaceObserver from "fontfaceobserver"
import { Box, useTheme, useMediaQuery, Toolbar } from "@material-ui/core"
import { setAtTop, setAssetsLoaded, setIsMobile } from "../state/actions"
import Navbar from "./Navbar"
import MobileMenu from "./MobileMenu"
import MobileQuickContact from "./MobileQuickContact"
import Footer from "./Footer"

import style from "../../style.json"

const Layout = ({ dispatch, location, children, assetsLoaded }) => {
  const loadFonts = () => {
    var headerFont = new FontFaceObserver(style.fonts.header)
    var bodyFont = new FontFaceObserver(style.fonts.body)
    Promise.all([
      headerFont.load(null, 10000),
      bodyFont.load(null, 10000),
    ]).then(
      function () {
        dispatch(setAssetsLoaded(true))
      },
      () => dispatch(setAssetsLoaded(true))
    )
  }

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
    loadFonts()
    document.addEventListener("scroll", () => {
      dispatch(setAtTop(window.scrollY === 0))
    })
    //eslint-disable-next-line
  }, [])

  return (
    assetsLoaded && (
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
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

const mapStateToProps = state => ({
  assetsLoaded: state.assetsLoaded,
})

export default connect(mapStateToProps)(Layout)
