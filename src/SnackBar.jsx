import { Button, ButtonGroup, Container, Paper, Stack } from '@mui/material'
import { Casino, RestartAlt, Settings } from '@mui/icons-material'
import React from 'react'

/**
 * Reset step button.
 *
 * @param resetButtonOnClick
 * @param imageModifiedDuringStep
 * @return {Element}
 * @constructor
 */
const ResetButton = ({
                       resetButtonOnClick,
                       imageModifiedDuringStep
                     }) => {
  return (
    <Button
      onClick={ resetButtonOnClick }
      disabled={ !imageModifiedDuringStep() }
      startIcon={ <RestartAlt/> }
      color="secondary"
      variant="outlined"
      size="large"
      fullWidth
    >
      Reset
    </Button>
  )
}

/**
 * Randomize button.
 *
 * @param randomizeButtonOnClick
 * @param randomizationSettingsButtonOnClick
 * @param shouldRandomizeShift
 * @param shouldRandomizeSwap
 * @return {Element}
 * @constructor
 */
const RandomizeButton = ({
                           randomizeButtonOnClick,
                           randomizationSettingsButtonOnClick,
                           shouldRandomizeShift,
                           shouldRandomizeSwap
                         }) => {
  return (
    <ButtonGroup
      variant="contained"
      color="info"
      size="large"
      fullWidth
    >
      <Button
        onClick={ randomizeButtonOnClick }
        disabled={ !shouldRandomizeShift && !shouldRandomizeSwap }
        startIcon={ <Casino/> }
        sx={ {
          flex: 4,
        } }
      >
        Randomize
      </Button>
      <Button
        onClick={ randomizationSettingsButtonOnClick }
        size="small"
        sx={ {
          flex: 1,
        } }
      >
        <Settings/>
      </Button>
    </ButtonGroup>
  )
}

/**
 * Snackbar with reset/randomize buttons.
 *
 * @param resetButtonOnClick
 * @param randomizeButtonOnClick
 * @param randomizationSettingsButtonOnClick
 * @param shouldRandomizeShift
 * @param shouldRandomizeSwap
 * @param imageModifiedDuringStep
 * @return {Element}
 * @constructor
 */
export const SnackBar = ({
                           // OnClick handlers
                           resetButtonOnClick,
                           randomizeButtonOnClick,
                           randomizationSettingsButtonOnClick,
                           // Randomization state props
                           shouldRandomizeShift,
                           shouldRandomizeSwap,
                           // Image modification detection
                           imageModifiedDuringStep
                         }) => {
  return (
    <Paper
      elevation={ 3 }
      sx={ {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        py: 1,
      } }
    >
      <Container maxWidth="md">
        {/*Reset/Randomize Buttons*/ }
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={ { xs: 'space-between', sm: 'space-evenly' } }
          spacing={ { xs: 1.5, sm: 2 } }
        >
          <ResetButton
            resetButtonOnClick={ resetButtonOnClick }
            imageModifiedDuringStep={ imageModifiedDuringStep }
          />
          <RandomizeButton
            randomizeButtonOnClick={ randomizeButtonOnClick }
            randomizationSettingsButtonOnClick={ randomizationSettingsButtonOnClick }
            shouldRandomizeShift={ shouldRandomizeShift }
            shouldRandomizeSwap={ shouldRandomizeSwap }
          />
        </Stack>
      </Container>
    </Paper>
  )
}