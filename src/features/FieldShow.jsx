import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
// @mui
import { Stack, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import palette from '../theme/palette';

export const FeildShow = (item) => (
      <Stack sx={{ padding: 1 }} flexDirection='row'>
          <Typography
            sx={{
              color: palette.primary.gold,
              fontSize: 16,
              fontWeight: '600',
              paddingRight: 2
            }}
          >
            {item?.keyName} :
          </Typography>
          <Typography
            sx={{
              color: palette.primary.gold,
              fontSize: 16,
              fontWeight: '600'
            }}
          >
            {item?.value}
          </Typography>
        </Stack>
    );