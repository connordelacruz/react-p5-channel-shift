import { AppBar, Box, Button, IconButton, Stack, styled, Toolbar, Tooltip, Typography } from '@mui/material'
import {
  FileUpload,
  HelpOutline,
  Save,
  SwapHoriz
} from '@mui/icons-material'
import React from 'react'

/**
 * App bar logo component.
 *
 * @return {Element}
 * @constructor
 */
const ChannelShiftLogo = () => {
  return (
    <Box
      component="div"
      sx={ {
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
        fontWeight: 'bold'
      } }
    >
      <Typography variant="button" sx={ { fontWeight: 'bold' } } color="info.main">Channel</Typography>
      <SwapHoriz fontSize="small" sx={ { mx: 0.5 } } color="secondary"/>
      <Typography variant="button" sx={ { fontWeight: 'bold' } } color="info.main">Shift</Typography>
    </Box>
  )
}

/**
 * Save image button element.
 *
 * @param setShouldSaveResult
 * @return {Element}
 * @constructor
 */
const SaveButton = ({ setShouldSaveResult }) => {

  /**
   * Save button onClick handler.
   */
  const saveButtonOnClick = () => {
    setShouldSaveResult(true)
  }

  return (
    <Tooltip
      title="Download current result as full-res PNG"
      placement="bottom"
    >
      <span>
        <Button
          onClick={ saveButtonOnClick }
          startIcon={ <Save/> }
          color="secondary"
          variant="contained"
          disableElevation
        >
        Save
      </Button>
      </span>
    </Tooltip>
  )
}

/**
 * Load image button element.
 *
 * @param setNewFileDataURL
 * @return {Element}
 * @constructor
 */
const LoadButton = ({ setNewFileDataURL }) => {
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
   * base64 data URL and set setNewFileDataURL to it.
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
  return (
    <Tooltip
      title="Load a new image"
      placement="bottom"
    >
      <span>
        <Button
          startIcon={ <FileUpload/> }
          component="label"
          color="secondary"
          variant="contained"
          disableElevation
        >
        Load
        <VisuallyHiddenInput
          type="file"
          accept="image/*"
          onChange={ loadImageFileInputOnChange }
          id="load-image-file-input"/>
        </Button>
      </span>
    </Tooltip>
  )
}

/**
 * Help icon button element.
 *
 * @param setHelpOpen
 * @return {Element}
 * @constructor
 */
const HelpButton = ({ setHelpOpen }) => {
  return (
    <Tooltip title="Help" placement="bottom">
      <IconButton
        aria-label="help"
        onClick={ () => {
          setHelpOpen(true)
        } }
      >
        <HelpOutline color="info"/>
      </IconButton>
    </Tooltip>
  )
}

/**
 * Stack component including the save, load, and help buttons for the app bar.
 *
 * @param setShouldSaveResult
 * @param setNewFileDataURL
 * @param setHelpOpen
 * @return {Element}
 * @constructor
 */
export const AppBarButtons = ({
                                setShouldSaveResult,
                                setNewFileDataURL,
                                setHelpOpen
                              }) => {
  return <Stack
    direction="row"
    justifyContent="space-evenly"
    alignItems="center"
    spacing={ 2 }
  >
    <SaveButton
      setShouldSaveResult={ setShouldSaveResult }
    />
    <LoadButton
      setNewFileDataURL={ setNewFileDataURL }
    />
    <HelpButton
      setHelpOpen={ setHelpOpen }
    />
  </Stack>
}


/**
 * App bar with save/load/help buttons.
 *
 * @param setShouldSaveResult
 * @param setNewFileDataURL
 * @param setHelpOpen
 * @return {Element}
 * @constructor
 */
export const ChannelShiftSwapAppBar = ({
                                         setShouldSaveResult,
                                         setNewFileDataURL,
                                         setHelpOpen
                                       }) => {
  // TODO: decouple sticky container from canvas + tabs, then update this to be sticky or whatev
  return (
    <AppBar
      position="static"
      color="default"
      elevation={ 0 }
    >
      <Toolbar>
        <ChannelShiftLogo/>
        <AppBarButtons
          setShouldSaveResult={ setShouldSaveResult }
          setNewFileDataURL={ setNewFileDataURL }
          setHelpOpen={ setHelpOpen }
        />
      </Toolbar>
    </AppBar>
  )
}