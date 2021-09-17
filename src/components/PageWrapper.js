import React from "react"
import { connect } from "react-redux"

function PageWrapper({ ready, children }) {
  return ready && <>{children}</>
}

const mapStateToProps = state => ({
  ready: state.assetsLoaded,
})
export default connect(mapStateToProps)(PageWrapper)
