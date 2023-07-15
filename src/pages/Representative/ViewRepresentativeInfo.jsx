import React from "react";
// @mui
import { FeildShow } from "src/features/FieldShow";
// @mui
import Scrollbar from "../../component/scrollbar";
// @mui
import {
  Box,
  Stack,
  Container,
  Typography,
} from "@mui/material";
import { TextField } from "@material-ui/core";
import Switch from "react-switch";

import palette from "src/theme/palette";
//main function
export default function ViewClubInfo(data) {
  console.log("data", data?.data);

  const privilegesCondition = data.data.clubPrivileges[0].privileges;

  const PivilegeArr = [
    {
      id: 0,
      text: "Add, edit or delete table configurations?",
      privilege: privilegesCondition.tableConfigPrivilege,
      name: "tableConfigPrivilege",
    },
    {
      id: 1,
      text: "Add, edit or delete events ?",
      privilege: privilegesCondition.eventPrivileges,
      name: "eventPrivileges",
    },
    {
      id: 2,
      text: "Delete reservations, place orders during reservation ?",
      privilege: privilegesCondition.reservationManagementPrivileges,
      name: "reservationManagementPrivileges",
    },
    // {
    //   id: 3,
    //   text: "Confirm arrival of table groups ?",
    //   privilege: false,
    //   name: "mobileAppTableMinimumPrivileges",
    // },
    {
      id: 4,
      text: "Set custom table minimums on NightTable App ?",
      privilege: privilegesCondition.mobileAppTableMinimumPrivileges,
      name: "mobileAppTableMinimumPrivileges",
    },
    {
      id: 5,
      text: "Add, edit or delete menu items ?",
      privilege: privilegesCondition.menuItemPrivileges,
      name: "menuItemPrivileges",
    },
    {
      id: 6,
      text: "Add, edit or delete clubs ?",
      privilege: privilegesCondition.clubPrivileges,
      name: "clubPrivileges",
    },
    {
      id: 7,
      text: "Add, edit or delete representatives ?",
      privilege: privilegesCondition.representativePrivileges,
      name: "representativePrivileges",
    },
  ];

  return (
    <>
      <Scrollbar>
        <Container
          sx={{
            bgcolor: "black",
            width: "100%",
            height: "100%",
          }}
          maxWidth="xl"
        >
          <Box></Box>

          <Box sx={{ paddingBottom: 10 }}>
            <Typography variant="h4" sx={{ mb: 2, color: palette.primary.gold }}>
              Representative Information
            </Typography>
            <FeildShow
              keyName={"Name "}
              value={`${data?.data?.firstName} ${data?.data?.lastName}`}
            />
            <FeildShow keyName={"User Name"} value={data?.data?.username} />
            <FeildShow keyName={"Email"} value={data?.data?.email} />
            <FeildShow
              keyName={"Phone Number"}
              value={data?.data?.phoneNumber}
            />
            <FeildShow keyName={"Role"} value={data?.data?.role} />

            <Typography variant="h4" sx={{ mb: 3, mt: 3, color: palette.primary.gold }}>
              Privileges{" "}
            </Typography>

            {PivilegeArr.map((item, index) => {
              return (
                <>
                  <Stack flexDirection={"row"}>
                    <Box sx={{ width: "70%" }}>
                      <Typography
                        fullWidth
                        sx={{ color: palette.primary.gold }}
                      >
                        {item.text}{" "}
                      </Typography>
                    </Box>
                    <Box sx={{ width: "30%", paddingBottom: 2 }}>
                      <Box sx={{ paddingBottom: 2 }}>
                        {/* <Switch
                          style={{
                            color: "primary",
                          }}
                          inputProps={{ "aria-label": "controlled" }}
                          checked={item.privilege}
                          //  onChange={() => handleSwitchChange(item.id)}
                        /> */}

                        <Switch
                          checked={item.privilege}
                          onColor={"#AA6C39"}
                          onHandleColor={palette.primary.gold}
                          handleDiameter={30}
                          uncheckedIcon={false}
                          checkedIcon={false}
                          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                          height={20}
                          width={48}
                          className="react-switch"
                          id="material-switch"
                        />
                      </Box>
                    </Box>
                  </Stack>
                </>
              );
            })}
          </Box>
        </Container>
      </Scrollbar>
    </>
  );
}
