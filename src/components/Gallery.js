import { Box, Typography } from "@material-ui/core"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"
import { Carousel } from "react-responsive-carousel"

import "react-responsive-carousel/lib/styles/carousel.min.css"

function Gallery() {
  const { gallery_images } = useStaticQuery(graphql`
    {
      file(
        sourceInstanceName: { eq: "content" }
        name: { eq: "gallery" }
        extension: { eq: "md" }
      ) {
        childMarkdownRemark {
          frontmatter {
            gallery_images {
              gallery_image {
                caption
                image {
                  childImageSharp {
                    gatsbyImageData(
                      aspectRatio: 0.9
                      quality: 100
                      layout: FULL_WIDTH
                    )
                  }
                }
              }
            }
          }
        }
      }
    }
  `).file.childMarkdownRemark.frontmatter

  return (
    <Carousel
      infiniteLoop
      autoPlay
      interval={5000}
      showStatus={false}
      showThumbs={false}
    >
      {gallery_images &&
        gallery_images.map((i, ind) => (
          <Box key={ind}>
            <GatsbyImage
              image={getImage(i.gallery_image.image)}
              alt={i.gallery_image.caption}
            />
            <Typography
              className="legend"
              style={{ opacity: 0.7, borderRadius: 0 }}
            >
              {i.gallery_image.caption}
            </Typography>
          </Box>
        ))}
    </Carousel>
  )
}

export default Gallery
