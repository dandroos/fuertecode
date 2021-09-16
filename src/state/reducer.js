import {
  AT_TOP,
  FONTS_LOADED,
  IS_MOBILE,
  MOBILE_MENU,
  SITE_READY,
} from "./types"

const initialState = {
  fontsLoaded: false,
  siteReady: false,
  isMobile: false,
  showMobileMenu: false,
  atTop: true,
}

const reducer = (state = initialState, { type, payload }) => {
  const newState = Object.assign({}, state)

  switch (type) {
    case FONTS_LOADED:
      newState.fontsLoaded = payload
      break
    case SITE_READY:
      newState.siteReady = payload
      break
    case IS_MOBILE:
      newState.isMobile = payload
      break
    case MOBILE_MENU:
      newState.showMobileMenu = payload
      break
    case AT_TOP:
      newState.atTop = payload
      break
    default:
      break
  }

  return newState
}

export default reducer
