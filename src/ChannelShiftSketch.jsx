
export function ChannelShiftSketch(p5) {

  let sourceImage, rImage, gImage, bImage

  p5.preload = () => {
    sourceImage = p5.loadImage('test0.jpg')
  }

  p5.setup = () => {
    // Match window width, scale height accordingly
    let renderedImageHeight = (p5.windowWidth / sourceImage.width) * sourceImage.height
    p5.createCanvas(p5.windowWidth, renderedImageHeight)

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
    // Blend RGB channels
    p5.blend(rImage, 0, 0, rImage.width, rImage.height, 0, 0, p5.width, p5.height, p5.ADD)
    p5.blend(gImage, 0, 0, gImage.width, gImage.height, 0, 0, p5.width, p5.height, p5.ADD)
    p5.blend(bImage, 0, 0, bImage.width, bImage.height, 0, 0, p5.width, p5.height, p5.ADD)
  }

  p5.windowResized = () => {
    // Match window width, scale height accordingly
    let renderedImageHeight = (p5.windowWidth / sourceImage.width) * sourceImage.height
    p5.resizeCanvas(p5.windowWidth, renderedImageHeight)
  }

}