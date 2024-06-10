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
            <Typography variant="h4">
              Channel Shift
            </Typography>
            <Typography variant="caption" gutterBottom>
              © {new Date().getFullYear()} Connor de la Cruz
            </Typography>
          </Box>
          <Box>
            <Typography gutterBottom>
              A tool for shifting and swapping RGB color channels.
            </Typography>
          </Box>
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
              Use the <b>X Shift</b> slider or text input to move the selected channel horizontally.
            </Typography>
            <Typography gutterBottom>
              Use the <b>Y Shift</b> slider or text input to move the selected channel vertically.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom>
              Swap
            </Typography>
            <Typography gutterBottom>
              The <b>Swap</b> tab lets you switch 2 color channels.
            </Typography>
            <Typography gutterBottom>
              E.g. Selecting <b>Blue</b> and <b>Red</b> will use the values of the blue channel for the red channel and and the values of the red channel for the blue channel.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom>
              Randomize
            </Typography>
            <Typography gutterBottom>
              Clicking the <b>Randomize</b> button will pick random values for shifts and swaps.
            </Typography>
            <Typography gutterBottom>
              By default:
              <ul>
                <li>All shift values for all channels will be randomized to anything from 0px to the max size of each dimension.</li>
                <li>Swap channels will be randomly selected, but will always be 2 different channels.</li>
              </ul>
            </Typography>
            <Typography gutterBottom>
              You can customize randomization behavior in the <b>Randomize</b> tab.
            </Typography>

            <Typography variant="h6" gutterBottom>
              Randomize Shift
            </Typography>
            <Typography gutterBottom>
              The <b>Randomize Shift</b> section lets you control the randomization behavior of channel shift values.
            </Typography>
            <Typography gutterBottom>
              Check or uncheck the <b>Randomize X Shift?</b> and <b>Randomize Y Shift?</b> boxes for any channel to enable or disable X and Y shift randomization for that color channel.
            </Typography>
            <Typography gutterBottom>
              Use the <b>Max X Shift %</b> and <b>Max Y Shift %</b> inputs to set the maximum amount for X and Y shifting for each channel. E.g. Setting a max X shift of 25% means that the corresponding channel will not be shifted horizontally farther than 25% of the image width.
            </Typography>
            <Typography gutterBottom>
              The <b>All Channels</b> row can be used to quickly enable/disable X or Y shifting and set max X or Y shift percents for all channels at once.
            </Typography>
            <Typography gutterBottom>
              You can disable shift randomization entirely using the toggle next to the <b>Randomize Shift</b> section title.
            </Typography>

            <Typography variant="h6" gutterBottom>
              Randomize Swap
            </Typography>
            <Typography gutterBottom>
              The <b>Randomize Swap</b> section lets you control the randomization behavior of channel swapping.
            </Typography>
            <Typography gutterBottom>
              Check or uncheck the <b>Random Source Option?</b> and <b>Random Target Option?</b> boxes for any channel to enable or disable that channel as a swap option.
            </Typography>
            <Typography gutterBottom>
              The <b>All Channels</b> row can be used to quickly enable/disable all channels at once as source or target options.
            </Typography>
            <Typography gutterBottom>
              Enabling the <b>Attempt to pick different source and target channels when possible</b> toggle will make it so 2 different channels are selected if possible to try and ensure a swap occurs. Disabling this will make it more random, so sometimes the same channel is picked for both, meaning no swap occurs.
            </Typography>
            <Typography gutterBottom>
              You can disable swap randomization entirely using the toggle next to the <b>Randomize Swap</b> section title.
            </Typography>
          </Box>

        </Stack>
      </DialogContent>
    </Dialog>
  )
}