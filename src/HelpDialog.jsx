import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography
} from '@mui/material'
import { Casino, Close, FileUpload, HelpOutline, RestartAlt, Save } from '@mui/icons-material'
import { ChannelShiftLogo } from './common/ChannelShiftLogo'
import React from 'react'

export const HelpDialog = ({ open, onClose }) => {
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
          <Typography variant="subtitle2">
            Create art by playing with color channels.
          </Typography>
        </Box>

        <Box sx={ { textAlign: 'center' } }>
          {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */ }
          <img
            src={ process.env.PUBLIC_URL + '/channel-shift-preview.png' }
            className="help-dialog-image"
            alt="Sample Channel Shifted Image of the Chicago Skyline"
          />
          <Typography variant="caption" gutterBottom>
            © { new Date().getFullYear() } Connor de la Cruz
          </Typography>
        </Box>

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
                    secondary={
                      <React.Fragment>
                        Load a new image.<br/>
                        (Note: Images are never uploaded to a server. Any image you load stays entirely in your
                        browser.)
                      </React.Fragment>
                    }
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
                    primary={ <Link href="#shift">Shift</Link> }
                    secondary="Move color channels horizontally and vertically."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={ <Link href="#swap">Swap</Link> }
                    secondary="Switch 2 color channels with each other."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={ <Link href="#randomize">Randomize</Link> }
                    secondary="Customize behavior of the Randomize button."
                  />
                </ListItem>
              </List>

              See the <Link href="#tools-overview">Tools Overview</Link> section below for details on each of these
              tools.
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
                    secondary={
                      <React.Fragment>
                        Randomize shift and swap values.<br/>
                        Customize the behavior of this button in the "Randomize" Tool
                        Tab. See the <Link href="#randomize">Randomize</Link> section below for details.
                      </React.Fragment>
                    }
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
            <Typography
              variant="h4"
              sx={ { textAlign: 'center' } }
              id="tools-overview"
            >
              Tools Overview
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="h5"
              gutterBottom
              id="shift"
            >
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
            <List>
              <ListItem>
                <ListItemText
                  primary={
                    <React.Fragment>
                      <b>Red</b> / <b>Green</b> / <b>Blue</b>
                    </React.Fragment>
                  }
                  secondary={
                    <React.Fragment>
                      Select a channel to shift with the <b>Red</b>, <b>Green</b>, or <b>Blue</b> buttons.
                    </React.Fragment>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={ <b>X Shift</b> }
                  secondary={
                    <React.Fragment>
                      Shift the selected channel horizontally with the <b>X Shift</b> slider.<br/>
                      Set a specific horizontal shift value with the <b>X Shift</b> text input.
                    </React.Fragment>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={ <b>Y Shift</b> }
                  secondary={
                    <React.Fragment>
                      Shift the selected channel vertically with the <b>Y Shift</b> slider.<br/>
                      Set a specific vertical shift value with the <b>Y Shift</b> text input.
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
          </Box>

          <Box>
            <Typography
              variant="h5"
              gutterBottom
              id="swap"
            >
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
            <List>
              <ListItem>
                <ListItemText
                  primary="Swap Channels"
                  secondary="Select 2 different channels to swap them."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Unswap Channels"
                  secondary="Select the same channel twice to disable swap."
                />
              </ListItem>
            </List>
          </Box>

          <Box>
            <Stack
              direction="column"
              spacing={ 2 }
            >
              <Box>
                <Typography
                  variant="h5"
                  gutterBottom
                  id="randomize"
                >
                  Randomize
                </Typography>
                <Typography gutterBottom>
                  Clicking the <b>Randomize</b> button will pick random values for shifts and swaps.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" gutterBottom>
                  Default Randomization Behavior:
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="X Shift Randomization Default Behavior"
                      secondary="All channels will have a random X shift set to anything from 0px to the width of the image."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Y Shift Randomization Default Behavior"
                      secondary="All channels will have a random Y shift set to anything from 0px to the height of the image."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Swap Randomization Default Behavior"
                      secondary="Swap channels will be randomly selected. They may be 2 different channels, or the same channel (i.e. no swapping)."
                    />
                  </ListItem>
                </List>
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
                <List>
                  <ListItem>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <b>Randomize X Shift?</b> / <b>Randomize Y Shift?</b>
                        </React.Fragment>
                      }
                      secondary={
                        <React.Fragment>
                          Check or uncheck the <b>Randomize X Shift?</b> or <b>Randomize Y Shift?</b> box for any
                          channel to enable or disable X or Y shift randomization for that color channel.
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <b>Max X Shift %</b> / <b>Max Y Shift %</b>
                        </React.Fragment>
                      }
                      secondary={
                        <React.Fragment>
                          Use the <b>Max X Shift %</b> and <b>Max Y Shift %</b> inputs to set the maximum amount for X
                          and Y
                          shifting for each channel.
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <b>All Channels</b>
                        </React.Fragment>
                      }
                      secondary={
                        <React.Fragment>
                          The <b>All Channels</b> row can be used to quickly enable/disable X or Y shifting and set max
                          X or Y
                          shift
                          percents for all channels at once.
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </List>
                <Typography gutterBottom>
                  You can disable shift randomization entirely using the toggle next to the <b>Randomize
                  Shift</b> section
                  title.
                </Typography>
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
                <List>
                  <ListItem>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <b>Random Source Option?</b> / <b>Random Target Option?</b>
                        </React.Fragment>
                      }
                      secondary={
                        <React.Fragment>
                          Check or uncheck the <b>Random Source Option?</b> and <b>Random Target Option?</b> boxes for
                          any
                          channel
                          to enable or disable that channel as a swap option.
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <b>All Channels</b>
                        </React.Fragment>
                      }
                      secondary={
                        <React.Fragment>
                          The <b>All Channels</b> row can be used to quickly enable/disable all channels at once as
                          source or
                          target
                          options.
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <b>Attempt to pick different source and target channels when possible</b>
                        </React.Fragment>
                      }
                      secondary={
                        <React.Fragment>
                          Enabling the <b>Attempt to pick different source and target channels when
                          possible</b> checkbox will
                          make it so 2 different channels are selected (if possible) to ensure a swap occurs.<br/>
                          Disabling this will make it more random, so sometimes the same channel is picked for both,
                          meaning no swap occurs.
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </List>
                <Typography gutterBottom>
                  You can disable swap randomization entirely using the toggle next to the <b>Randomize
                  Swap</b> section
                  title.
                </Typography>
              </Box>

            </Stack>
          </Box>
        </Stack>

      </Stack>
    </DialogContent>
  </Dialog>)
}