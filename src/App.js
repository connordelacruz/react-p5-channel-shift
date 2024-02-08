import React from 'react';
import { ReactP5Wrapper } from '@p5-wrapper/react'

import { ChannelShiftSketch } from './ChannelShiftSketch'
import {
  AppBar,
  Box, Button,
  Container, CssBaseline, Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup, Slider, Stack, styled, Tab, Tabs, Toolbar, Tooltip,
  Typography
} from '@mui/material'
import { CheckCircleOutline, FileUpload, RestartAlt, Save } from '@mui/icons-material'


function App() {
  // ================================================================================
  // Constants
  // ================================================================================
  // Indexes into RGB arrays + values of radio buttons
  const R_OFFSET = 0
  const G_OFFSET = 1
  const B_OFFSET = 2

  // ================================================================================
  // State and UI
  // ================================================================================
  // TODO: organize these by order of UI appearance?

  // --------------------------------------------------------------------------------
  // Image Dimensions
  // --------------------------------------------------------------------------------
  // Image dimensions (sketch sets these after image is loaded)
  const [imageWidth, setImageWidth] = React.useState(0)
  const [imageHeight, setImageHeight] = React.useState(0)

  // --------------------------------------------------------------------------------
  // Channel Swap
  // --------------------------------------------------------------------------------
  // Source and target channels
  const [sourceChannel, setSourceChannel] = React.useState(R_OFFSET)
  const [targetChannel, setTargetChannel] = React.useState(R_OFFSET)

  // Since RGB radio elements are identical in source and target, use this method to generate common markup
  const ChannelRadioElements = () => {
    return (
      <React.Fragment>
        <FormControlLabel
          value={R_OFFSET}
          label="Red"
          control={ <Radio color="error"/> }
          sx={{ color: 'error.main' }}
        />
        <FormControlLabel
          value={G_OFFSET}
          label="Green"
          control={ <Radio color="success"/> }
          sx={{ color: 'success.main' }}
        />
        <FormControlLabel
          value={B_OFFSET}
          label="Blue"
          control={ <Radio color="primary"/> }
          sx={{ color: 'primary.main' }}
        />
      </React.Fragment>
    )
  }

  // onChange method for source/target channel radio groups
  const channelRadioOnChangeHandler = setterFunction => {
    return (event) => {
      setterFunction(event.target.value)
    }
  }

  // --------------------------------------------------------------------------------
  // Channel Shift
  // --------------------------------------------------------------------------------
  // x/y shift current channel selection
  const [selectedShiftChannel, setSelectedShiftChannel] = React.useState(R_OFFSET)

  /**
   * onChange method for selecting x/y shift channel
   */
  const shiftChannelSelectionOnChangeHandler = (event) => {
    setSelectedShiftChannel(event.target.value)
  }

  /**
   * Returns default value of all 0's for each channel
   *
   * @return array
   */
  const getChannelShiftValuesDefault = () => {
    const channelShiftValuesDefault = []
    channelShiftValuesDefault[R_OFFSET] = [0, 0]
    channelShiftValuesDefault[G_OFFSET] = [0, 0]
    channelShiftValuesDefault[B_OFFSET] = [0, 0]
    return channelShiftValuesDefault
  }

  // Initialize shift values state
  const [channelShiftValues, setChannelShiftValues] = React.useState(getChannelShiftValuesDefault())

  /**
   * Set a new shift value at the selected shift channel
   *
   * @param coordinateIndex 0 for x, 1 for y
   * @param newValue New shift value to set
   */
  const setChannelShiftValue = (coordinateIndex, newValue) => {
    const newChannelShiftValues = [...channelShiftValues]
    // Update selected targetChannel
    newChannelShiftValues[selectedShiftChannel][coordinateIndex] = newValue
    setChannelShiftValues(newChannelShiftValues)
  }

  /**
   * Returns onChange method for x/y shift sliders
   *
   * @param coordinateIndex 0 for x, 1 for y
   *
   * @return onChange handler function for x/y shift slider
   */
  const shiftSliderOnChangeHandler = coordinateIndex => {
    return (event, newValue) => {
      setChannelShiftValue(coordinateIndex, newValue)
    }
  }

  // --------------------------------------------------------------------------------
  // Change Detection Helpers
  // --------------------------------------------------------------------------------

  /**
   * Returns true if channels were swapped during this step.
   *
   * @return {boolean}
   */
  const swapModifiedDuringStep = () => {
    return parseInt(sourceChannel) !== parseInt(targetChannel)
  }

  /**
   * Returns true if channels were shifted during this step.
   *
   * @return {boolean}
   */
  const shiftModifiedDuringStep = () => {
    let channelShiftValuesDefault = getChannelShiftValuesDefault()
    return JSON.stringify(channelShiftValuesDefault) !== JSON.stringify(channelShiftValues)
  }

  /**
   * Returns true if any changes were made during this step.
   *
   * @return {boolean}
   */
  const imageModifiedDuringStep = () => {
    return swapModifiedDuringStep() || shiftModifiedDuringStep()
  }

  // --------------------------------------------------------------------------------
  // Reset Button
  // --------------------------------------------------------------------------------

  /**
   * Reset all shift/swap states
   */
  const resetShiftAndSwap = () => {
    setSourceChannel(R_OFFSET)
    setTargetChannel(R_OFFSET)
    setChannelShiftValues(getChannelShiftValuesDefault())
  }

  // --------------------------------------------------------------------------------
  // Confirm Button
  // --------------------------------------------------------------------------------
  // Set to true when confirm button is clicked, sketch will handle confirm and set back to false when complete
  const [shouldConfirmResult, setShouldConfirmResult] = React.useState(false)

  /**
   * Confirm button onClick handler
   */
  const confirmButtonOnClick = () => {
    setShouldConfirmResult(true)
  }

  /**
   * Post-confirm method, called from sketch after handling the confirmation.
   *
   * Resets shift/swap states and sets shouldConfirmResult state to false.
   */
  const postConfirmResult = () => {
    resetShiftAndSwap()
    setShouldConfirmResult(false)
  }

  // --------------------------------------------------------------------------------
  // Load Image Button
  // --------------------------------------------------------------------------------
  // State for uploaded image data. Initialized to null, set to base64 data URL once file is loaded.
  // Sketch will load data as image and set to null again when complete
  const [newFileDataURL, setNewFileDataURL] = React.useState(null)

  // Styled hidden input element. Required to use button as file input with MUI
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  })

  /**
   * onChange listener for file input.
   *
   * If there's a file selected and it's an image file, read it as a
   * base64 data URL and set newFileDataURL to it.
   */
  const loadImageFileInputOnChange = (event) => {
    if (event.target.files.length > 0) {
      let file = event.target.files[0]
      // Verify it's an image
      if (file.type.split('/')[0] === 'image') {
        // Read file as base64 data URL
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          setNewFileDataURL(reader.result)
        }
      }
    }
  }

  // --------------------------------------------------------------------------------
  // Save Image Button
  // --------------------------------------------------------------------------------
  // Set to true when save button is clicked, sketch will save image and set back to false when complete
  const [shouldSaveResult, setShouldSaveResult] = React.useState(false)

  /**
   * Save button onClick handler
   */
  const saveButtonOnClick = () => {
    setShouldSaveResult(true)
  }

  // --------------------------------------------------------------------------------
  // Tool Tabs
  // --------------------------------------------------------------------------------
  // Constants for tab values
  const SHIFT_TAB_VALUE = 'shift'
  const SWAP_TAB_VALUE = 'swap'
  // Currently selected tool tab
  const [selectedToolTab, setSelectedToolTab] = React.useState(SHIFT_TAB_VALUE)

  // onChange handler for tool tabs
  const toolTabsOnChangeHandler = (event, newValue) => {
    setSelectedToolTab(newValue)
  }


  // ================================================================================
  // Render
  // ================================================================================

  return (
    <React.Fragment>
      <CssBaseline/>
      {/*App Bar, Canvas, and Tool Tabs Container*/}
      <Paper
        sx={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          bgcolor: 'gray',
          zIndex: 999,
        }}
        square
        elevation={3}
      >
        {/*App Bar*/}
        <AppBar
          position="static"
          color="default"
          elevation={0}
        >
          <Toolbar>
            <Typography
              color="primary"
              variant="h6"
              component="div"
              sx={ { flexGrow: 1 } }
            >
              Channel Shift / Swap
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-evenly"
              spacing={ 2 }
            >
              <Tooltip title="Load a new image" placement="bottom">
                <span>
                  <Button
                    startIcon={ <FileUpload/> }
                    component="label"
                    variant="outlined"
                    color="primary"
                  >
                  Load Image
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    onChange={ loadImageFileInputOnChange }
                    id="load-image-file-input"/>
                  </Button>
                </span>
              </Tooltip>
              <Tooltip title="Download current result as full-res PNG" placement="bottom">
                <span>
                  <Button
                    onClick={ saveButtonOnClick }
                    startIcon={ <Save/> }
                    variant="outlined"
                    color="primary"
                  >
                  Save Image
                </Button>
                </span>
              </Tooltip>
            </Stack>
          </Toolbar>
        </AppBar>

        {/*Canvas*/}
        <ReactP5Wrapper
        sketch={ ChannelShiftSketch }
        setImageWidth={ setImageWidth } setImageHeight={ setImageHeight }
        sourceChannel={ sourceChannel } targetChannel={ targetChannel }
        channelShiftValues={ channelShiftValues }
        newFileDataURL={newFileDataURL} setNewFileDataURL={setNewFileDataURL}
        resetShiftAndSwap={ resetShiftAndSwap }
        shouldSaveResult={ shouldSaveResult } setShouldSaveResult={ setShouldSaveResult }
        shouldConfirmResult={ shouldConfirmResult } postConfirmResult={ postConfirmResult }
        />

        {/*Tool Tabs*/}
        <Box
          sx={{
            width: '100%',
            bgcolor: 'background.default'
          }}
        >
          <Tabs
            value={selectedToolTab}
            onChange={toolTabsOnChangeHandler}
            variant="fullWidth"
          >
            <Tab value={SHIFT_TAB_VALUE} label={`Shift Channels${shiftModifiedDuringStep() ? '*' : ''}`}/>
            <Tab value={SWAP_TAB_VALUE} label={`Swap Channels${swapModifiedDuringStep() ? '*' : ''}`}/>
          </Tabs>
        </Box>

      </Paper>

      {/*Tools UI*/}
      <Container maxWidth="md" sx={{ pb: 8, my: 2 }}>

        {/*Shift Channels*/}
        <Box hidden={selectedToolTab !== SHIFT_TAB_VALUE}>
          <Paper
            sx={ { p: 2 } }
            elevation={1}
          >
            <FormLabel id="shift-channels-selected-channel-label">Selected Channel:</FormLabel>
            <RadioGroup
              value={ selectedShiftChannel }
              onChange={ shiftChannelSelectionOnChangeHandler }
              aria-labelledby="shift-channels-selected-channel-label"
              row
            >
              <ChannelRadioElements/>
            </RadioGroup>
            <Paper
              sx={ {
                p: 2,
                my: 2,
              } }
              elevation={0}
            >
              {/*TODO https://mui.com/material-ui/react-slider/#slider-with-input-field*/ }
              <Box
                sx={ { px: 2 } }
              >
                <FormLabel id="x-shift-slider-label">X Shift:</FormLabel>
                <Slider
                  value={ channelShiftValues[selectedShiftChannel][0] }
                  onChange={ shiftSliderOnChangeHandler(0) }
                  min={ 0 }
                  max={ imageWidth }
                  valueLabelDisplay="auto"
                  marks={ [
                    { value: 0, label: '0px' },
                    { value: imageWidth, label: `${ imageWidth }px` }
                  ] }
                  color="error"
                  aria-labelledby="x-shift-slider-label"
                />
              </Box>
            </Paper>
            <Paper
              sx={ {
                p: 2,
                my: 2,
              } }
              elevation={0}
            >
              {/*TODO https://mui.com/material-ui/react-slider/#slider-with-input-field*/ }
              <Box
                sx={ { px: 2 } }
              >
                <FormLabel id="y-shift-slider-label">Y Shift:</FormLabel>
                <Slider
                  value={ channelShiftValues[selectedShiftChannel][1] }
                  onChange={ shiftSliderOnChangeHandler(1) }
                  min={ 0 }
                  max={ imageHeight }
                  valueLabelDisplay="auto"
                  marks={ [
                    { value: 0, label: '0px' },
                    { value: imageHeight, label: `${ imageHeight }px` }
                  ] }
                  color="success"
                  aria-labelledby="y-shift-slider-label"
                />
              </Box>
            </Paper>
          </Paper>
        </Box>

        {/*Swap Channels*/}
        <Box hidden={selectedToolTab !== SWAP_TAB_VALUE}>
          <Paper
            sx={ { p: 2 } }
            elevation={1}
          >
            <Typography variant="h5" gutterBottom>Swap Channels</Typography>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item xs={ 6 }>
                <Paper
                  sx={{ p: 2 }}
                  elevation={0}
                >
                  <FormControl>
                    <FormLabel id="source-channel-label">Source Channel:</FormLabel>
                    <RadioGroup
                      value={ sourceChannel }
                      onChange={ channelRadioOnChangeHandler(setSourceChannel) }
                      aria-labelledby="source-channel-label"
                      name="source-channel-radio-group"
                    >
                      <ChannelRadioElements/>
                    </RadioGroup>
                  </FormControl>
                </Paper>
              </Grid>
              <Grid item xs={ 6 }>
                <Paper
                  sx={{ p: 2 }}
                  elevation={0}
                >
                  <FormControl>
                    <FormLabel id="target-channel-label">Target Channel:</FormLabel>
                    <RadioGroup
                      value={ targetChannel }
                      onChange={ channelRadioOnChangeHandler(setTargetChannel) }
                      aria-labelledby="target-channel-label"
                      name="target-channel-radio-group"
                    >
                      <ChannelRadioElements/>
                    </RadioGroup>
                  </FormControl>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Box>

      </Container>

      {/*Reset/Confirm Buttons*/}
      <Paper
        elevation={ 3 }
        sx={ {
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          p: 2,
        } }
      >
        <Stack
          direction="row"
          divider={ <Divider orientation="vertical" flexItem/> }
          justifyContent="space-evenly"
          spacing={ 2 }
        >
          <Tooltip title="Reset all shift and swap values" placement="top">
            <span>
              <Button
                onClick={ resetShiftAndSwap }
                disabled={ !imageModifiedDuringStep() }
                startIcon={ <RestartAlt/> }
                variant="contained"
              >
              Reset Step
            </Button>
            </span>
          </Tooltip>
          <Tooltip title="Use current result as base image" placement="top">
            <span>
              <Button
                onClick={ confirmButtonOnClick }
                disabled={ !imageModifiedDuringStep() }
                startIcon={ <CheckCircleOutline/> }
                variant="contained"
              >
              Confirm Step
            </Button>
            </span>
          </Tooltip>
        </Stack>
      </Paper>
    </React.Fragment>
  )
}

export default App
