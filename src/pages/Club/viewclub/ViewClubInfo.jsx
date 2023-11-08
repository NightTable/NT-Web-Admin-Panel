// ViewClubInfo.js

import React, { useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Stack, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import './ViewClubInfo.css'; // Import the CSS file

export default function ViewClubInfo({ data }) {
  const [displayData, setDisplayData] = useState(data);

  const FeildShow = (item) => (
      <Stack className='field-show-container' flexDirection='row'>
          <Typography className='key-name'>{item?.keyName} :</Typography>
          <Typography className='value'>{item?.value}</Typography>
        </Stack>
    );
  return (
    <Container className='container'>
        <Typography variant='h4' className='heading'>
          Club Information
        </Typography>
        {displayData?.photos?.length > 0 && (
          <ImageList className='image-list' cols={3} rowHeight={164}>
            {displayData?.photos?.map((item, id) => (
              <ImageListItem key={item}>
                <img
                  src={`${item}`}
                  srcSet={`${item}`}
                  alt={item}
                  loading='lazy'
                />
              </ImageListItem>
            ))}
          </ImageList>
        )}
        <Box className='details-container'>
          <FeildShow keyName='Name ' value={displayData.name} />
          <FeildShow keyName='Phone Number' value={displayData.phoneNumber} />
          <FeildShow keyName='InstaHandle' value={displayData?.instaHandle} />
          <FeildShow keyName='Website ' value={displayData.website} />
          <FeildShow
            keyName='Stripe Account Number '
            value={displayData?.stripeAccountNumber}
          />
          <FeildShow
            keyName='Address'
            value={displayData?.Address?.Address}
          />
        </Box>
      </Container>
  );
}
