import { React, useState, useEffect } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  Avatar,
  IconButton,
  Popover
} from '@mui/material';
// mocks_
// import account from "../../../_mock/account";
import { useNavigate } from 'react-router-dom';
import { LocalStorageKey } from 'src/utils/localStorage/keys';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Profile',
    icon: 'eva:person-fill'
  }
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [email, setemail] = useState('');

  const [name, setname] = useState();
  const navigate = useNavigate();

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    resetLocalStorage();
    setOpen(null);
    navigate('/');
  };

  useEffect(() => {
    async function loadData() {
      const representativeData = localStorage.getItem(
        LocalStorageKey.USER_DATA
      );
      if (email != '') {
        if (representativeData.length != undefined) {
          const parseData = JSON.parse(representativeData);
          setname(`${parseData.firstName} ${parseData.lastName}`);
          setemail(parseData.email);
        } else {
          handleClose();
        }
      }
    }
    loadData();
  }, []);

  const resetLocalStorage = async () => {
    const d1 = localStorage.clear();
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8)
            }
          })
        }}
      >
        {/* <Avatar src={account.photoURL} alt="photoURL" /> */}
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            backgroundColor: 'black',
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75
            }
          }
        }}
      >
        <Box
          style={{
            padding: 12
          }}
        >
          <Typography
            sx={{ color: '#E4D0B5', my: 1.5 }}
            variant='subtitle2'
            noWrap
          >
            {name}{' '}
          </Typography>
          <Divider sx={{ borderStyle: 'dashed' }} />

          <Typography variant='body2' sx={{ color: '#E4D0B5' }} noWrap>
            {email}
          </Typography>
          <Divider sx={{ borderStyle: 'dashed' }} />

          <Divider sx={{ borderStyle: 'dashed' }} />

          <MenuItem onClick={handleClose} style={{ my: 1.5, color: '#E4D0B5' }}>
            Logout
          </MenuItem>
        </Box>
      </Popover>
    </>
  );
}
