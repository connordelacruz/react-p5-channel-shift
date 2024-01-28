
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

  // Preview RGB channels, based on sourceChannels but with shifts/swaps applied
  let previewChannels = []
  // Graphics object for preview + RGB channel images
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

    // Extract color channels and initialize previewChannels
    initializeRGBImages(sourceImage)

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
    shiftChannels(p5.frameCount * 5 % sourceImage.width, 0, R_OFFSET)
    shiftChannels(0, p5.frameCount * 5 % sourceImage.height, B_OFFSET)
    shiftChannels(p5.mouseX % sourceImage.width, p5.mouseY % sourceImage.height, G_OFFSET)

    // Blend RGB channels
    previewChannels.forEach((channelImage, i) => {
      previewGraphics.blend(channelImage, 0, 0, channelImage.width, channelImage.height, 0, 0, previewGraphics.width, previewGraphics.height, p5.ADD)
    })

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
    let sourceRImage = p5.createImage(sourceImage.width, sourceImage.height)
    sourceRImage.loadPixels()
    let sourceGImage = p5.createImage(sourceImage.width, sourceImage.height)
    sourceGImage.loadPixels()
    let sourceBImage = p5.createImage(sourceImage.width, sourceImage.height)
    sourceBImage.loadPixels()
    // Copy color channels from sourceImage.pixels
    // This is a 1D array that stores RGBA values. See docs for details:
    // https://p5js.org/reference/#/p5.Image/pixels
    sourceImage.loadPixels()
    for (let i = 0; i < sourceImage.pixels.length; i += 4) {
      // Red
      sourceRImage.pixels[i + R_OFFSET] = sourceImage.pixels[i + R_OFFSET]
      // Green
      sourceGImage.pixels[i + G_OFFSET] = sourceImage.pixels[i + G_OFFSET]
      // Blue
      sourceBImage.pixels[i + B_OFFSET] = sourceImage.pixels[i + B_OFFSET]
      // Alpha
      sourceRImage.pixels[i + A_OFFSET] = sourceGImage.pixels[i + A_OFFSET] = sourceBImage.pixels[i + A_OFFSET] = 255
    }
    // Load into sourceChannels and previewChannels
    // Red
    sourceRImage.updatePixels()
    sourceChannels[R_OFFSET] = sourceRImage
    previewChannels[R_OFFSET] = sourceRImage.get(0, 0, sourceRImage.width, sourceRImage.height)
    // Green
    sourceGImage.updatePixels()
    sourceChannels[G_OFFSET] = sourceGImage
    previewChannels[G_OFFSET] = sourceGImage.get(0, 0, sourceGImage.width, sourceGImage.height)
    // Blue
    sourceBImage.updatePixels()
    sourceChannels[B_OFFSET] = sourceBImage
    previewChannels[B_OFFSET] = sourceBImage.get(0, 0, sourceBImage.width, sourceBImage.height)
  }


  // TODO: DOC N IMPLEMENT
  function shiftChannels(xShift, yShift, sourceChannelOffset, targetChannelOffset = null) {
    if (targetChannelOffset === null) {
      targetChannelOffset = sourceChannelOffset
    }
    let sourceChannelImage = sourceChannels[sourceChannelOffset]
    sourceChannelImage.loadPixels()
    // TODO: this does not account for swapping target to source
    let newChannelImage = p5.createImage(sourceChannelImage.width, sourceChannelImage.height)
    newChannelImage.loadPixels()

    for (let i = 0; i < sourceChannelImage.pixels.length; i += 4) {
      // Convert 1D index into x,y coords for source
      let sourceX = (i / 4) % sourceChannelImage.width
      let sourceY = Math.floor((i / 4) / sourceChannelImage.width)
      // Shift source coords
      let targetX = (sourceX + xShift) % sourceChannelImage.width
      let targetY = (sourceY + yShift) % sourceChannelImage.height
      // Convert 2D target coords to 1D index
      let targetIndex = (targetY * sourceChannelImage.width + targetX) * 4
      newChannelImage.pixels[targetIndex + targetChannelOffset] = sourceChannelImage.pixels[i + sourceChannelOffset]
      newChannelImage.pixels[targetIndex + A_OFFSET] = 255
    }
    newChannelImage.updatePixels()

    previewChannels[targetChannelOffset] = newChannelImage
  }


  // TODO: merge w/ shiftChannels()
  /**
   * Swap 2 color channels. Params are indexes into sourceChannels.
   *
   * @param channelOffset0
   * @param channelOffset1
   */
  function swapChannels(channelOffset0, channelOffset1) {
    let channelImage0 = previewChannels[channelOffset0]
    channelImage0.loadPixels()
    let newChannelImage0 = p5.createImage(channelImage0.width, channelImage0.height)
    newChannelImage0.loadPixels()

    let channelImage1 = previewChannels[channelOffset1]
    channelImage1.loadPixels()
    let newChannelImage1 = p5.createImage(channelImage1.width, channelImage1.height)
    newChannelImage1.loadPixels()

    for (let i = 0; i < newChannelImage0.pixels.length; i += 4) {
      newChannelImage0.pixels[i + channelOffset0] = channelImage1.pixels[i + channelOffset1]
      newChannelImage0.pixels[i + A_OFFSET] = 255
      newChannelImage1.pixels[i + channelOffset1] = channelImage0.pixels[i + channelOffset0]
      newChannelImage1.pixels[i + A_OFFSET] = 255
    }
    newChannelImage0.updatePixels()
    newChannelImage1.updatePixels()

    // Load into previewChannels
    previewChannels[channelOffset0] = newChannelImage0
    previewChannels[channelOffset1] = newChannelImage1
  }
}