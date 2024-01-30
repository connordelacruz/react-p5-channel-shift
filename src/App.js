import React from 'react';
import { ReactP5Wrapper } from '@p5-wrapper/react'

import { ChannelShiftSketch } from './ChannelShiftSketch'
import {
  Box,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup, Slider,
  Typography
} from '@mui/material'

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
              sx={{ p: 2 }}
            >
              <FormControl>
                <FormLabel id="source-channel-label">Source Channel</FormLabel>
                <RadioGroup
                  defaultValue="red"
                  aria-labelledby="source-channel-label"
                  name="source-channel-radio-group"
                >
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
              sx={{ p: 2 }}
            >
              <FormControl>
                <FormLabel id="target-channel-label">Target Channel</FormLabel>
                <RadioGroup
                  defaultValue="red"
                  aria-labelledby="target-channel-label"
                  name="target-channel-radio-group"
                >
                  <FormControlLabel value="red" control={ <Radio/> } label="Red"/>
                  <FormControlLabel value="green" control={ <Radio/> } label="Green"/>
                  <FormControlLabel value="blue" control={ <Radio/> } label="Blue"/>
                </RadioGroup>
              </FormControl>
            </Paper>
          </Grid>
          <Grid item xs={ 12 }>
            <Paper
              variant="outlined"
              sx={{ p: 2 }}
            >
              {/*TODO https://mui.com/material-ui/react-slider/#slider-with-input-field*/}
              <Box
                sx={{ p: 2 }}
              >
                <Typography id="x-shift-slider-label">X Shift</Typography>
                <Slider
                  defaultValue={0}
                  min={0}
                  max={100}
                  valueLabelDisplay="auto"
                  marks={[
                    {value: 0, label: '0%'},
                    {value: 100, label: '100%'}
                  ]}
                  aria-labelledby="x-shift-slider-label"
                />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={ 12 }>
            <Paper
              variant="outlined"
              sx={{ p: 2 }}
            >
              {/*TODO https://mui.com/material-ui/react-slider/#slider-with-input-field*/}
              <Box
                sx={{ p: 2 }}
              >
                <Typography id="y-shift-slider-label">Y Shift</Typography>
                <Slider
                  defaultValue={0}
                  min={0}
                  max={100}
                  valueLabelDisplay="auto"
                  marks={[
                    {value: 0, label: '0%'},
                    {value: 100, label: '100%'}
                  ]}
                  aria-labelledby="y-shift-slider-label"
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default App
