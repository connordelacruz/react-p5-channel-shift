import { CircularProgress, Dialog, DialogContent } from '@mui/material'

export const LoadingDialog = ({ open }) => {
  return (
    <Dialog
      open={ open }
      keepMounted
    >
      <DialogContent>
        <CircularProgress
          color="info"
        />
      </DialogContent>
    </Dialog>
  )
}