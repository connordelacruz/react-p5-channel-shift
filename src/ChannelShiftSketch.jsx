
export function ChannelShiftSketch(p5) {
  // Offsets into p5.js pixels array for RGBA
  // Also used as indexes into sourceChannels
  const R_OFFSET = 0
  const G_OFFSET = 1
  const B_OFFSET = 2
  const A_OFFSET = 3

  // Source image + RGB channel images
  let sourceImage
  let sourceChannels = []
  // Preview RGB channels, based on sourceChannels but with swaps applied
  let previewChannels = []
  // x/y shift values to apply to each preview channel
  let channelShiftValues = []

  // Graphics object to draw swapped/shifted channels onto
  let previewGraphics


  // ================================================================================
  // p5 Sketch Methods
  // ================================================================================

  /**
   * Preload source image
   */
  p5.preload = () => {
    sourceImage = p5.loadImage('test0.jpg')
  }


  /**
   * p5 setup
   */
  p5.setup = () => {
    // Match window width, scale height accordingly
    p5.createCanvas(p5.windowWidth, (p5.windowWidth / sourceImage.width) * sourceImage.height)

    // Graphics object that will be drawn with the RGB layers on it
    previewGraphics = p5.createGraphics(sourceImage.width, sourceImage.height)

    // Initialize shift values to 0,0
    channelShiftValues[R_OFFSET] = [0, 0]
    channelShiftValues[G_OFFSET] = [0, 0]
    channelShiftValues[B_OFFSET] = [0, 0]

    // Extract color channels and initialize previewChannels
    initializeRGBImages()

    // --------------------------------------------------------------------------------
    // additional p5.js methods (need to be defined here because of variable scope)
    // --------------------------------------------------------------------------------

    /**
     * p5 windowResized
     */
    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, (p5.windowWidth / sourceImage.width) * sourceImage.height)
    }

    /**
     * p5 keyPressed
     *
     * TODO: For testing, remove once GUI is implemented
     */
    p5.keyPressed = () => {
      // Randomize
      if (p5.key === 'r') {
        // Randomly pick 2 channels to swap
        let randyChannels = [R_OFFSET, G_OFFSET, B_OFFSET]
        let sourceChannel = p5.random(randyChannels)
        randyChannels.splice(randyChannels.indexOf(sourceChannel), 1)
        let targetChannel = p5.random(randyChannels)
        // Swap em
        swapChannels(sourceChannel, targetChannel)
      }
      // Save
      else if (p5.key === 's') {
        let ts = Date.now()
        p5.save(previewGraphics, `${ts}.png`)
      }
    }
  }


  /**
   * p5 draw
   */
  p5.draw = () => {
    previewGraphics.background(0)
    // TODO DEBUGGING
    channelShiftValues[R_OFFSET][0] = p5.frameCount * 5 % sourceImage.width
    channelShiftValues[G_OFFSET] = [p5.mouseX % sourceImage.width, p5.mouseY % sourceImage.height]
    // channelShiftValues[G_OFFSET] = [p5.frameCount * 5 % sourceImage.width, p5.frameCount * 5 % sourceImage.height]
    channelShiftValues[B_OFFSET][1] = p5.frameCount * 5 % sourceImage.height

    // Blend RGB channels
    drawChannelToPreviewGraphics(R_OFFSET)
    drawChannelToPreviewGraphics(G_OFFSET)
    drawChannelToPreviewGraphics(B_OFFSET)

    // Render to screen
    p5.image(previewGraphics, 0, 0, p5.width, p5.height)
  }


  // ================================================================================
  // Helper functions
  // ================================================================================

  /**
   * Extract RGB channels from sourceImage and initialize RGB image variables
   */
  function initializeRGBImages() {
    // Initialize to blank images
    sourceChannels[R_OFFSET] = p5.createImage(sourceImage.width, sourceImage.height)
    sourceChannels[R_OFFSET].loadPixels()
    sourceChannels[G_OFFSET] = p5.createImage(sourceImage.width, sourceImage.height)
    sourceChannels[G_OFFSET].loadPixels()
    sourceChannels[B_OFFSET] = p5.createImage(sourceImage.width, sourceImage.height)
    sourceChannels[B_OFFSET].loadPixels()
    // Copy color channels from sourceImage.pixels
    // This is a 1D array that stores RGBA values. See docs for details:
    // https://p5js.org/reference/#/p5.Image/pixels
    sourceImage.loadPixels()
    for (let i = 0; i < sourceImage.pixels.length; i += 4) {
      // Red
      sourceChannels[R_OFFSET].pixels[i + R_OFFSET] = sourceImage.pixels[i + R_OFFSET]
      // Green
      sourceChannels[G_OFFSET].pixels[i + G_OFFSET] = sourceImage.pixels[i + G_OFFSET]
      // Blue
      sourceChannels[B_OFFSET].pixels[i + B_OFFSET] = sourceImage.pixels[i + B_OFFSET]
      // Alpha
      sourceChannels[R_OFFSET].pixels[i + A_OFFSET] = sourceChannels[G_OFFSET].pixels[i + A_OFFSET] = sourceChannels[B_OFFSET].pixels[i + A_OFFSET] = 255
    }
    // Load into sourceChannels and previewChannels
    // Red
    sourceChannels[R_OFFSET].updatePixels()
    previewChannels[R_OFFSET] = sourceChannels[R_OFFSET].get(0, 0, sourceChannels[R_OFFSET].width, sourceChannels[R_OFFSET].height)
    // Green
    sourceChannels[G_OFFSET].updatePixels()
    previewChannels[G_OFFSET] = sourceChannels[G_OFFSET].get(0, 0, sourceChannels[G_OFFSET].width, sourceChannels[G_OFFSET].height)
    // Blue
    sourceChannels[B_OFFSET].updatePixels()
    previewChannels[B_OFFSET] = sourceChannels[B_OFFSET].get(0, 0, sourceChannels[B_OFFSET].width, sourceChannels[B_OFFSET].height)
  }


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
    let channelImage0 = previewChannels[sourceChannelOffset]
    channelImage0.loadPixels()
    let newChannelImage0 = p5.createImage(channelImage0.width, channelImage0.height)
    newChannelImage0.loadPixels()

    let channelImage1 = previewChannels[targetChannelOffset]
    channelImage1.loadPixels()
    let newChannelImage1 = p5.createImage(channelImage1.width, channelImage1.height)
    newChannelImage1.loadPixels()

    for (let i = 0; i < newChannelImage0.pixels.length; i += 4) {
      newChannelImage0.pixels[i + sourceChannelOffset] = channelImage1.pixels[i + targetChannelOffset]
      newChannelImage0.pixels[i + A_OFFSET] = 255
      newChannelImage1.pixels[i + targetChannelOffset] = channelImage0.pixels[i + sourceChannelOffset]
      newChannelImage1.pixels[i + A_OFFSET] = 255
    }
    newChannelImage0.updatePixels()
    newChannelImage1.updatePixels()

    // Load into previewChannels
    previewChannels[sourceChannelOffset] = newChannelImage0
    previewChannels[targetChannelOffset] = newChannelImage1
  }
}