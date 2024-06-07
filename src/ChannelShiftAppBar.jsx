import {
  AppBar,
  Box,
  IconButton,
  Stack,
  styled,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
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
      <Typography
        variant="button"
        fontSize="medium"
        sx={ { fontWeight: 'bold' } }
        color="info.main"
      >
        Channel
      </Typography>
      <SwapHoriz
        fontSize="medium"
        sx={ { mx: 0.5 } }
        color="warning"
      />
      <Typography
        variant="button"
        fontSize="medium"
        sx={ { fontWeight: 'bold' } }
        color="secondary"
      >
        Shift
      </Typography>
    </Box>
  )
}

/**
 * Component to use in app bar IconButtons. Hidden on xs viewports.
 *
 * @param color
 * @param children
 * @return {React.JSX.Element}
 * @constructor
 */
const IconButtonResponsiveLabel = ({ color, children }) => (
  <Typography
    variant="button"
    color={ color }
    ml={ 1 }
    sx={ {
      display: {
        xs: 'none',
        sm: 'block',
      },
    } }
  >
    { children }
  </Typography>
)

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
      <IconButton
        onClick={ saveButtonOnClick }
        aria-label="save"
        color="info"
      >
        <Save/>
        <IconButtonResponsiveLabel>
          Save
        </IconButtonResponsiveLabel>
      </IconButton>
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
      <IconButton
        component="label"
        aria-label="load"
        color="warning"
      >
        <FileUpload/>
        <IconButtonResponsiveLabel>
          Load
        </IconButtonResponsiveLabel>
        <VisuallyHiddenInput
          type="file"
          accept="image/*"
          onChange={ loadImageFileInputOnChange }
          id="load-image-file-input"/>
      </IconButton>
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
        <HelpOutline color="secondary" />
        <IconButtonResponsiveLabel
          color="secondary"
        >
          Help
        </IconButtonResponsiveLabel>
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
    spacing={ { xs: 1, sm: 0.5 } }
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
export const ChannelShiftAppBar = ({
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
      <Toolbar
        sx={ {
          // TODO: uncomment when help button is re-implemented
//          pl: { xs: 1.5, sm: 2 },
//          pr: { xs: 0, sm: 2 },
          px: 2,
        } }
      >
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