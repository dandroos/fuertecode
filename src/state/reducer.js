import { AT_TOP, ASSETS_LOADED, IS_MOBILE, MOBILE_MENU } from "./types"

const initialState = {
  assetsLoaded: false,
  siteReady: false,
  isMobile: false,
  showMobileMenu: false,
  atTop: true,
}

const reducer = (state = initialState, { type, payload }) => {
  const newState = Object.assign({}, state)

  switch (type) {
    case ASSETS_LOADED:
      newState.assetsLoaded = payload
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
