import React from 'react';
import { ReactP5Wrapper } from '@p5-wrapper/react'

import { ChannelShiftSketch } from './ChannelShiftSketch'

function App() {
  return (
    <ReactP5Wrapper sketch={ChannelShiftSketch}/>
  )
}

export default App
