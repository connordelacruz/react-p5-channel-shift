// React
import React from 'react';
import { ReactP5Wrapper } from '@p5-wrapper/react'
// Sketch
import { ChannelShiftSketch } from './ChannelShiftSketch'
// Constants
import * as Constants from './Constants'
// Components
import { HelpDialog } from './HelpDialog'
// MUI
import {
  AppBar,
  Box,
  Button,
  Checkbox,
  Chip,
  Container,
  createTheme,
  CssBaseline,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  styled,
  Tab, Table, TableBody,
  TableCell,
  TableContainer, TableHead,
  TableRow,
  Tabs,
  TextField,
  ThemeProvider,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material'
import { Casino, CheckCircleOutline, FileUpload, HelpOutline, RestartAlt, Save } from '@mui/icons-material'
import { blueGrey, teal, pink } from '@mui/material/colors'




// ================================================================================
// Randomize Options Component
// ================================================================================
// TODO: extract to file?

// --------------------------------------------------------------------------------
// Randomize Shift
// --------------------------------------------------------------------------------

// TODO: doc n implement, do the same for checkboxes; also think about how to support the "all channels" version
//  const RandomizeShiftPercentInput = ({channelOffset, dimensionIndex}) => {
//    return (
//    )
//  }

// Table Row Component
// TODO: re-work to reuse this for the "All Channels" row
const RandomizeShiftTableRow = ({
                                  channelOffset,
                                  // State props
                                  randomizeShiftChannels, randomizeShiftMaxPercents,
                                  // Handlers
                                  randomizeShiftChannelCheckboxOnChangeHandler,
                                  randomizeShiftMaxPercentInputOnChangeHandler, randomizeShiftMaxPercentInputOnBlurHandler
                                }) => {
  // TODO: add handlers and sanitization n stuff
  // TODO: Make channel labels prettier and use respective colors
  return (
    <TableRow>
      <TableCell>{Constants.CHANNEL_DISPLAY_NAMES[channelOffset]}</TableCell>
      <TableCell align="center">
        <Checkbox
          checked={randomizeShiftChannels[channelOffset][0]}
          onChange={randomizeShiftChannelCheckboxOnChangeHandler(channelOffset, 0)}
          color={Constants.CHANNEL_MUI_COLORS[channelOffset]}
        />
      </TableCell>
      <TableCell>
        <TextField
          value={randomizeShiftMaxPercents[channelOffset][0]}
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
          color={Constants.CHANNEL_MUI_COLORS[channelOffset]}
          disabled={!randomizeShiftChannels[channelOffset][0]}
          onChange={randomizeShiftMaxPercentInputOnChangeHandler(channelOffset, 0)}
          onBlur={randomizeShiftMaxPercentInputOnBlurHandler(channelOffset, 0)}
          size="small"
        />
      </TableCell>
      <TableCell align="center">
        <Checkbox
          checked={randomizeShiftChannels[channelOffset][1]}
          onChange={randomizeShiftChannelCheckboxOnChangeHandler(channelOffset, 1)}
          color={Constants.CHANNEL_MUI_COLORS[channelOffset]}
        />
      </TableCell>
      <TableCell>
        <TextField
          value={randomizeShiftMaxPercents[channelOffset][1]}
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
          color={Constants.CHANNEL_MUI_COLORS[channelOffset]}
          disabled={!randomizeShiftChannels[channelOffset][1]}
          onChange={randomizeShiftMaxPercentInputOnChangeHandler(channelOffset, 1)}
          onBlur={randomizeShiftMaxPercentInputOnBlurHandler(channelOffset, 1)}
          size="small"
        />
      </TableCell>
    </TableRow>
  )
}

// Randomize Shift Table
const RandomizeShiftTable = ({
                               // State props
                               randomizeShiftChannels, randomizeShiftMaxPercents,
                               // State setter functions
                               setRandomizeShiftChannel, setRandomizeShiftMaxPercent,
                             }) => {
  /**
   * Returns an onChange handler for a randomize channel/dimension checkbox.
   *
   * @param channelOffset
   * @param dimensionIndex
   * @return {(function(*): void)|*}
   */
  const randomizeShiftChannelCheckboxOnChangeHandler = (channelOffset, dimensionIndex) => {
    return (event) => {
      setRandomizeShiftChannel(channelOffset, dimensionIndex, event.target.checked)
    }
  }

  /**
   * Returns an onChange handler for a randomize channel/dimension max % input.
   *
   * Parse the value as an integer, set state to that integer value or '' if it could not be parsed.
   *
   * @param channelOffset
   * @param dimensionIndex
   * @return {(function(*): void)|*}
   */
  const randomizeShiftMaxPercentInputOnChangeHandler = (channelOffset, dimensionIndex) => {
    return (event) => {
      let parsedInputValue = parseInt(event.target.value)
      if (isNaN(parsedInputValue)) {
        parsedInputValue = ''
      }
      setRandomizeShiftMaxPercent(channelOffset, dimensionIndex, parsedInputValue)
    }
  }

  /**
   * Returns an onBlur handler for a randomize channel/dimension max % input.
   *
   * Validates the corresponding state value, ensuring it's an integer between 0 and 100.
   *
   * @param channelOffset
   * @param dimensionIndex
   * @return {(function(*): void)|*}
   */
  const randomizeShiftMaxPercentInputOnBlurHandler = (channelOffset, dimensionIndex) => {
    return (event) => {
      const currentValue = randomizeShiftMaxPercents[channelOffset][dimensionIndex]
      // If value is not an integer or less than 0, set to 0
      if (!Number.isInteger(currentValue) || currentValue < 0) {
        setRandomizeShiftMaxPercent(channelOffset, dimensionIndex, 0)
      }
      // If value exceeds 100, set to 100
      else if (currentValue > 100) {
        setRandomizeShiftMaxPercent(channelOffset, dimensionIndex, 100)
      }
    }
  }

  // Table rows
  const tableRows = Constants.CHANNEL_OFFSETS.map((channelOffset) =>
    <RandomizeShiftTableRow
      key={ channelOffset.toString() }
      channelOffset={ channelOffset }
      randomizeShiftChannels={ randomizeShiftChannels }
      randomizeShiftMaxPercents={ randomizeShiftMaxPercents }
      randomizeShiftChannelCheckboxOnChangeHandler={ randomizeShiftChannelCheckboxOnChangeHandler }
      randomizeShiftMaxPercentInputOnChangeHandler={ randomizeShiftMaxPercentInputOnChangeHandler }
      randomizeShiftMaxPercentInputOnBlurHandler={ randomizeShiftMaxPercentInputOnBlurHandler }
    />
  )

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Channel</TableCell>
            <TableCell>Randomize X Shift?</TableCell>
            <TableCell>X Shift Max %</TableCell>
            <TableCell>Randomize Y Shift?</TableCell>
            <TableCell>Y Shift Max %</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRows}
        </TableBody>
      </Table>
    </TableContainer>
  )
}


// ================================================================================
// App Component
// ================================================================================
function App() {

  // ================================================================================
  // General
  // ================================================================================

  // --------------------------------------------------------------------------------
  // Image Dimensions
  // --------------------------------------------------------------------------------
  // Image dimensions (sketch sets these after image is loaded)
  const [imageWidth, setImageWidth] = React.useState(0)
  const [imageHeight, setImageHeight] = React.useState(0)

  // ================================================================================
  // Save/Load
  // ================================================================================

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

  // ================================================================================
  // Tool Tabs
  // ================================================================================
  // Constants for tab values
  const SHIFT_TAB_VALUE = 'shift'
  const SWAP_TAB_VALUE = 'swap'
  const RANDOMIZE_TAB_VALUE = 'randomize'
  // Currently selected tool tab
  const [selectedToolTab, setSelectedToolTab] = React.useState(SHIFT_TAB_VALUE)

  // onChange handler for tool tabs
  const toolTabsOnChangeHandler = (event, newValue) => {
    setSelectedToolTab(newValue)
  }

  // ================================================================================
  // Channel Swap
  // ================================================================================
  // Source and target channels
  const [sourceChannel, setSourceChannel] = React.useState(Constants.R_OFFSET)
  const [targetChannel, setTargetChannel] = React.useState(Constants.R_OFFSET)

  // Since RGB radio elements are identical in source and target, use this method to generate common markup
  const ChannelRadioElements = () => {
    // TODO: make each radio generic like shift chips
    return (
      <React.Fragment>
        <FormControlLabel
          value={Constants.R_OFFSET}
          label="Red"
          control={ <Radio color="error"/> }
          sx={{ color: 'error.main' }}
        />
        <FormControlLabel
          value={Constants.G_OFFSET}
          label="Green"
          control={ <Radio color="success"/> }
          sx={{ color: 'success.main' }}
        />
        <FormControlLabel
          value={Constants.B_OFFSET}
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

  // ================================================================================
  // Channel Shift
  // ================================================================================
  // x/y shift current channel selection
  const [selectedShiftChannel, setSelectedShiftChannel] = React.useState(Constants.R_OFFSET)

  /**
   * Returns default value of all 0's for each channel
   *
   * @return array
   */
  const getChannelShiftValuesDefault = () => {
    const channelShiftValuesDefault = []
    channelShiftValuesDefault[Constants.R_OFFSET] = [0, 0]
    channelShiftValuesDefault[Constants.G_OFFSET] = [0, 0]
    channelShiftValuesDefault[Constants.B_OFFSET] = [0, 0]
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

  /**
   * Component for channel shift select chips
   */
  const ShiftChannelSelectChip = (props) => {
    return (
      <Chip
        icon={<Typography variant="button" sx={{fontWeight: 'bold'}}>{Constants.CHANNEL_DISPLAY_NAMES[props.channelOffset]}</Typography>}
        label={`x: ${channelShiftValues[props.channelOffset][0]}px / y: ${channelShiftValues[props.channelOffset][1]}px`}
        variant={parseInt(selectedShiftChannel) === props.channelOffset ? 'filled' : 'outlined'}
        onClick={() => {setSelectedShiftChannel(props.channelOffset)}}
        color={Constants.CHANNEL_MUI_COLORS[props.channelOffset]}
        aria-labelledby="selected-shift-channel-label"
      />
    )
  }

  // ================================================================================
  // Reset/Confirm Step
  // ================================================================================

  // --------------------------------------------------------------------------------
  // Reset Button
  // --------------------------------------------------------------------------------

  /**
   * Reset all shift/swap states
   */
  const resetShiftAndSwap = () => {
    setSourceChannel(Constants.R_OFFSET)
    setTargetChannel(Constants.R_OFFSET)
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

  // ================================================================================
  // Randomize
  // ================================================================================

  // --------------------------------------------------------------------------------
  // Randomize Shift
  // --------------------------------------------------------------------------------

  /**
   * Returns default values for randomizeShiftChannels state.
   *
   * @return {*[]}
   */
  const randomizeShiftChannelsDefault = () => {
    const randomizeShiftChannelsDefault = []
    randomizeShiftChannelsDefault[Constants.R_OFFSET] = [true, true]
    randomizeShiftChannelsDefault[Constants.G_OFFSET] = [true, true]
    randomizeShiftChannelsDefault[Constants.B_OFFSET] = [true, true]
    return randomizeShiftChannelsDefault
  }

  // State to keep track of which channels and which dimensions for those channels to randomize
  const [randomizeShiftChannels, setRandomizeShiftChannels] = React.useState(randomizeShiftChannelsDefault())

  /**
   * Helper for updating randomizeShiftChannels for a specific channel/dimension.
   *
   * @param channelOffset
   * @param dimensionIndex
   * @param newValue
   */
  const setRandomizeShiftChannel = (channelOffset, dimensionIndex, newValue) => {
    const newRandomizeShiftChannels = [...randomizeShiftChannels]
    newRandomizeShiftChannels[channelOffset][dimensionIndex] = newValue
    setRandomizeShiftChannels(newRandomizeShiftChannels)
  }

  /**
   * Returns default values for randomizeShiftMaxPercents state.
   *
   * @return {*[]}
   */
  const randomizeShiftMaxPercentsDefault = () => {
    const randomizeShiftMaxPercentsDefault = []
    randomizeShiftMaxPercentsDefault[Constants.R_OFFSET] = [100, 100]
    randomizeShiftMaxPercentsDefault[Constants.G_OFFSET] = [100, 100]
    randomizeShiftMaxPercentsDefault[Constants.B_OFFSET] = [100, 100]
    return randomizeShiftMaxPercentsDefault
  }

  // State to keep track of max percent to shift each channel/dimension by
  const [randomizeShiftMaxPercents, setRandomizeShiftMaxPercents] = React.useState(randomizeShiftMaxPercentsDefault())

  /**
   * Helper for updating randomizeShiftMaxPercents for a specific channel/dimension.
   *
   * @param channelOffset
   * @param dimensionIndex
   * @param newValue
   */
  const setRandomizeShiftMaxPercent = (channelOffset, dimensionIndex, newValue) => {
    const newRandomizeShiftMaxPercents = [...randomizeShiftMaxPercents]
    newRandomizeShiftMaxPercents[channelOffset][dimensionIndex] = newValue
    setRandomizeShiftMaxPercents(newRandomizeShiftMaxPercents)
  }


  /**
   * Returns a random amount of pixels to shift based on configured max shift percent and the corresponding image dimension.
   *
   * @param channelOffset
   * @param dimensionIndex
   *
   * @return {number}
   */
  const generateRandomShiftValue = (channelOffset, dimensionIndex) => {
    // Get corresponding image dimension size to use as a max value
    const dimensionPixels = dimensionIndex === 0 ? imageWidth : imageHeight
    // Get max shift percent
    const maxShiftPercent = randomizeShiftMaxPercents[channelOffset][dimensionIndex]
    // Calculate maximum amount of pixels to shift by
    const maxShiftPixels = Math.floor(dimensionPixels * (maxShiftPercent / 100))
    // Generate random shift value (+1 so it's inclusive)
    return Math.floor(Math.random() * (maxShiftPixels + 1))
  }

  /**
   * Randomize shift values based on randomizeShiftChannels and randomizeShiftMaxPercents.
   */
  const randomizeShiftValues = () => {
    const newChannelShiftValues = []
    randomizeShiftChannels.forEach((randomizeDimensions, channelOffset) => {
      // Set default (copy from current state)
      newChannelShiftValues[channelOffset] = [...channelShiftValues[channelOffset]]
      // X shift
      if (randomizeDimensions[0]) {
        newChannelShiftValues[channelOffset][0] = generateRandomShiftValue(channelOffset, 0)
      }
      // Y shift
      if (randomizeDimensions[1]) {
        newChannelShiftValues[channelOffset][1] = generateRandomShiftValue(channelOffset, 1)
      }
    })
    // Update state
    setChannelShiftValues(newChannelShiftValues)
  }

  /**
   * OnClick handler for randomize button.
   */
  const randomizeButtonOnClickHandler = () => {
    // TODO: validate input fields / state first? might not be necessary tbh
    randomizeShiftValues()
  }

  // ================================================================================
  // Helper Functions
  // ================================================================================

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
  // Help Dialog
  // --------------------------------------------------------------------------------
  // Open/close state
  const [helpOpen, setHelpOpen] = React.useState(false)


  // ================================================================================
  // Theme
  // ================================================================================
  // TODO: custom color names?
  const theme = createTheme({
    palette: {
      // Non-color channel UI colors
      secondary: {
        main: teal[500]
      },
      info: {
        main: pink[500]
      },
    }
  })


  // ================================================================================
  // Render
  // ================================================================================

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      {/*App Bar, Canvas, and Tool Tabs Container*/}
      <Paper
        sx={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          bgcolor: blueGrey[900],
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
              color="secondary"
              variant="h6"
              component="div"
              sx={ {
                flexGrow: 1,
                fontWeight: 'bold',
            } }
            >
              Channel Shift // Swap
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-evenly"
              spacing={ 2 }
            >
              <Tooltip title="Help" placement="bottom">
                <IconButton
                  aria-label="help"
                  onClick={() => {setHelpOpen(true)}}
                >
                  <HelpOutline/>
                </IconButton>
              </Tooltip>
              <Tooltip title="Load a new image" placement="bottom">
                <span>
                  <Button
                    startIcon={ <FileUpload/> }
                    component="label"
                    variant="contained"
                    color="secondary"
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
                    variant="contained"
                    color="secondary"
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
            indicatorColor="secondary"
            textColor="secondary"
          >
            <Tab
              value={SHIFT_TAB_VALUE}
              label={`Shift Channels${shiftModifiedDuringStep() ? '*' : ''}`}
              sx={{fontWeight: 'bold'}}
            />
            <Tab
              value={SWAP_TAB_VALUE}
              label={`Swap Channels${swapModifiedDuringStep() ? '*' : ''}`}
              sx={{fontWeight: 'bold'}}
            />
            <Tab
              value={RANDOMIZE_TAB_VALUE}
              label="Randomization Options"
              sx={{fontWeight: 'bold'}}
            />
          </Tabs>
        </Box>

      </Paper>

      {/*Tools UI*/}
      <Container maxWidth="md" sx={{ pb: 8, my: 2 }}>

        {/*Shift Channels*/}
        <Box hidden={selectedToolTab !== SHIFT_TAB_VALUE}>
          <Paper
            sx={ { p: 2 } }
            variant="outlined"
          >
            {/*Shift Channel Select Buttons*/}
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{
                p: 2,
              }}
            >
              <FormLabel
                id="selected-shift-channel-label"
                sx={{display: 'block'}}
              >
                Selected Channel:
              </FormLabel>
              <ShiftChannelSelectChip channelOffset={Constants.R_OFFSET}/>
              <ShiftChannelSelectChip channelOffset={Constants.G_OFFSET}/>
              <ShiftChannelSelectChip channelOffset={Constants.B_OFFSET}/>
            </Stack>
            <Paper
              sx={ {
                p: 2,
                my: 2,
              } }
              variant="outlined"
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
                  aria-labelledby="x-shift-slider-label"
                  color={Constants.CHANNEL_MUI_COLORS[selectedShiftChannel]}
                />
              </Box>
            </Paper>
            <Paper
              sx={ {
                p: 2,
                my: 2,
              } }
              variant="outlined"
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
                  color={Constants.CHANNEL_MUI_COLORS[selectedShiftChannel]}
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
            variant="outlined"
          >
            <FormLabel
              sx={{
                display: 'block',
                mb: 2,
            }}
            >
              Select channels to swap:
            </FormLabel>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item xs={ 6 }>
                <Paper
                  sx={{ p: 2 }}
                  variant="outlined"
                >
                  <FormControl>
                    <FormLabel
                      id="source-channel-label"
                      color={Constants.CHANNEL_MUI_COLORS[sourceChannel]}
                    >
                      Source Channel:
                    </FormLabel>
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
                  variant="outlined"
                >
                  <FormControl>
                    <FormLabel
                      id="target-channel-label"
                      color={Constants.CHANNEL_MUI_COLORS[targetChannel]}
                    >
                      Target Channel:
                    </FormLabel>
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

        {/*Randomize*/}
        <Box hidden={selectedToolTab !== RANDOMIZE_TAB_VALUE}>
          <Paper
            sx={ { p: 2 } }
            variant="outlined"
            >

            {/*Randomize Shift*/}
            <Paper
              sx={ { p: 2 } }
              variant="outlined"
              >
              <RandomizeShiftTable
                randomizeShiftChannels={ randomizeShiftChannels }
                setRandomizeShiftChannel={ setRandomizeShiftChannel }
                randomizeShiftMaxPercents={ randomizeShiftMaxPercents }
                setRandomizeShiftMaxPercent={ setRandomizeShiftMaxPercent }
                />
            </Paper>

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
                color="warning"
              >
              Reset Step
            </Button>
            </span>
          </Tooltip>
          <Tooltip title='Randomize shift/swap values. Can be configured in the "Randomization Options" tab' placement="top">
            <span>
              <Button
                onClick={ randomizeButtonOnClickHandler }
                startIcon={ <Casino/> }
                variant="contained"
                color="info"
              >
                Randomize
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
                color="secondary"
              >
              Confirm Step
            </Button>
            </span>
          </Tooltip>
        </Stack>
      </Paper>

      {/*Help Modal*/}
      <HelpDialog open={helpOpen} onClose={() => {setHelpOpen(false)}}/>
    </ThemeProvider>
  )
}

export default App
