import { Button, Container, Divider, Paper, Stack, Tooltip } from '@mui/material'
import { Casino, CheckCircleOutline, RestartAlt } from '@mui/icons-material'
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
    <Tooltip title="Reset all shift and swap values" placement="top">
      <span>
              <Button
                onClick={ resetButtonOnClick }
                disabled={ !imageModifiedDuringStep() }
                startIcon={ <RestartAlt/> }
                color="secondary"
                variant="outlined"
              >
              Reset
            </Button>
    </span>
    </Tooltip>
  )
}

/**
 * Randomize button.
 *
 * @param randomizeButtonOnClick
 * @param shouldRandomizeShift
 * @param shouldRandomizeSwap
 * @return {Element}
 * @constructor
 */
const RandomizeButton = ({
                           randomizeButtonOnClick,
                           shouldRandomizeShift,
                           shouldRandomizeSwap
                         }) => {
  // TODO: see Tooltip reference to get this formatting better:
  return (
    <Tooltip title='Randomize shift and swap values (click "Randomization" tab for more options)'
             placement="top">
            <span>
              <Button
                onClick={ randomizeButtonOnClick }
                disabled={ !shouldRandomizeShift && !shouldRandomizeSwap }
                startIcon={ <Casino/> }
                color="info"
                variant="contained"
                disableElevation
              >
                Randomize
            </Button>
            </span>
    </Tooltip>
  )
}

/**
 * Confirm step button.
 *
 * @param confirmButtonOnClick
 * @param imageModifiedDuringStep
 * @return {Element}
 * @constructor
 */
const ConfirmButton = ({
                         confirmButtonOnClick,
                         imageModifiedDuringStep
                       }) => {
  // TODO: come up with better tooltip phrasing:
  return (
    <Tooltip title="Use this modified result as base image" placement="top">
            <span>
              <Button
                onClick={ confirmButtonOnClick }
                disabled={ !imageModifiedDuringStep() }
                startIcon={ <CheckCircleOutline/> }
                color="secondary"
                variant="outlined"
              >
                Confirm
            </Button>
            </span>
    </Tooltip>
  )
}

/**
 * Snackbar with reset/randomize/confirm buttons.
 *
 * @param resetButtonOnClick
 * @param randomizeButtonOnClick
 * @param confirmButtonOnClick
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
                           confirmButtonOnClick,
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
        {/*Reset/Randomize/Confirm Buttons*/ }
        <Stack
          direction="row"
          divider={
            <Divider
              orientation="vertical"
              flexItem
              sx={ {
                display: { xs: 'none', sm: 'block' }
              } }
            />
          }
          alignItems="center"
          justifyContent={ { xs: 'space-between', sm: 'space-evenly' } }
          spacing={ { xs: 1, sm: 2 } }
          py={ 0.5 }
        >
          <ResetButton
            resetButtonOnClick={ resetButtonOnClick }
            imageModifiedDuringStep={ imageModifiedDuringStep }
          />
          <RandomizeButton
            randomizeButtonOnClick={ randomizeButtonOnClick }
            shouldRandomizeShift={ shouldRandomizeShift }
            shouldRandomizeSwap={ shouldRandomizeSwap }
          />
          <ConfirmButton
            confirmButtonOnClick={ confirmButtonOnClick }
            imageModifiedDuringStep={ imageModifiedDuringStep }
          />
        </Stack>
      </Container>
    </Paper>
  )
}