// ================================================================================
// Safari iOS Bug Utils
// ================================================================================

// Canvas size cannot exceed this value on Safari in iOS
export const IOS_SAFARI_MAX_CANVAS_AREA = 16777216

/**
 * Returns true if browser is detected as Safari on iOS
 * @return {boolean}
 */
export const isIOSSafari = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) && navigator.userAgent.indexOf("Safari") > -1
