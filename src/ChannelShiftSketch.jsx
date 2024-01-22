
export function ChannelShiftSketch(p5) {
  const R_OFFSET = 0
  const G_OFFSET = 1
  const B_OFFSET = 2
  const A_OFFSET = 3

  // Source image + RGB channel images
  let sourceImage, sourceRImage, sourceGImage, sourceBImage
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

    /**
     * p5 windowResized
     *
     * Due to weird scoping, need to define windowResized() here so it can use sourceImage dimensions
     */
    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, (p5.windowWidth / sourceImage.width) * sourceImage.height)
    }

    // Graphics object that will be drawn with the RGB layers on it
    previewGraphics = p5.createGraphics(sourceImage.width, sourceImage.height)

    // Extract color channels
    initializeRGBImages(sourceImage)
  }


  /**
   * p5 draw
   */
  p5.draw = () => {
    // TODO TESTING
    let [newRImage, newBImage] = swapChannels(sourceRImage, R_OFFSET, sourceBImage, B_OFFSET)

    // Blend RGB channels
    previewGraphics.background(0)
    previewGraphics.blend(newRImage, 0, 0, sourceRImage.width, sourceRImage.height, 0, 0, previewGraphics.width, previewGraphics.height, p5.ADD)
    previewGraphics.blend(sourceGImage, 0, 0, sourceGImage.width, sourceGImage.height, 0, 0, previewGraphics.width, previewGraphics.height, p5.ADD)
    previewGraphics.blend(newBImage, 0, 0, sourceBImage.width, sourceBImage.height, 0, 0, previewGraphics.width, previewGraphics.height, p5.ADD)

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
    sourceRImage = p5.createImage(sourceImage.width, sourceImage.height)
    sourceRImage.loadPixels()
    sourceGImage = p5.createImage(sourceImage.width, sourceImage.height)
    sourceGImage.loadPixels()
    sourceBImage = p5.createImage(sourceImage.width, sourceImage.height)
    sourceBImage.loadPixels()
    // Copy color channels from sourceImage.pixels
    // This is a 1D array that stores RGBA values. See docs for details:
    // https://p5js.org/reference/#/p5.Image/pixels
    sourceImage.loadPixels()
    for (let i = 0; i < sourceImage.pixels.length; i += 4) {
      // Red
      sourceRImage.pixels[i] = sourceImage.pixels[i]
      // Green
      sourceGImage.pixels[i + 1] = sourceImage.pixels[i + 1]
      // Blue
      sourceBImage.pixels[i + 2] = sourceImage.pixels[i + 2]
      // Alpha
      sourceRImage.pixels[i + 3] = sourceGImage.pixels[i + 3] = sourceBImage.pixels[i + 3] = 255
    }
    sourceRImage.updatePixels()
    sourceGImage.updatePixels()
    sourceBImage.updatePixels()
  }


  // TODO: doc
  function swapChannels(channelImage0, channelOffset0, channelImage1, channelOffset1) {
    let newChannelImage0 = p5.createImage(channelImage0.width, channelImage1.height)
    newChannelImage0.loadPixels()
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

    return [newChannelImage0, newChannelImage1]
  }
}