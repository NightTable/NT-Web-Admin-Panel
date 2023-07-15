// import * as React from "react";
// import { useState, useEffect } from "react";
// // @mui
// // @mui
// import { Popover, Box, Stack } from "@mui/material";
// import Iconify from "../../component/iconify";

// // components
// import Scrollbar from "../../component/scrollbar";

// //MAIN FUNCTION
// export const DyanimcModal = ({
//   openModal,
//   afterOpenModal,
//   closeModal,
//   renderUi,
//   modalIsOpen,
// }) => {
//   return (
//     <>
//       <Popover
//         open={modalIsOpen}
//         anchorEl={open}
//         onClose={() => {
//           setImageDialogPopUp(!true);
//         }}
//         anchorOrigin={{
//           //  vertical: "center",
//           horizontal: "center",
//         }}
//         transformOrigin={
//           {
//             //  vertical: "center",
//             // horizontal: "center",
//           }
//         }
//         PaperProps={{
//           sx: {
//             p: 1,
//             width: "100%",
//             height: "100%",
//             borderColor: "#E4D0B5",
//             // backgroundColor: '#E4D0B5',

//             "& .MuiMenuItem-root": {
//               typography: "body2",
//               // borderRadius: 1,
//               alignItems: "center",
//               justifyContent: "center",
//               width: "100%",
//               height: "100%",
//               borderColor: "#E4D0B5",
//             },
//           },
//         }}
//       >
//         <Stack alignItems={"flex-end"} justifyItems={"right"}>
//           <IconButton
//             size="large"
//             color="inherit"
//             onClick={() => {
//               setImageDialogPopUp(!true);
//             }}
//           >
//             <Iconify color={"black"} icon={"maki:cross"} />
//           </IconButton>
//         </Stack>
//         <Scrollbar>
//           <Box
//             component="form"
//             sx={{
//               width: "100%",
//               borderWidth: 4,
//               backgroundColor: "black",
//               borderRadius: 4,
//             }}
//           >
//             {renderUi()}
//           </Box>
//         </Scrollbar>
//       </Popover>
//     </>
//   );
// };
