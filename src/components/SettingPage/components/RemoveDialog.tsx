import React, { FC, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import ClearIcon from '@mui/icons-material/Clear';

import { TRemoveDialogProps, TEventFromDialog } from "../types/carsSettingsTypes";
import { Paper, Stack } from '@mui/material';


const RemoveDialog: FC<TRemoveDialogProps> = ({ callback, eventData }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e: any) => {
    setOpen(false);
  };

  const handleAgree = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    const event = target.dataset.event as "REMOVE_CAR" | "REMOVE_POINT" | "REMOVE_EVENT" | "REMOVE_USER";
    const subjectid = target.dataset.subjectid as string;
    const dialogEvent: TEventFromDialog = { event, subjectid };
    if (event && subjectid) callback(dialogEvent)
    setOpen(false);
  }

  return (
    <>
      <Button
        onClick={handleClickOpen}
        sx={{
          minWidth: '10px', width: '2rem',
          "& .MuiButton-startIcon": { margin: "auto" }
        }}
        // variant="outlined"
        startIcon={<ClearIcon sx={{ marginLeft: '0' }} />}></Button>
      <Dialog
        open={open}
        onClose={() => handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Удаление !"}
        </DialogTitle>
        <DialogContent>
          <Paper>

          <div dangerouslySetInnerHTML={{ __html: eventData.msg }} className='dialog-modal--content'></div>
          </Paper>

        </DialogContent>
        <DialogActions >
          <Stack display={'flex'} flexDirection={'row'} justifyContent={'space-between'}
            sx={{ width: '100%' }}
          >
            <Button
              data-event={eventData.event}
              data-subjectid={eventData.subjectid}
              onClick={(e: any) => handleAgree(e)}
            >Согласен</Button>
            <Button onClick={(e: any) => handleClose(false)} autoFocus>
              Отмена
            </Button>
          </Stack>

        </DialogActions>
      </Dialog >
    </>
  );
}

export default RemoveDialog