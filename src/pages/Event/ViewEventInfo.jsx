import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
// @mui
import { Stack, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import palette from "../../theme/palette";

//main function
export default function ViewEventInfo(data) {
  console.log("data", data.data);

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
              fontWeight: "600",
            }}
          >
            {item?.value}
          </Typography>
        </Stack>
      </>
    );
  };

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
        <Typography variant="h4" sx={{ mb: 5, color: palette.primary.gold }}>
          Club Information
        </Typography>
        {data?.data?.photos.length > 0 ? (
          <ImageList
            sx={{ width: "100%", height: 450 }}
            cols={3}
            rowHeight={164}
          >
            {data?.data.photos.map((item, id) => (
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
        ) : (
          <></>
        )}
        <Box sx={{paddingBottom:60}}>
          <Typography variant="h4" sx={{ mb: 2, color: palette.primary.gold }}>
            Details
          </Typography>
          <FeildShow keyName={"Name "} value={data?.data?.name} />

          <FeildShow keyName={"Phone Number"} value={data?.data?.phoneNumber} />

          <FeildShow keyName={"InstaHandle"} value={data?.data?.instaHandle} />

          <FeildShow keyName={"Website "} value={data?.data?.website} />

          <FeildShow
            keyName={"Stripe Account Number "}
            value={data?.data?.stripeAccountNumber}
          />
          <FeildShow
            keyName={"Line Items"}
            value={data?.data?.Address?.Address}
          />
          {/* <Typography variant="h4" sx={{ mb: 2, mt: 2, color: palette.primary.gold }}>
            Line Items
          </Typography> */}
        </Box>
      </Container>
    </>
  );
}
