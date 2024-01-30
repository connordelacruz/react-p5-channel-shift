import React from 'react';
import { ReactP5Wrapper } from '@p5-wrapper/react'

import { ChannelShiftSketch } from './ChannelShiftSketch'
import { Container, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup } from '@mui/material'

function App() {
  // TODO: add state, pass props to sketch
  return (
    <React.Fragment>
      <ReactP5Wrapper sketch={ ChannelShiftSketch }/>
      <Container maxWidth="md">
        <Grid container justifyContent="center" spacing={ 2 } my={ 2 }>
          <Grid item xs={ 6 }>
            <Paper
              variant="outlined"
              sx={{ p: 2 }}>
              <FormControl>
                <FormLabel id="source-channel-label">Source Channel</FormLabel>
                <RadioGroup
                  aria-labelledby="source-channel-label"
                  name="source-channel-radio-group">
                  <FormControlLabel value="red" control={ <Radio/> } label="Red"/>
                  <FormControlLabel value="green" control={ <Radio/> } label="Green"/>
                  <FormControlLabel value="blue" control={ <Radio/> } label="Blue"/>
                </RadioGroup>
              </FormControl>
            </Paper>
          </Grid>
          <Grid item xs={ 6 }>
            <Paper
              variant="outlined"
              sx={ { p: 2 } }>
              <FormControl>
                <FormLabel id="target-channel-label">Target Channel</FormLabel>
                <RadioGroup
                  aria-labelledby="target-channel-label"
                  name="target-channel-radio-group">
                  <FormControlLabel value="red" control={ <Radio/> } label="Red"/>
                  <FormControlLabel value="green" control={ <Radio/> } label="Green"/>
                  <FormControlLabel value="blue" control={ <Radio/> } label="Blue"/>
                </RadioGroup>
              </FormControl>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default App
