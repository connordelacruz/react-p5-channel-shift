
export function ChannelShiftSketch(p5) {

  let sourceImage

  p5.preload = () => {
    sourceImage = p5.loadImage('test0.jpg')
  }

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight)
  }

  p5.draw = () => {
    // Match window width, scale height accordingly
    p5.image(sourceImage, 0, 0, p5.windowWidth, (p5.windowWidth / sourceImage.width) * sourceImage.height)
  }

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight)
  }

}