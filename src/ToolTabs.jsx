import { Box, Container, Tab, Tabs } from '@mui/material'
import * as Constants from './Constants'
import React from 'react'

export const ToolTabs = ({
                           selectedToolTab,
                           setSelectedToolTab,
                           shiftModifiedDuringStep,
                           swapModifiedDuringStep
                         }) => {
  /**
   * OnChange handler for tool tabs.
   *
   * @param event
   * @param newValue
   */
  const toolTabsOnChange = (event, newValue) => {
    setSelectedToolTab(newValue)
  }

  return (
    <Box
      sx={ {
        width: '100%',
        bgcolor: 'background.default'
      } }
    >
      <Container maxWidth="md">
        <Tabs
          value={ selectedToolTab }
          onChange={ toolTabsOnChange }
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab
            value={ Constants.SHIFT_TAB_VALUE }
            label={ `Shift Channels${ shiftModifiedDuringStep() ? ' *' : '' }` }
            sx={ { fontWeight: 'bold' } }
          />
          <Tab
            value={ Constants.SWAP_TAB_VALUE }
            label={ `Swap Channels${ swapModifiedDuringStep() ? ' *' : '' }` }
            sx={ { fontWeight: 'bold' } }
          />
          <Tab
            value={ Constants.RANDOMIZE_TAB_VALUE }
            label="Randomization Options"
            sx={ { fontWeight: 'bold' } }
          />
        </Tabs>
      </Container>
    </Box>
  )
}