import React, { useState } from "react";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
// @mui
import { Stack, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import palette from "../../theme/palette";

//main function
export default function ViewClubInfo({ data }) {
  const [displayData, setdisplayData] = useState(data);

  const FeildShow = (item) => {
    return (
      <>
        <Stack sx={{ padding: 1 }} flexDirection={"row"}>
          <Typography
            sx={{
              color: palette.primary.gold,
              fontSize: 16,
              fontWeight: "600",
              paddingRight: 2,
            }}
          >
            {item?.keyName} :
          </Typography>
          <Typography
            sx={{
              color: palette.primary.gold,
              fontSize: 16,
            }}
          >
            {item?.value}
          </Typography>
        </Stack>
      </>
    );
  };

  console.log(displayData?.name, "data?.data.photos====>");
  return (
    <>
      <Container
        sx={{
          bgcolor: "black",
          width: "100%",
          height: "100%",
          borderTopColor: "red",
        }}
        maxWidth="xl"
      >
        <Typography variant="h4" sx={{ mb: 5, color: "#E4D0B5" }}>
          Club Information
        </Typography>
        {displayData?.photos?.length > 0 && (
          <ImageList
            sx={{ width: "100%", height: 450 }}
            cols={3}
            rowHeight={164}
          >
            {displayData?.photos?.map((item, id) => (
              <ImageListItem key={item}>
                <img
                  src={`${item}`}
                  srcSet={`${item}`}
                  alt={id}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        )}
        <Box sx={{ paddingBottom: 60 }}>
          <Typography variant="h4" sx={{ mb: 2, color: "#E4D0B5" }}>
            Details
          </Typography>
          <FeildShow keyName={"Name "} value={displayData.name} />

          <FeildShow keyName={"Phone Number"} value={displayData.phoneNumber} />

          <FeildShow keyName={"InstaHandle"} value={displayData?.instaHandle} />

          <FeildShow keyName={"Website "} value={displayData.website} />

          <FeildShow
            keyName={"Stripe Account Number "}
            value={displayData?.stripeAccountNumber}
          />
          <FeildShow
            keyName={"Line Items"}
            value={displayData?.Address?.Address}
          />
          {/* <Typography variant="h4" sx={{ mb: 2, mt: 2, color: "#E4D0B5" }}>
            Line Items
          </Typography> */}
        </Box>
      </Container>
    </>
  );
}
