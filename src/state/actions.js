import {
  AT_TOP,
  FONTS_LOADED,
  IS_MOBILE,
  MOBILE_MENU,
  SITE_READY,
} from "./types"

export const setSiteReady = payload => ({
  type: SITE_READY,
  payload,
})

export const setIsMobile = payload => ({
  type: IS_MOBILE,
  payload,
})

export const setMobileMenu = payload => ({
  type: MOBILE_MENU,
  payload,
})

export const setAtTop = payload => ({
  type: AT_TOP,
  payload,
})

export const setFontsLoaded = payload => ({
  type: FONTS_LOADED,
  payload,
})
