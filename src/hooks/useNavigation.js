import { Instagram } from "mdi-material-ui"

const navigation = () => {
  return {
    internal: [
      {
        label: "Home",
        link: "/",
      },
      {
        label: "Services",
        link: "/services",
      },
      {
        label: "About",
        link: "/about",
      },
      {
        label: "Contact",
        link: "/contact",
      },
    ],
    external: [
      {
        label: "Instagram",
        link: "https://instagram.com",
        Icon: Instagram,
      },
    ],
  }
}
export default navigation
