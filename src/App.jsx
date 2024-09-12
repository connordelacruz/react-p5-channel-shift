// React
import React from 'react'
import { ReactP5Wrapper } from '@p5-wrapper/react'
// Constants
import * as Constants from './Constants'
// MUI Theme
import { theme } from './Theme'
// App Bar Component
import { ChannelShiftAppBar } from './ChannelShiftAppBar'
// Sketch
import { ChannelShiftSketch } from './ChannelShiftSketch'
// Tool Tabs Component
import { ToolTabs } from './ToolTabs'
// Tool UI Components
import { ShiftChannelsToolUI } from './ShiftChannelsToolUI'
import { SwapChannelsToolUI } from './SwapChannelsToolUI'
// Snack Bar Component
import { SnackBar } from './SnackBar'
// Dialog Components
import { RandomizationSettingsDialog } from './RandomizationSettingsDialog'
import { HelpDialog } from './HelpDialog'
import { IOSSafariError } from './IOSSafariError'
// MUI
import { Box, Container, CssBaseline, Paper, ThemeProvider } from '@mui/material'
import { LoadingDialog } from './LoadingDialog'
import { ShiftModesToolUI } from './ShiftModesToolUI'

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

  // --------------------------------------------------------------------------------
  // Sketch State
  // --------------------------------------------------------------------------------
  // Set to true when setup() method completes
  const [setupCompleted, setSetupCompleted] = React.useState(false)

  // ================================================================================
  // Save/Load
  // ================================================================================

  // --------------------------------------------------------------------------------
  // Save Image Button
  // --------------------------------------------------------------------------------
  // Set to true when save button is clicked, sketch will save image and set back to false when complete
  const [shouldSaveResult, setShouldSaveResult] = React.useState(false)

  // --------------------------------------------------------------------------------
  // Load Image Button
  // --------------------------------------------------------------------------------
  // State for uploaded image data. Initialized to null, set to base64 data URL once file is loaded.
  // Sketch will load data as image and set to null again when complete
  const [newFileDataURL, setNewFileDataURL] = React.useState(null)

  // --------------------------------------------------------------------------------
  // Loading Modal
  // --------------------------------------------------------------------------------
  // Modal to display while loading. Default to true since sketch needs to load initial image.
  // Sketch will hide this in setup().
  const [loadingOpen, setLoadingOpen] = React.useState(true)

  /**
   * Loading modal should be shown if:
   * - setupCompleted is false
   * - newFileDataURL is not null
   */
  React.useEffect(() => {
    setLoadingOpen(!(setupCompleted && newFileDataURL === null))
  }, [setupCompleted, newFileDataURL])


  // ================================================================================
  // Tool Tabs
  // ================================================================================
  // Currently selected tool tab
  const [selectedToolTab, setSelectedToolTab] = React.useState(Constants.SHIFT_TAB_VALUE)

  // ================================================================================
  // Channel Swap
  // ================================================================================
  // Source and target channels
  const [sourceChannel, setSourceChannel] = React.useState(Constants.R_OFFSET)
  const [targetChannel, setTargetChannel] = React.useState(Constants.R_OFFSET)

  // ================================================================================
  // Channel Shift
  // ================================================================================

  // --------------------------------------------------------------------------------
  // Selected channel tab to shift
  // --------------------------------------------------------------------------------
  const [selectedShiftChannel, setSelectedShiftChannel] = React.useState(Constants.R_OFFSET)

  // --------------------------------------------------------------------------------
  // Channel shift values
  // --------------------------------------------------------------------------------

  /**
   * Returns default value of all 0's for each channel.
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
   * Set a new shift value at the selected shift channel.
   *
   * @param dimensionIndex 0 for x, 1 for y
   * @param newValue New shift value to set
   */
  const setSelectedChannelShiftValue = (dimensionIndex, newValue) => {
    const newChannelShiftValues = [...channelShiftValues]
    // Update selected targetChannel
    newChannelShiftValues[selectedShiftChannel][dimensionIndex] = newValue
    setChannelShiftValues(newChannelShiftValues)
  }

  // --------------------------------------------------------------------------------
  // Channel shift text inputs
  // --------------------------------------------------------------------------------

  // States for x/y shift text fields
  // (Separate to account for validation prior to updating channelShiftValues)
  const [channelShiftTextInputValues, setChannelShiftTextInputValues] = React.useState([0, 0])

  /**
   * Helper for setting individual text field value state.
   *
   * @param dimensionIndex
   * @param newValue
   */
  const setChannelShiftTextInputValue = (dimensionIndex, newValue) => {
    const newChannelShiftTextInputValues = [...channelShiftTextInputValues]
    newChannelShiftTextInputValues[dimensionIndex] = newValue
    setChannelShiftTextInputValues(newChannelShiftTextInputValues)
  }

  /**
   * If channelShiftValues or selectedShiftChannel states are updated,
   * update text input states to match current channel selection / updated shift values.
   */
  React.useEffect(() => {
    // Update text field state if it doesn't match corresponding channelShiftValues state
    if (JSON.stringify(channelShiftValues[selectedShiftChannel]) !== JSON.stringify(channelShiftTextInputValues)) {
      const newChannelShiftTextInputValues = [...channelShiftValues[selectedShiftChannel]]
      setChannelShiftTextInputValues(newChannelShiftTextInputValues)
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelShiftValues, selectedShiftChannel])

  // ================================================================================
  // Shift Modes (AKA Mosh)
  // ================================================================================

  // --------------------------------------------------------------------------------
  // UI
  // --------------------------------------------------------------------------------
  // Selected channel tab to show mosh settings for
  const [selectedMoshChannel, setSelectedMoshChannel] = React.useState(Constants.R_OFFSET)

  // --------------------------------------------------------------------------------
  // Mode selection
  // --------------------------------------------------------------------------------

  /**
   * Returns default values for selected shift mode state.
   *
   * @return {*[]}
   */
  const selectedShiftModesDefault = () => {
    const selectedShiftModesDefault = []
    selectedShiftModesDefault[Constants.R_OFFSET] = Constants.SHIFT_MODE_DEFAULT
    selectedShiftModesDefault[Constants.G_OFFSET] = Constants.SHIFT_MODE_DEFAULT
    selectedShiftModesDefault[Constants.B_OFFSET] = Constants.SHIFT_MODE_DEFAULT
    return selectedShiftModesDefault
  }

  // Which shift mode is selected for each channel
  const [selectedShiftModes, setSelectedShiftModes] = React.useState(selectedShiftModesDefault())
  // TODO: helper to set mode for just 1 channel, pass to UI

  // TODO: array of shift mode handlers indexed by the corresponding constant

  // TODO: figure out how to store state of shift mode-specific configs for each channel

  // TODO: pass relevant states/vars to sketch

  // ================================================================================
  // Randomize
  // ================================================================================

  // --------------------------------------------------------------------------------
  // Randomize Shift
  // --------------------------------------------------------------------------------

  // Whether or not to randomize shift when randomize button is clicked.
  const [shouldRandomizeShift, setShouldRandomizeShift] = React.useState(true)

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
  const randomizeShifts = () => {
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

  // --------------------------------------------------------------------------------
  // Randomize Swap
  // --------------------------------------------------------------------------------

  // Whether or not to randomize swap when randomize button is clicked.
  const [shouldRandomizeSwap, setShouldRandomizeSwap] = React.useState(true)

  /**
   * Returns default values for randomize source/target channels states.
   *
   * @return {*[]}
   */
  const randomizeSwapChannelsDefault = () => {
    const randomizeSwapChannelsDefault = []
    randomizeSwapChannelsDefault[Constants.R_OFFSET] = true
    randomizeSwapChannelsDefault[Constants.G_OFFSET] = true
    randomizeSwapChannelsDefault[Constants.B_OFFSET] = true
    return randomizeSwapChannelsDefault
  }

  // States to keep track of which source/target channels should be picked when randomizing
  const [randomizeSwapSourceChannels, setRandomizeSwapSourceChannels] = React.useState(randomizeSwapChannelsDefault())
  const [randomizeSwapTargetChannels, setRandomizeSwapTargetChannels] = React.useState(randomizeSwapChannelsDefault())

  // State to keep track of source/target selection preference.
  // If true, randomization will try its best to select 2 different channels.
  const [randomizeSwapPreferDifferentChannels, setRandomizeSwapPreferDifferentChannels] = React.useState(false)

  /**
   * Returns a helper function to update source/target states at an individual channel offset.
   *
   * @param channelsState randomizeSwapSourceChannels or randomizeSwapTargetChannels.
   * @param channelsStateSetter Corresponding state setter function.
   * @return {(function(*, *): void)|*}
   */
  const setRandomizeSwapChannelHelperGenerator = (channelsState, channelsStateSetter) => {
    return (channelOffset, newValue) => {
      const newChannelsState = [...channelsState]
      newChannelsState[channelOffset] = newValue
      channelsStateSetter(newChannelsState)
    }
  }

  /**
   * Set the state of a channel in randomizeSwapSourceChannels at the given channel offset.
   *
   * @param channelOffset
   * @param newValue
   */
  const setRandomizeSwapSourceChannel = setRandomizeSwapChannelHelperGenerator(randomizeSwapSourceChannels, setRandomizeSwapSourceChannels)

  /**
   * Set the state of a channel in randomizeSwapTargetChannels at the given channel offset.
   *
   * @param channelOffset
   * @param newValue
   */
  const setRandomizeSwapTargetChannel = setRandomizeSwapChannelHelperGenerator(randomizeSwapTargetChannels, setRandomizeSwapTargetChannels)

  /**
   * Shorthand for picking a random value from an array
   * @param arr
   * @return {*}
   */
  const pickRandomArrayElement = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  /**
   * Randomize source/target channels based on randomizeSwapSourceChannels and randomizeSwapTargetChannels.
   */
  const randomizeSwaps = () => {
    // Build options arrays
    const sourceOptions = []
    randomizeSwapSourceChannels.forEach((checked, channelOffset) => {
      if (checked) {
        sourceOptions.push(channelOffset)
      }
    })
    const targetOptions = []
    randomizeSwapTargetChannels.forEach((checked, channelOffset) => {
      if (checked) {
        targetOptions.push(channelOffset)
      }
    })

    // Initialize randys
    let randySource, randyTarget

    // If "prefer different" is selected and the following conditions are met:
    // - Both arrays have at least 1 element
    // - At least 1 of the arrays has 2 or more elements
    // Then, pick 2 different source/target channels and update states
    if (randomizeSwapPreferDifferentChannels
      && sourceOptions.length > 0
      && targetOptions.length > 0
      && (sourceOptions.length > 1 || targetOptions.length > 1)
    ) {
      // At this point, we have 1 array with 1+ elements and one with 2+ elements.
      // Pick from smaller array first, remove that choice from the bigger one, then pick from that one.
      // (Or if they're the same size then we'll arbitrarily pick from sourceOptions first)
      if (targetOptions.length < sourceOptions.length) {
        // Pick random target
        randyTarget = pickRandomArrayElement(targetOptions)
        // If randyTarget is in sourceOptions, remove it
        const randyTargetIndexIntoSource = sourceOptions.indexOf(randyTarget)
        if (randyTargetIndexIntoSource > -1) {
          sourceOptions.splice(randyTargetIndexIntoSource, 1)
        }
        // Pick random source
        randySource = pickRandomArrayElement(sourceOptions)
      } else {
        // Pick random source
        randySource = pickRandomArrayElement(sourceOptions)
        // If randySource is in targetOptions, remove it
        const randySourceIndexIntoTarget = targetOptions.indexOf(randySource)
        if (randySourceIndexIntoTarget > -1) {
          targetOptions.splice(randySourceIndexIntoTarget, 1)
        }
        // Pick random target
        randyTarget = pickRandomArrayElement(targetOptions)
      }
      // Update states
      setSourceChannel(randySource)
      setTargetChannel(randyTarget)
    }
    // Otherwise, just randomly pick and update states (as long as there's 1+ options)
    else {
      if (sourceOptions.length > 0) {
        randySource = pickRandomArrayElement(sourceOptions)
        setSourceChannel(randySource)
      }
      if (targetOptions.length > 0) {
        randyTarget = pickRandomArrayElement(targetOptions)
        setTargetChannel(randyTarget)
      }
    }
  }

  // ================================================================================
  // Reset/Randomize Snackbar Buttons
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
  // Randomize Button
  // --------------------------------------------------------------------------------

  /**
   * OnClick handler for randomize button.
   */
  const randomizeButtonOnClick = () => {
    if (shouldRandomizeShift) {
      randomizeShifts()
    }
    if (shouldRandomizeSwap) {
      randomizeSwaps()
    }
  }

  // --------------------------------------------------------------------------------
  // Randomize Settings Button
  // --------------------------------------------------------------------------------
  // Open/close state
  const [randomizationSettingsOpen, setRandomizationSettingsOpen] = React.useState(false)


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

  // --------------------------------------------------------------------------------
  // iOS Safari Large Image Error Dialog
  // --------------------------------------------------------------------------------
  // Open/close state
  const [iOSSafariErrorOpen, setIOSSafariErrorOpen] = React.useState(false)

  // ================================================================================
  // Render
  // ================================================================================

  return (
    <ThemeProvider theme={ theme }>
      <CssBaseline/>
      {/*App Bar, Canvas, and Tool Tabs Container*/ }
      <Paper
        sx={ {
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          bgcolor: 'preview.bg',
          // Checkboard bg courtesy of https://gist.github.com/dfrankland/f6fed3e3ccc42e3de482b324126f9542
          backgroundImage: `
            linear-gradient(45deg, #37474f 25%, transparent 25%), 
            linear-gradient(135deg, #37474f 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #37474f 75%),
            linear-gradient(135deg, transparent 75%, #37474f 75%)
          `,
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 12px 0, 12px -12px, 0px 12px',
          // Make sure this appears over UI elements
          zIndex: 999,
        } }
        square
        elevation={ 3 }
      >
        {/*App Bar*/ }
        <ChannelShiftAppBar
          setShouldSaveResult={ setShouldSaveResult }
          setNewFileDataURL={ setNewFileDataURL }
          setLoadingOpen={ setLoadingOpen }
          setHelpOpen={ setHelpOpen }
        />

        {/*Canvas*/ }
        <ReactP5Wrapper
          sketch={ ChannelShiftSketch }
          setSetupCompleted={ setSetupCompleted }
          setImageWidth={ setImageWidth } setImageHeight={ setImageHeight }
          sourceChannel={ sourceChannel } targetChannel={ targetChannel }
          channelShiftValues={ channelShiftValues }
          newFileDataURL={ newFileDataURL } setNewFileDataURL={ setNewFileDataURL }
          resetShiftAndSwap={ resetShiftAndSwap }
          shouldSaveResult={ shouldSaveResult } setShouldSaveResult={ setShouldSaveResult }
          setIOSSafariErrorOpen={ setIOSSafariErrorOpen }
        />

        {/*Tool Tabs*/ }
        <ToolTabs
          selectedToolTab={ selectedToolTab }
          setSelectedToolTab={ setSelectedToolTab }
          shiftModifiedDuringStep={ shiftModifiedDuringStep }
          swapModifiedDuringStep={ swapModifiedDuringStep }
        />

      </Paper>
      {/*END App Bar, Canvas, and Tool Tabs Container*/ }

      {/*Tools UI*/ }
      <Container
        maxWidth="md"
        sx={ {
          pb: 8,
          mt: 1,
        } }
      >

        {/*Shift Channels*/ }
        <Box hidden={ selectedToolTab !== Constants.SHIFT_TAB_VALUE }>
          <ShiftChannelsToolUI
            // State props
            channelShiftValues={ channelShiftValues }
            imageWidth={ imageWidth }
            imageHeight={ imageHeight }
            channelShiftTextInputValues={ channelShiftTextInputValues }
            // State setter props
            setSelectedChannelShiftValue={ setSelectedChannelShiftValue }
            selectedShiftChannel={ selectedShiftChannel }
            setSelectedShiftChannel={ setSelectedShiftChannel }
            setChannelShiftTextInputValue={ setChannelShiftTextInputValue }
          />
        </Box>

        {/*Swap Channels*/ }
        <Box hidden={ selectedToolTab !== Constants.SWAP_TAB_VALUE }>
          <SwapChannelsToolUI
            // State props
            sourceChannel={ sourceChannel }
            targetChannel={ targetChannel }
            // State setter props
            setSourceChannel={ setSourceChannel }
            setTargetChannel={ setTargetChannel }
          />
        </Box>

        {/*Shift Modes ("Mosh")*/ }
        <Box hidden={ selectedToolTab !== Constants.MOSH_TAB_VALUE }>
          <ShiftModesToolUI
            selectedMoshChannel={ selectedMoshChannel }
            setSelectedMoshChannel={ setSelectedMoshChannel }
          />
        </Box>
      </Container>
      {/*END Tools UI*/ }

      {/*Snackbar*/ }
      <SnackBar
        resetButtonOnClick={ resetShiftAndSwap }
        randomizeButtonOnClick={ randomizeButtonOnClick }
        randomizationSettingsButtonOnClick={ () => {
          setRandomizationSettingsOpen(true)
        } }
        shouldRandomizeShift={ shouldRandomizeShift }
        shouldRandomizeSwap={ shouldRandomizeSwap }
        imageModifiedDuringStep={ imageModifiedDuringStep }
      />

      {/*Randomization Settings Modal*/ }
      <RandomizationSettingsDialog
        open={ randomizationSettingsOpen }
        onClose={ () => {
          setRandomizationSettingsOpen(false)
        } }
        // Randomize Shift State Props
        shouldRandomizeShift={ shouldRandomizeShift }
        randomizeShiftChannels={ randomizeShiftChannels }
        randomizeShiftMaxPercents={ randomizeShiftMaxPercents }
        // Randomize Shift State Setter Props
        setShouldRandomizeShift={ setShouldRandomizeShift }
        setRandomizeShiftChannel={ setRandomizeShiftChannel }
        setRandomizeShiftChannels={ setRandomizeShiftChannels }
        setRandomizeShiftMaxPercent={ setRandomizeShiftMaxPercent }
        setRandomizeShiftMaxPercents={ setRandomizeShiftMaxPercents }
        // Randomize Swap State Props
        shouldRandomizeSwap={ shouldRandomizeSwap }
        randomizeSwapSourceChannels={ randomizeSwapSourceChannels }
        randomizeSwapTargetChannels={ randomizeSwapTargetChannels }
        randomizeSwapPreferDifferentChannels={ randomizeSwapPreferDifferentChannels }
        // Randomize Swap State Setter Props
        setShouldRandomizeSwap={ setShouldRandomizeSwap }
        setRandomizeSwapSourceChannel={ setRandomizeSwapSourceChannel }
        setRandomizeSwapSourceChannels={ setRandomizeSwapSourceChannels }
        setRandomizeSwapTargetChannel={ setRandomizeSwapTargetChannel }
        setRandomizeSwapTargetChannels={ setRandomizeSwapTargetChannels }
        setRandomizeSwapPreferDifferentChannels={ setRandomizeSwapPreferDifferentChannels }
      />

      {/*Help Modal*/ }
      <HelpDialog
        open={ helpOpen }
        onClose={ () => {
          setHelpOpen(false)
        } }
      />

      {/*Loading Modal*/ }
      <LoadingDialog
        open={ loadingOpen }
      />

      {/*iOS Safari Large Image Error Modal*/ }
      <IOSSafariError
        open={ iOSSafariErrorOpen }
        onClose={ () => {
          setIOSSafariErrorOpen(false)
        } }
      />

    </ThemeProvider>
  )
}

export default App
