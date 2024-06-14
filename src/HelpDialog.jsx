import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography
} from '@mui/material'
import { Casino, Close, FileUpload, HelpOutline, RestartAlt, Save, SwapHoriz } from '@mui/icons-material'
import { ChannelShiftLogo } from './common/ChannelShiftLogo'

export function HelpDialog({ open, onClose }) {
  return (<Dialog
    open={ open }
    onClose={ onClose }
    scroll="paper"
  >
    <DialogTitle>
      Help
    </DialogTitle>
    <IconButton
      aria-label="close"
      onClick={ onClose }
      sx={ {
        position: 'absolute', right: 8, top: 8,
      } }
    >
      <Close/>
    </IconButton>
    <DialogContent dividers>
      <Stack
        direction="column"
        spacing={ 2 }
      >

        {/*Title and Header Image*/ }
        <Box
          sx={ { textAlign: 'center' } }
        >
          <ChannelShiftLogo textFontSize="large" center/>
          <Typography variant="caption" gutterBottom>
            © { new Date().getFullYear() } Connor de la Cruz
          </Typography>
        </Box>

        <Box>
          {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */ }
          <img
            src={ process.env.PUBLIC_URL + '/channel-shift-preview.png' }
            className="help-dialog-image"
            alt="Sample Channel Shifted Image of the Chicago Skyline"
          />
        </Box>

        {/*<Box*/}
        {/*  sx={ { textAlign: 'center' } }*/}
        {/*>*/}
        {/*</Box>*/}

        <Divider/>

        {/*UI Overview Section*/ }
        <Stack
          direction="column"
          divider={ <Divider/> }
          spacing={ 2 }
        >
          <Box>
            <Typography variant="h4" sx={ { textAlign: 'center' } }>
              UI Overview
            </Typography>
          </Box>
          <Box>
            <img
              src={ require('./help-screenshots/channel-shift-ui.png') }
              className="help-dialog-image"
              alt="Overview of app UI"
            />
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom>
              Save / Load / Help
            </Typography>
            <Typography gutterBottom>
              On the top right of the app, there are 3 buttons:

              <List>
                <ListItem>
                  <ListItemIcon>
                    <Save color="info"/>
                  </ListItemIcon>
                  <ListItemText
                    primary="Save"
                    secondary="Save the current image as a full-resolution PNG."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <FileUpload color="warning"/>
                  </ListItemIcon>
                  <ListItemText
                    primary="Load"
                    secondary="Load a new image. (Note: Images are never uploaded to a server. Anything you upload stays entirely in your browser.)"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <HelpOutline color="secondary"/>
                  </ListItemIcon>
                  <ListItemText
                    primary="Help"
                    secondary="Show this help text."
                  />
                </ListItem>
              </List>
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom>
              Tool Tabs
            </Typography>
            <img
              src={ require('./help-screenshots/tool-tabs.png') }
              className="help-dialog-image"
              alt="Tool tabs UI"
            />
            <Typography gutterBottom>
              Use the <b>Tool Tabs</b> to select one of the following tools:

              <List>
                <ListItem>
                  <ListItemText
                    primary="Shift"
                    secondary="Move color channels horizontally and vertically."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Swap"
                    secondary="Switch 2 color channels with each other."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Randomize"
                    secondary="Customize behavior of the Randomize button."
                  />
                </ListItem>
              </List>

              See the <b>Tools Overview</b> section below for details on each of these tools.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom>
              Reset / Randomize
            </Typography>
            <Typography gutterBottom>
              On the bottom of the app, there are 2 buttons:

              <List>
                <ListItem>
                  <ListItemIcon>
                    <RestartAlt color="primary"/>
                  </ListItemIcon>
                  <ListItemText
                    primary="Reset"
                    secondary="Reset all shift and swap values."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Casino color="info"/>
                  </ListItemIcon>
                  <ListItemText
                    primary="Randomize"
                    secondary='Randomize shift and swap values. Customize the behavior of this button in the "Randomize" Tool Tab.'
                  />
                </ListItem>
              </List>
            </Typography>
          </Box>
        </Stack>

        <Divider/>

        {/*Tools Overview Section*/ }
        <Stack
          direction="column"
          divider={ <Divider/> }
          spacing={ 2 }
        >
          <Box>
            <Typography variant="h4" sx={ { textAlign: 'center' } }>
              Tools Overview
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom>
              Shift
            </Typography>
            <img
              src={ require('./help-screenshots/shift-tool-ui.png') }
              className="help-dialog-image"
              alt="Shift tool UI"
            />
            <Typography gutterBottom>
              The <b>Shift</b> tab lets you move color channels horizontally and vertically.
            </Typography>
            <ul>
              <li>
                Select a channel to shift with the <b>Red</b>, <b>Green</b>, or <b>Blue</b> buttons.
              </li>
              <li>
                Shift the selected channel horizontally with the <b>X Shift</b> slider.
              </li>
              <li>
                Shift the selected channel vertically with the <b>Y Shift</b> slider.
              </li>
              <li>
                Set a specific X or Y shift value using the text inputs next to the sliders.
              </li>
            </ul>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom>
              Swap
            </Typography>
            <img
              src={ require('./help-screenshots/swap-tool-ui.png') }
              className="help-dialog-image"
              alt="Swap tool UI"
            />
            <Typography gutterBottom>
              The <b>Swap</b> tab lets you switch 2 color channels with each other.
            </Typography>
            <ul>
              <li>Select 2 different channels to swap them.</li>
              <li>Select the same channel twice to disable swap.</li>
            </ul>
          </Box>

          {/*TODO: Re-write below*/ }
          <Box>
            <Stack
              direction="column"
              spacing={ 2 }
            >
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
                    <li>All shift values for all channels will be randomized to anything from 0px to the max size of
                      each
                      dimension.
                    </li>
                    <li>Swap channels will be randomly selected. They may be 2 different channels, or the same channel
                      (i.e. no swapping).
                    </li>
                  </ul>
                </Typography>
                <Typography gutterBottom>
                  You can fine-tune randomization behavior in the <b>Randomize</b> tab using the options below.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" gutterBottom>
                  Randomize Shift:
                </Typography>
                <img
                  src={ require('./help-screenshots/randomize-shift-tool-ui.png') }
                  className="help-dialog-image"
                  alt="Randomize shift tool UI"
                />
                <Typography gutterBottom>
                  The <b>Randomize Shift</b> section lets you control the randomization behavior of channel shift
                  values.
                </Typography>
                <ul>
                  <li>
                    Check or uncheck the <b>Randomize X Shift?</b> and <b>Randomize Y Shift?</b> boxes for any channel
                    to
                    enable or disable X and Y shift randomization for that color channel.
                  </li>
                  <li>
                    Use the <b>Max X Shift %</b> and <b>Max Y Shift %</b> inputs to set the maximum amount for X and Y
                    shifting for each channel. E.g. Setting a max X shift of 25% means that the corresponding channel
                    will
                    not
                    be shifted horizontally farther than 25% of the image width.
                  </li>
                  <li>
                    The <b>All Channels</b> row can be used to quickly enable/disable X or Y shifting and set max X or Y
                    shift
                    percents for all channels at once.
                  </li>
                  <li>
                    You can disable shift randomization entirely using the toggle next to the <b>Randomize
                    Shift</b> section
                    title.
                  </li>
                </ul>
              </Box>

              <Box>
                <Typography variant="h6" gutterBottom>
                  Randomize Swap:
                </Typography>
                <img
                  src={ require('./help-screenshots/randomize-swap-tool-ui.png') }
                  className="help-dialog-image"
                  alt="Randomize swap tool UI"
                />
                <Typography gutterBottom>
                  The <b>Randomize Swap</b> section lets you control the randomization behavior of channel swapping.
                </Typography>
                <ul>
                  <li>
                    Check or uncheck the <b>Random Source Option?</b> and <b>Random Target Option?</b> boxes for any
                    channel
                    to enable or disable that channel as a swap option.
                  </li>
                  <li>
                    The <b>All Channels</b> row can be used to quickly enable/disable all channels at once as source or
                    target
                    options.
                  </li>
                  <li>
                    Enabling the <b>Attempt to pick different source and target channels when possible</b> toggle will
                    make
                    it
                    so 2 different channels are selected if possible to try and ensure a swap occurs. Disabling this
                    will
                    make
                    it more random, so sometimes the same channel is picked for both, meaning no swap occurs.
                  </li>
                  <li>
                    You can disable swap randomization entirely using the toggle next to the <b>Randomize
                    Swap</b> section
                    title.
                  </li>
                </ul>
              </Box>

            </Stack>
          </Box>
        </Stack>

      </Stack>
    </DialogContent>
  </Dialog>)
}