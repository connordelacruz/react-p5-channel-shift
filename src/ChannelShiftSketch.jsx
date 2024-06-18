import * as Constants from './Constants'


export function ChannelShiftSketch(p5) {
  // --------------------------------------------------------------------------------
  // Image Data Variables
  // --------------------------------------------------------------------------------
  // Source image + RGB channel images
  let originalImage
  let originalChannels = []
  // Preview RGB channels, based on sourceChannels but with swaps applied
  let previewChannels = []
  // Graphics object to draw swapped/shifted channels onto
  let previewGraphics

  // --------------------------------------------------------------------------------
  // Local Variables for Props
  // (Assigned in updateWithProps())
  // --------------------------------------------------------------------------------
  // x/y shift values to apply to each preview channel
  let channelShiftValues
  // Selected source/target channels
  let sourceChannel, targetChannel

  // If there's a change in selected source/target channels, this will be set to true.
  // Sketch will update previewChannels accordingly then set this back to false
  let selectedChannelsWereUpdated = false

  // --------------------------------------------------------------------------------
  // Function Variables
  //
  // Kind of a hack, but need to get various state-related functions passed from App.js.
  // These get initialized once in updateWithProps().
  // --------------------------------------------------------------------------------
  // Image dimension setter functions
  let setImageWidth = null
  let setImageHeight = null
  // Function to set setNewFileDataURL to null after load
  let setNewFileDataURL = null
  // Function to set setShouldSaveResult state to false after completing a save
  let setShouldSaveResult = null
  // Function to reset all shift and swap states
  let resetShiftAndSwap = null

  // ================================================================================
  // p5 Sketch Methods
  // ================================================================================

  /**
   * Preload default source image.
   */
  p5.preload = () => {
    originalImage = p5.loadImage('default.jpg')
  }


  /**
   * p5 setup
   */
  p5.setup = () => {
    // Disable FES in prod
    // (theoretically improves performance, but tbh I don't know if it's enabled for this react wrapper)
    p5.disableFriendlyErrors = process.env.NODE_ENV !== 'development'
    // Set pixel density to 1 (helps with performance on high-density displays)
    p5.pixelDensity(1)
    // Set frame rate to 30, we don't need crazy high FPS for this
    p5.frameRate(30)
    // Match window width, scale height accordingly
    p5.createCanvas(...calculateCanvasDimensions())

    // Initialize previewGraphics, source/preview RGB channel images, and update the image dimension states
    initializeAll()

    // --------------------------------------------------------------------------------
    // additional p5.js methods (need to be defined here because of variable scope)
    // --------------------------------------------------------------------------------

    /**
     * p5 windowResized
     */
    p5.windowResized = () => {
      p5.resizeCanvas(...calculateCanvasDimensions())
    }

    // Disable loop, only redraw on changes
    p5.noLoop()
  }


  /**
   * React to React props.
   *
   * @param props
   */
  p5.updateWithProps = props => {
    // Only redraw on changes
    let shouldRedraw = false

    // Initialize state-related function variables
    if (setImageWidth === null) {
      setImageWidth = props.setImageWidth
    }
    if (setImageHeight === null) {
      setImageHeight = props.setImageHeight
    }
    if (setShouldSaveResult === null) {
      setShouldSaveResult = props.setShouldSaveResult
    }
    if (resetShiftAndSwap === null) {
      resetShiftAndSwap = props.resetShiftAndSwap
    }
    if (setNewFileDataURL === null) {
      setNewFileDataURL = props.setNewFileDataURL
    }

    // Handle a new image being uploaded
    if (props.newFileDataURL !== null) {
      loadImageFile(props.newFileDataURL)
      shouldRedraw = true
    }

    // Handle save button click
    if (props.shouldSaveResult) {
      saveResult()
      setShouldSaveResult(false)
    }

    // Set source/target channels if modified
    let propsSourceChannelInt = parseInt(props.sourceChannel)
    if (!isNaN(propsSourceChannelInt) && propsSourceChannelInt !== sourceChannel) {
      sourceChannel = propsSourceChannelInt
      selectedChannelsWereUpdated = true
      shouldRedraw = true
    }
    let propsTargetChannelInt = parseInt(props.targetChannel)
    if (!isNaN(propsTargetChannelInt) && propsTargetChannelInt !== targetChannel) {
      targetChannel = propsTargetChannelInt
      selectedChannelsWereUpdated = true
      shouldRedraw = true
    }

    // Set shift values if modified
    if (JSON.stringify(props.channelShiftValues) !== JSON.stringify(channelShiftValues)) {
      // Deep copy array
      channelShiftValues = props.channelShiftValues.map((arr) => {
        return arr.slice()
      })
      shouldRedraw = true
    }

    // Redraw if changes were made
    if (shouldRedraw) {
      p5.redraw()
    }
  }


  /**
   * p5 draw
   */
  p5.draw = () => {
    // Update previewChannels if source/target channel selection was changed
    if (selectedChannelsWereUpdated) {
      resetPreviewChannels()
      // Swap channels if source and target are different
      if (sourceChannel !== targetChannel) {
        swapChannels(sourceChannel, targetChannel)
        selectedChannelsWereUpdated = false
      }
    }
    // Draw to previewGraphics
    previewGraphics.background(0)
    // Blend RGB channels
    drawChannelToPreviewGraphics(Constants.R_OFFSET)
    drawChannelToPreviewGraphics(Constants.G_OFFSET)
    drawChannelToPreviewGraphics(Constants.B_OFFSET)
    // Render to screen
    p5.image(previewGraphics, 0, 0, p5.width, p5.height)
  }
  // ================================================================================
  // Helper Functions
  // ================================================================================

  // --------------------------------------------------------------------------------
  // Initialization Functions
  // --------------------------------------------------------------------------------

  /**
   * Initialize previewGraphics, RGB image arrays, and set image dimension states.
   */
  function initializeAll() {
    // Graphics object that will be drawn with the RGB layers on it
    previewGraphics = p5.createGraphics(originalImage.width, originalImage.height)

    // Extract color channels and initialize previewChannels
    initializeRGBImages()

    // Set parent's state for image dimensions
    // (These are initialized when updateWithProps() is called on initial load)
    setImageWidth(originalImage.width)
    setImageHeight(originalImage.height)
  }


  /**
   * Extract RGB channels from sourceImage and initialize RGB image variables
   */
  function initializeRGBImages() {
    // Initialize to blank images
    originalChannels[Constants.R_OFFSET] = p5.createImage(originalImage.width, originalImage.height)
    originalChannels[Constants.R_OFFSET].loadPixels()
    originalChannels[Constants.G_OFFSET] = p5.createImage(originalImage.width, originalImage.height)
    originalChannels[Constants.G_OFFSET].loadPixels()
    originalChannels[Constants.B_OFFSET] = p5.createImage(originalImage.width, originalImage.height)
    originalChannels[Constants.B_OFFSET].loadPixels()
    // Copy color channels from sourceImage.pixels
    // This is a 1D array that stores RGBA values. See docs for details:
    // https://p5js.org/reference/#/p5.Image/pixels
    originalImage.loadPixels()
    for (let i = 0; i < originalImage.pixels.length; i += 4) {
      // Red
      originalChannels[Constants.R_OFFSET].pixels[i + Constants.R_OFFSET] = originalImage.pixels[i + Constants.R_OFFSET]
      // Green
      originalChannels[Constants.G_OFFSET].pixels[i + Constants.G_OFFSET] = originalImage.pixels[i + Constants.G_OFFSET]
      // Blue
      originalChannels[Constants.B_OFFSET].pixels[i + Constants.B_OFFSET] = originalImage.pixels[i + Constants.B_OFFSET]
      // Alpha
      originalChannels[Constants.R_OFFSET].pixels[i + Constants.A_OFFSET] = originalChannels[Constants.G_OFFSET].pixels[i + Constants.A_OFFSET] = originalChannels[Constants.B_OFFSET].pixels[i + Constants.A_OFFSET] = 255
    }
    // Load into sourceChannels and previewChannels
    originalChannels[Constants.R_OFFSET].updatePixels()
    originalChannels[Constants.G_OFFSET].updatePixels()
    originalChannels[Constants.B_OFFSET].updatePixels()
    resetPreviewChannels()
  }


  /**
   * Reset previewChannels to match sourceChannels.
   */
  function resetPreviewChannels() {
    previewChannels[Constants.R_OFFSET] = originalChannels[Constants.R_OFFSET].get(0, 0, originalChannels[Constants.R_OFFSET].width, originalChannels[Constants.R_OFFSET].height)
    previewChannels[Constants.G_OFFSET] = originalChannels[Constants.G_OFFSET].get(0, 0, originalChannels[Constants.G_OFFSET].width, originalChannels[Constants.G_OFFSET].height)
    previewChannels[Constants.B_OFFSET] = originalChannels[Constants.B_OFFSET].get(0, 0, originalChannels[Constants.B_OFFSET].width, originalChannels[Constants.B_OFFSET].height)
  }


  /**
   * Returns an array with width and height to set canvas size to.
   *
   * First attempt to set height to 50% of the window, scale width accordingly.
   *
   * If new image width exceeds window width, instead set new width to 100% the window width and scale height accordingly.
   *
   * @returns {number[]}
   */
  function calculateCanvasDimensions() {
    // TODO: come up with better scale for laptop screens
    // First try to set height to 50% of window height and scale width accordingly
    let newHeight = 0.5 * p5.windowHeight
    let ratio = newHeight / originalImage.height
    let newWidth = originalImage.width * ratio
    // If newWidth > windowWidth, instead set width to 100% and scale height accordingly
    if (newWidth > p5.windowWidth) {
      newWidth = p5.windowWidth
      ratio = newWidth / originalImage.width
      newHeight = originalImage.height * ratio
    }
    return [newWidth, newHeight]
  }


  // --------------------------------------------------------------------------------
  // Load / Save Functions
  // --------------------------------------------------------------------------------

  /**
   * Takes a base64 encoded data URL with the new image file and loads it.
   *
   * Once loaded, sets sourceImage to it, resets shift/swap states, re-initializes all,
   * calls windowResized() to set canvas size to fit new image, then sets setNewFileDataURL
   * state back to null.
   *
   * @param newFileDataURL
   */
  function loadImageFile(newFileDataURL) {
    const loadCallback = (newImage) => {
      // Load image file into sourceImage
      // TODO: use .get() to create copy?
      originalImage = newImage

      // Reset shift/swap states
      resetShiftAndSwap()
      // Re-initialize image-related variables and update dimension states
      initializeAll()
      // Resize canvas
      p5.windowResized()
      // Set state back to null
      setNewFileDataURL(null)
    }

    // Have p5 load the image and pass it our callback
    p5.loadImage(newFileDataURL, loadCallback)
  }


  /**
   * Save the current result as a png.
   */
  function saveResult() {
    // TODO: better default filename? save as dialog?
    let ts = Date.now()
    p5.save(previewGraphics, `${ts}.png`)
  }


  // --------------------------------------------------------------------------------
  // Channel Shift / Swap Functions
  // --------------------------------------------------------------------------------

  /**
   * Draw preview channel to previewGraphics, applying any x/y shifts to it.
   *
   * @param channelOffset
   */
  function drawChannelToPreviewGraphics(channelOffset) {
    let [xShift, yShift] = channelShiftValues[channelOffset]

    // Grab subsection of image from (0,0) with dimensions (width - xShift * height - yShift).
    // Draw on canvas from (xShift, yShift) to bottom right corner of canvas.
    previewGraphics.blend(
      previewChannels[channelOffset],
      0, 0, previewChannels[channelOffset].width - xShift, previewChannels[channelOffset].height - yShift,
      xShift, yShift, previewChannels[channelOffset].width - xShift, previewChannels[channelOffset].height - yShift,
      p5.ADD
      )
    // If xShift > 0, grab subsection of image from (width - xShift, 0) with dimensions (xShift * height - yShift).
    // Draw on canvas from (0, yShift) to left edge of x shifted image.
    if (xShift > 0) {
      previewGraphics.blend(
        previewChannels[channelOffset],
        previewChannels[channelOffset].width - xShift, 0, xShift, previewChannels[channelOffset].height - yShift,
        0, yShift, xShift, previewChannels[channelOffset].height - yShift,
        p5.ADD
      )
    }
    // If yShift > 0, grab subsection of image from (0, height - yShift) with dimensions (width - xShift * yShift).
    // Draw on canvas from (xShift, 0) to the top edge of the y shifted image.
    if (yShift > 0) {
      previewGraphics.blend(
        previewChannels[channelOffset],
        0, previewChannels[channelOffset].height - yShift, previewChannels[channelOffset].width - xShift, yShift,
        xShift, 0, previewChannels[channelOffset].width - xShift, yShift,
        p5.ADD
      )
    }
    // If both shift values > 0, grab subsection of image from (width - xShift, height - yShift) with dimensions (xShift * yShift).
    // Draw on canvas from (0,0) to top left corner of x/y shifted image.
    if (xShift > 0 && yShift > 0) {
      previewGraphics.blend(
        previewChannels[channelOffset],
        previewChannels[channelOffset].width - xShift, previewChannels[channelOffset].height - yShift, xShift, yShift,
        0, 0, xShift, yShift,
        p5.ADD
      )
    }
  }


  /**
   * Swap 2 color channels. Params are indexes into sourceChannels.
   *
   * @param sourceChannelOffset
   * @param targetChannelOffset
   */
  function swapChannels(sourceChannelOffset, targetChannelOffset) {
    // TODO: access array directly? Or assign final with .get() and set temp vars to undefined
    // Load source channel image and create a new image to be modified
    let sourceChannelImage = previewChannels[sourceChannelOffset]
    sourceChannelImage.loadPixels()
    let newSourceChannelImage = p5.createImage(sourceChannelImage.width, sourceChannelImage.height)
    newSourceChannelImage.loadPixels()

    // Load target channel image and create a new image to be modified
    let targetChannelImage = previewChannels[targetChannelOffset]
    targetChannelImage.loadPixels()
    let newTargetChannelImage = p5.createImage(targetChannelImage.width, targetChannelImage.height)
    newTargetChannelImage.loadPixels()

    // Iterate thru pixels
    for (let i = 0; i < newSourceChannelImage.pixels.length; i += 4) {
      // Set new source channel pixel to value of target channel pixel
      newSourceChannelImage.pixels[i + sourceChannelOffset] = targetChannelImage.pixels[i + targetChannelOffset]
      newSourceChannelImage.pixels[i + Constants.A_OFFSET] = 255
      // Set new target channel pixel to value of source channel pixel
      newTargetChannelImage.pixels[i + targetChannelOffset] = sourceChannelImage.pixels[i + sourceChannelOffset]
      newTargetChannelImage.pixels[i + Constants.A_OFFSET] = 255
    }
    newSourceChannelImage.updatePixels()
    newTargetChannelImage.updatePixels()

    // Load into previewChannels
    previewChannels[sourceChannelOffset] = newSourceChannelImage
    previewChannels[targetChannelOffset] = newTargetChannelImage
  }
}