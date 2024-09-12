import { ChannelTabsContainer } from './common/ChannelTabsContainer'
import * as Constants from './Constants'
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'


// TODO: doc and implement
export const MoshToolUI = ({
                             // Tab selection props
                             selectedMoshChannel,
                             setSelectedMoshChannel,
                             // Mosh mode selection props
                             selectedMoshModes,
                             setSelectedChannelMoshMode,
                           }) => {
  // Mosh mode select options
  const moshModeOptions = Constants.MOSH_MODE_DISPLAY_NAMES.map((modeName, index) =>
    <MenuItem
      key={ index }
      value={ index }
    >
      { modeName }
    </MenuItem>
  )

  // Mosh select change handler
  const moshSelectOnChange = (event) => {
    setSelectedChannelMoshMode(event.target.value)
  }

  return (
    <ChannelTabsContainer
      selectedChannelState={ selectedMoshChannel }
      setSelectedChannelState={ setSelectedMoshChannel }
    >
      <Box
        sx={ {
          my: 1,
          px: { xs: 1, sm: 2 },
        } }
      >
        <FormControl
          color={ Constants.CHANNEL_MUI_COLORS[selectedMoshChannel] }
          size="small"
          fullWidth
        >
          <InputLabel id="mosh-mode-select-label">Mosh Mode</InputLabel>
          <Select
            labelId="mosh-mode-select-label"
            id="mosh-mode-select"
            label="Mosh Mode"
            value={ selectedMoshModes[selectedMoshChannel] }
            onChange={ moshSelectOnChange }
            variant="outlined"
          >
            { moshModeOptions }
          </Select>
        </FormControl>
      </Box>
    </ChannelTabsContainer>
  )
}