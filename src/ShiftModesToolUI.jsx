import { ChannelTabsContainer } from './common/ChannelTabsContainer'


// TODO: doc and implement
export const ShiftModesToolUI = ({
                                   selectedMoshChannel,
                                   setSelectedMoshChannel,
                                   selectedShiftModes,
                                   // TODO: setSelectedShiftMode for one channel
                                 }) => {

  return (
    <ChannelTabsContainer
      selectedChannelState={ selectedMoshChannel }
      setSelectedChannelState={ setSelectedMoshChannel }
    >
     cool stuff coming soon :)
    </ChannelTabsContainer>
  )
}