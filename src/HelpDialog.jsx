import { Box, Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography } from '@mui/material'
import { Close } from '@mui/icons-material'

export function HelpDialog({ open, onClose }) {
  return (
    <Dialog
      open={ open }
      onClose={ onClose }
      scroll="paper"
    >
      <DialogTitle>Help</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={ onClose }
        sx={ {
          position: 'absolute',
          right: 8,
          top: 8,
        } }
      >
        <Close/>
      </IconButton>
      <DialogContent dividers>
        <Stack
          direction="column"
          spacing={ 2 }
        >
          <Box>
            <Typography variant="h5" gutterBottom>
              Overview
            </Typography>
            <Typography gutterBottom>
              TODO: explain rgb
            </Typography>
          </Box>

          <Typography variant="h4" gutterBottom>
            Tools
          </Typography>
          <Box>
            <Typography variant="h5" gutterBottom>
              Shift
            </Typography>
            <Typography gutterBottom>
              The <b>Shift</b> tab lets you move a color channel vertically and/or horizontally.
            </Typography>
            <Typography gutterBottom>
              Select which color channel you want to shift with the <b>Red</b>, <b>Green</b>, or <b>Blue</b> buttons.
            </Typography>
            <Typography gutterBottom>
              Use the <b>X Shift</b> slider to move the selected channel horizontally.
            </Typography>
            <Typography gutterBottom>
              Use the <b>Y Shift</b> slider to move the selected channel vertically.
            </Typography>
            <Typography gutterBottom>
              You can enter a specific pixel value to shift by using the text inputs.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom>
              Swap
            </Typography>
            <Typography gutterBottom>
              {/*TODO: re-write*/}
              The <b>Swap</b> tab lets you switch 2 color channels. E.g. if you select blue as the <b>Source
              Channel</b> and green as the <b>Target Channel</b>, the resulting image will use the blue values of the
              original image as
              the values for the green channel and vice versa (it's kind of hard to explain, but the effect is pretty
              cool,
              play around with it to get a feel for how it works!)
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom>
              Randomize
            </Typography>
            <Typography gutterBottom>
              TODO: randomize button + randomization tab
            </Typography>
          </Box>

        </Stack>
      </DialogContent>
    </Dialog>
  )
}