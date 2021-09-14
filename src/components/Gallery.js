import { Box } from "@material-ui/core"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"
import { Carousel } from "react-responsive-carousel"

import "react-responsive-carousel/lib/styles/carousel.min.css"

function Gallery() {
  const images = useStaticQuery(graphql`
    {
      images: allFile(
        filter: { sourceInstanceName: { eq: "gallery-images" } }
      ) {
        edges {
          node {
            childImageSharp {
              gatsbyImageData(
                aspectRatio: 0.90
                quality: 100
                layout: FULL_WIDTH
              )
              id
            }
          }
        }
      }
    }
  `).images.edges

  return (
    <Carousel infiniteLoop autoPlay showStatus={false} showThumbs={false}>
      {images &&
        images.map((i, ind) => (
          <Box key={ind}>
            <GatsbyImage
              image={getImage(i.node)}
              alt={`Dave the Fuertenerd ${ind + 1}`}
            />
          </Box>
        ))}
    </Carousel>
  )
}

export default Gallery
