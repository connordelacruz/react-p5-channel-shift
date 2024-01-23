
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
  // TODO: separate previewChannels array

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

    // Extract color channels
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
    // Blend RGB channels
    sourceChannels.forEach((channelImage, i) => {
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
    sourceRImage.updatePixels()
    sourceChannels[R_OFFSET] = sourceRImage
    sourceGImage.updatePixels()
    sourceChannels[G_OFFSET] = sourceGImage
    sourceBImage.updatePixels()
    sourceChannels[B_OFFSET] = sourceBImage
  }


  /**
   * Swap 2 color channels. Params are indexes into sourceChannels.
   *
   * @param channelOffset0
   * @param channelOffset1
   */
  function swapChannels(channelOffset0, channelOffset1) {
    let channelImage0 = sourceChannels[channelOffset0]
    let newChannelImage0 = p5.createImage(channelImage0.width, channelImage0.height)
    newChannelImage0.loadPixels()

    let channelImage1 = sourceChannels[channelOffset1]
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

    // TODO: use previewChannels instead
    sourceChannels[channelOffset0] = newChannelImage0
    sourceChannels[channelOffset1] = newChannelImage1
  }
}