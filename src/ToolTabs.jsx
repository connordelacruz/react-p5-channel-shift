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
          sx={{
            '& .MuiTabs-indicator': {
              height: '100%',
            },
            '& .MuiTab-root': {
              fontWeight: 'bold',
              color: 'secondary.main',
              // Make sure text appears above full-height tab indicator
              zIndex: 1,
              // Match transition of indicator span animations
              transition: 'color 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&.Mui-selected': {
                // White text when indicator is behind selected tab
                color: 'background.default',
              },
            },
          }}
        >
          <Tab
            value={ Constants.SHIFT_TAB_VALUE }
            label={ `Shift${ shiftModifiedDuringStep() ? ' *' : '' }` }
          />
          <Tab
            value={ Constants.SWAP_TAB_VALUE }
            label={ `Swap${ swapModifiedDuringStep() ? ' *' : '' }` }
          />
          <Tab
            value={ Constants.RANDOMIZE_TAB_VALUE }
            label="Randomization"
          />
        </Tabs>
      </Container>
    </Box>
  )
}