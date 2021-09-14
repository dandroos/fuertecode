import { Typography } from "@material-ui/core"
import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage = () => (
  <>
    <Seo title="404: Not found" />
    <Typography variant="h2" gutterBottom>
      Hmmmm....
    </Typography>
    <Typography>That page doesn't seem to exist...spooky!</Typography>
  </>
)

export default NotFoundPage
