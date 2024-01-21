
export function ChannelShiftSketch(p5) {
  const R_OFFSET = 0
  const G_OFFSET = 1
  const B_OFFSET = 2
  const A_OFFSET = 3

  let sourceImage, rImage, gImage, bImage

  p5.preload = () => {
    sourceImage = p5.loadImage('test0.jpg')
  }

  p5.setup = () => {
    // Match window width, scale height accordingly
    p5.createCanvas(p5.windowWidth, (p5.windowWidth / sourceImage.width) * sourceImage.height)
    // Due to weird scoping, need to define windowResized() here so it can use sourceImage dimensions
    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, (p5.windowWidth / sourceImage.width) * sourceImage.height)
    }

    // Extract color channels
    // Initialize to blank images
    rImage = p5.createImage(sourceImage.width, sourceImage.height)
    rImage.loadPixels()
    gImage = p5.createImage(sourceImage.width, sourceImage.height)
    gImage.loadPixels()
    bImage = p5.createImage(sourceImage.width, sourceImage.height)
    bImage.loadPixels()
    // Copy color channels from sourceImage.pixels
    // This is a 1D array that stores RGBA values. See docs for details:
    // https://p5js.org/reference/#/p5.Image/pixels
    sourceImage.loadPixels()
    for (let i = 0; i < sourceImage.pixels.length; i += 4) {
      // Red
      rImage.pixels[i] = sourceImage.pixels[i]
      // Green
      gImage.pixels[i + 1] = sourceImage.pixels[i + 1]
      // Blue
      bImage.pixels[i + 2] = sourceImage.pixels[i + 2]
      // Alpha
      rImage.pixels[i + 3] = gImage.pixels[i + 3] = bImage.pixels[i + 3] = 255
    }
    rImage.updatePixels()
    gImage.updatePixels()
    bImage.updatePixels()
  }

  p5.draw = () => {
    p5.background(0)
    // TODO: figure out how to wrap image when it extends past the canvas
    // TODO TESTING
    let [newRImage, newBImage] = swapChannels(rImage, R_OFFSET, bImage, B_OFFSET)
    // Blend RGB channels
    p5.blend(newRImage, 0, 0, rImage.width, rImage.height, 0, 0, p5.width, p5.height, p5.ADD)
    // p5.blend(rImage, 0, 0, rImage.width, rImage.height, 0, 0, p5.width, p5.height, p5.ADD)
    p5.blend(gImage, 0, 0, gImage.width, gImage.height, 0, 0, p5.width, p5.height, p5.ADD)
    // p5.blend(bImage, 0, 0, bImage.width, bImage.height, 0, 0, p5.width, p5.height, p5.ADD)
    p5.blend(newBImage, 0, 0, bImage.width, bImage.height, 0, 0, p5.width, p5.height, p5.ADD)
  }

  // TODO: doc n implement
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