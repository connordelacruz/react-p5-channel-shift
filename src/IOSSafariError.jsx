import { Alert, AlertTitle, Dialog } from '@mui/material'
import React from 'react'


/**
 * Error message for when iOS fails to load a big image.
 *
 * @param open
 * @param onClose
 * @return {Element}
 * @constructor
 */
export const IOSSafariError = ({ open, onClose }) => {
  const errorImage = new Image()
  errorImage.src = require('./error-images/sad-ipod.png')
  errorImage.alt = "Sad iPod"
  return (
    <Dialog
      open={ open }
      onClose={ onClose }
      scroll="paper"
    >
      <Alert
        severity="error"
        icon={
          <img
            src={ errorImage.src }
            alt={ errorImage.alt }
            width={ errorImage.width }
            height={ errorImage.height }
          />
        }
        onClose={ onClose }
      >
        <AlertTitle>Error: Selected image too large for Safari on iOS :(</AlertTitle>
        <p>
          Due to a bug with Safari on iOS, images larger than 16.7 megapixels cannot be used.
        </p>
        <p>
          Until Apple fixes this, please use a different browser, resize the image, or select a smaller image.
        </p>
        <p>
          <i>(Sorry, I really tried to fix this. Blame Tim Apple.)</i>
        </p>
      </Alert>
    </Dialog>
  )
}