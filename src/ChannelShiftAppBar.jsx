import { AppBar, Fab, Stack, styled, Toolbar, useMediaQuery, useTheme, } from '@mui/material'
import { FileUpload, HelpOutline, Save } from '@mui/icons-material'
import React from 'react'
import { ChannelShiftLogo } from './common/ChannelShiftLogo'


/**
 * App bar button component.
 *
 * @param labelText
 * @param color
 * @param onClick
 * @param icon
 * @param children
 * @param props
 * @return {Element}
 * @constructor
 */
const AppBarButton = ({
                        labelText,
                        color,
                        onClick,
                        icon,
                        children,
                        ...props
                      }) => {
  const theme = useTheme()
  // Extended button on larger views
  const extendedFab = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <Fab
      aria-label={ labelText }
      color={ color }
      onClick={ onClick }
      variant={ extendedFab ? 'extended' : 'circular' }
      size={ extendedFab ? 'medium' : 'small' }
      sx={ {
        boxShadow: 'none'
      } }
      { ...props }
    >
      { icon }
      { extendedFab ? labelText : '' }
      { children }
    </Fab>
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
    <AppBarButton
      labelText="Save"
      color="info"
      onClick={ saveButtonOnClick }
      icon={ <Save/> }
    />
  )
}

/**
 * Load image button element.
 *
 * @param setNewFileDataURL
 * @param setLoadingOpen
 * @return {Element}
 * @constructor
 */
const LoadButton = ({
                      setNewFileDataURL,
                      setLoadingOpen
                    }) => {
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
    setLoadingOpen(true)
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
    <AppBarButton
      component="label"
      labelText="Load"
      color="warning"
      icon={ <FileUpload/> }
    >
      <VisuallyHiddenInput
        type="file"
        accept="image/*"
        onChange={ loadImageFileInputOnChange }
        id="load-image-file-input"/>
    </AppBarButton>
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
    <AppBarButton
      labelText="Help"
      color="secondary"
      onClick={ () => {
        setHelpOpen(true)
      } }
      icon={ <HelpOutline/> }
    />
  )
}

/**
 * Stack component including the save, load, and help buttons for the app bar.
 *
 * @param setShouldSaveResult
 * @param setNewFileDataURL
 * @param setLoadingOpen
 * @param setHelpOpen
 * @return {Element}
 * @constructor
 */
export const AppBarButtons = ({
                                setShouldSaveResult,
                                setNewFileDataURL,
                                setLoadingOpen,
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
      setLoadingOpen={ setLoadingOpen }
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
 * @param setLoadingOpen
 * @param setHelpOpen
 * @return {Element}
 * @constructor
 */
export const ChannelShiftAppBar = ({
                                     setShouldSaveResult,
                                     setNewFileDataURL,
                                     setLoadingOpen,
                                     setHelpOpen
                                   }) => {
  // TODO: decouple sticky container from canvas + tabs, then update this to be sticky or whatev
  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={ 0 }
    >
      <Toolbar
        sx={ {
          px: 2,
        } }
      >
        <ChannelShiftLogo/>
        <AppBarButtons
          setShouldSaveResult={ setShouldSaveResult }
          setNewFileDataURL={ setNewFileDataURL }
          setLoadingOpen={ setLoadingOpen }
          setHelpOpen={ setHelpOpen }
        />
      </Toolbar>
    </AppBar>
  )
}