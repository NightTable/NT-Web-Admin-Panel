/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { filter } from 'lodash';
import Box from '@mui/material/Box';
import { TextField } from '@material-ui/core';
import '../../css/DasboardCss.css';
// @mui
// @mui
import {
  Table,
  Stack,
  Paper,
  Button,
  Popover,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

// components
import ResponsiveDateTimePickers from 'src/component/ResponsiveDateTimePIcker';

// sections
// mock
// theme
// ----------------------------------------------------------------------
import {
  addEventtoDb,
  deleteEvent,
  getEventofClub,
  updateEventToDB
} from 'src/services/Event';

import { LocalStorageKey } from 'src/utils/localStorage/keys';
// services
import { getProfileData } from 'src/services/representative';
import dayjs from 'dayjs';
import { AddImage } from 'src/services/upload';
import {
  createTableConfig,
  deleteTableConfig,
  getEventConfigsData,
  updateTableConfig
} from 'src/services/tableConfig';
import { getClubs } from 'src/services/club';
import UploadSingleImage from '../UploadImage/UploadSingleImage';
import {
  EVENTS_TABLE_HEAD,
  EVENTS_TABLE_CONFIG_HEAD
} from '../../Table_Head/index';
import palette from '../../theme/palette';
import { UserListHead } from '../../sections/@dashboard/user';
import Scrollbar from '../../component/scrollbar';
import Iconify from '../../component/iconify';

// MAIN FUNCTION

export default function EventDashboard() {
  // get the current date
  const currentDateinISO5601 = dayjs().format('YYYY-MM-DDTHH:MM');
  const currentDateinTimeStamp = dayjs().valueOf();

  // NAVIGATION
  const navigate = useNavigate();
  // clubs
  const [clubs_data, setclubs_data] = useState([]);
  // CLicked Button
  const [selected_club_btn, setselected_club_btn] = useState(0);
  // selected club data
  const [selectedClubData, setselectedClubData] = useState([]);

  // States

  // EVENT
  const [EventData, setEventData] = useState([]);
  const [selectedEventData, setselectedEventData] = useState([]);

  // CREATE EVENT pop-over open
  const [addEventPopUp, setEventClubPopUp] = useState(false);
  // CREATE EVENT STATES==>
  const [EventName, setEventName] = useState('');
  const [ticketLink, setticketLink] = useState('');
  const [eventImage, seteventImage] = useState();
  const [EventDate, setEventDate] = useState(currentDateinISO5601);
  const [eventLoader, seteventLoader] = useState(false);
  // IMAGE POP-UP LOADER
  const [eventImageLoader, seteventImageLoader] = useState(false);
  // EDIT EVENT
  const [editEvent, seteditEvent] = useState(false);
  const [editEventImage, seteditEventImage] = useState(true);
  // SHOW CLUB
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // dialog

  const [deleteDialogOpen, setdeleteDialogOpen] = React.useState(false);

  // TABLE CONFIGURATION
  const [addTableConfigPopup, setaddTableConfigPopup] = useState(false);
  const [selectedTableConfigData, setselectedTableConfigData] = useState([]);
  const [editTableConfigCheck, seteditTableConfigCheck] = useState(false);
  const [tableConfigData, settableConfigData] = useState([]);

  const [showAllConfigDataPopUp, setshowAllConfigDataPopUp] = useState(false);
  // minimun price
  const [minPriceTC, setminPriceTC] = useState('');
  // type
  const [typeTC, settypeTC] = useState('');
  // recommendedCapacity
  const [recomCapacityTC, setrecomCapacityTC] = useState('');
  // table mapId
  const [tmapleIDTC, settmapleIDTC] = useState('');

  // globalLoader
  const [loaderEnabled, setloaderEnabled] = useState(false);
  useEffect(() => {
    loadData();
  }, []);

  // get the clubs
  // IF
  const loadData = async () => {
    const representativeId = localStorage.getItem(LocalStorageKey.USER_ID);
    // GETTING SAVED USER DATA
    const userData = localStorage.getItem(LocalStorageKey.USER_DATA);
    const parsedUserData = JSON.parse(userData);
    // CHECKING THE ROLE

    if (representativeId === null) {
      navigate('/');
    } else if (parsedUserData?.role == 'godFather') {
        const data = await getClubs();
        setclubs_data(data?.data);
        const obj = {
          date: currentDateinTimeStamp
        };
        getClubsEvent(data?.data[0]._id, obj);
      } else {
        getClubData(JSON.parse(representativeId));
      }
  };

  // GET CLUB DATA ====>
  const getClubData = async (representativeId) => {
    const data = await getProfileData(representativeId);
    const tempArr = [];
    data.clubPrivileges.map((item) => {
      tempArr.push({
        name: item.club.name,
        _id: item._id
      });
      return true;
    });

    setselectedClubData(tempArr[0]);
    const obj = {
      date: currentDateinTimeStamp
    };
    setclubs_data(tempArr);
    getClubsEvent(tempArr[0]._id, obj);
  };

  // GET CLUBS OF EVENT
  const getClubsEvent = async (club_id, obj) => {
    const data = await getEventofClub(club_id, obj);
    if (data.status === true) {
      setEventData(data.data);
    } else if (data.status === false) {
      setEventData([]);
    }
  };

  const Data = new FormData();

  // API CALL : ADD EVENT CLUB
  const addEvent = async () => {
    if (eventImage.length !== undefined) {
      seteventLoader(true);
      // ADD EVENT IMAGE DATA APPEND
      Data.append('_id', selectedClubData._id);
      Data.append('files', eventImage[0]);
      // ADD EVENT IMAGE API CALL
      const ImgUpload = await AddImage(Data);
      //  console.log("ImgUpload====>", ImgUpload);
      if (ImgUpload?.status == true) {
        const obj = {
          name: EventName,
          picture: ImgUpload.data[0],
          eventDate: EventDate,
          eventTime: EventDate,
          ticketLink,
          clubId: selectedClubData?._id
        };

        const storeEvent = await addEventtoDb(obj, selectedClubData?._id);
        console.log('storeEvent====>', storeEvent);
        if (storeEvent?.data?.status === true) {
          // UPDATE THE MAIN ARRAY
          const updateArray = [storeEvent?.data.data, ...EventData];
          setEventData(updateArray);
          // CLEAR THE STATES
          resettingEventStates();
          // CLOSE ADD EVENT POP-UP
          setEventClubPopUp(false);
          seteventLoader(false);
        } else {
          // WHEN EVENT ADD API NOT WORKING
          alert('ERROR while creating Events!');
        }
      } else {
        // WHEN IMAGE DOES N'T GET UPLOADED
        alert('ERROR while uploading Event Image!');
      }
    } else {
      alert('Please select a Event Image!');
    }
  };

  const updateEvent = async () => {
    seteventLoader(true);

    if (editEventImage === true) {
      Data.append('_id', selectedClubData._id);
      Data.append('files', eventImage[0]);
      // ADD EVENT IMAGE API CALL
      const ImgUpload = await AddImage(Data);
      if (ImgUpload.message === 'files uploaded') {
        const obj = {
          name: EventName,
          picture: ImgUpload.data[0],
          eventDate: EventDate,
          eventTime: EventDate,
          ticketLink,
          clubId: selectedClubData?._id
        };
        const updateData = await updateEventToDB(
          selectedClubData?._id,
          selectedEventData._id,
          obj
        );
        if (updateData.status == true) {
          const index = EventData.findIndex((item) => item._id == selectedEventData._id);

          EventData[index] = updateData.data;
          setEventData(EventData);
          alert('EVENT UPDATED SUCCESSFULLY!');
          // CLEAR THE STATES
          resettingEventStates();
        } else {
          // WHEN IMAGE DOES N'T GET UPLOADED
          alert('ERROR while Updating Events!');
        }
      }
    } else {
      const obj = {
        name: EventName,
        picture: eventImage,
        eventDate: EventDate,
        eventTime: EventDate,
        ticketLink,
        clubId: selectedClubData?._id
      };
      const updateData = await updateEventToDB(
        selectedClubData?._id,
        selectedEventData._id,
        obj
      );
      if (updateData.status === true) {
        const index = EventData.findIndex((item) => item._id === selectedEventData._id);

        EventData[index] = updateData.data;
        setEventData(EventData);
        alert('EVENT UPDATED SUCCESSFULLY!');
        // CLEAR THE STATES
        resettingEventStates();
        // CLOSE ADD EVENT POP-UP
        setEventClubPopUp(false);
        seteventLoader(false);
      } else {
        // WHEN IMAGE DOES N'T GET UPLOADED
        alert('ERROR while Updating Events!');
      }
    }
  };
  // CLEAR ADD POP-UP STATES
  const resettingEventStates = () => {
    // setEventDate("");
    setEventName('');
    setticketLink('');
    seteditEventImage(!true);
    seteditEvent(false);
    seteventLoader(false);
  };

  // DELETE EVENT UI
  const DeleteEventDialog = () => (
      <Dialog
          open={deleteDialogOpen}
          keepMounted
          onClose={() => {
            setdeleteDialogOpen(!deleteDialogOpen);
          }}
          aria-describedby='alert-dialog-slide-description'
        >
          <DialogTitle>Delete the Event?</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-slide-description'>
              Are you sure want to delete the Event, as you won't be able to
              recover it ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose('1');
              }}
            >
              Delete
            </Button>
            <Button
              onClick={() => {
                handleClose('2');
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
    );

  // delete event pop-up
  const handleClose = async (id) => {
    if (id == '1') {
      // API CALL
      const eventtoDelete = await deleteEvent(
        selectedClubData._id,
        selectedEventData._id
      );

      if (eventtoDelete.status === true) {
        const a = EventData.filter((item) => item._id !== selectedEventData._id);
        // UPDATE THE DATA
        setEventData(a);
        setdeleteDialogOpen(false);
        alert('EVENT DELETED SUCCESSFULLY !');
      } else {
        alert('ERROR IN DELETING THE EVENT ');
      }
    } else id === '2';
    setdeleteDialogOpen(false);
  };

  // TABLE CONFIGURATIONS
  // GET TABLE CONFIG

  const getIndEventTableConfig = async (eventData) => {
    const eventAllConfigs = await getEventConfigsData(
      selectedClubData?._id,
      eventData?._id
    );
    if (eventAllConfigs.status === true) {
      settableConfigData(eventAllConfigs.tableConfigForEvent.reverse());
      setshowAllConfigDataPopUp(true);
    }
  };

  // TABLE CONFIGURATION
  const addTableConfiguration = async () => {
    setloaderEnabled(true);

    const obj = {
      type: typeTC,
      minPrice: minPriceTC,
      recommendedCapacity: recomCapacityTC,
      clubId: selectedClubData._id,
      eventId: selectedEventData._id,
      tableMapId: tmapleIDTC
    };
    const tcAdd = await createTableConfig(obj);
    // GET EVENT NEW DETAILS
    if (tcAdd?.data?.status === true) {
      setaddTableConfigPopup(!true);
      alert('Table Configuration Addded!');
      if (tableConfigData.length === 0) {
        console.log('Event Data ::', EventData);
        console.log('Selected Event Data::', selectedEventData);
        const eventIndex = EventData.findIndex((item) => item._id == selectedEventData._id);
        EventData[eventIndex].isTableConfigAdded = true;
      } else {
        const tempTableConfigData = [tcAdd?.data.data, ...tableConfigData];
        settableConfigData(tempTableConfigData);
      }

      resettingTableConfigstates();
      setloaderEnabled(!true);
    } else {
      console.log('tcAdd?.data', tcAdd.response.data?.message);
      alert(tcAdd?.response?.data?.message);
      setloaderEnabled(!true);
    }
  };

  const updateStateforEditUpdateTableConfig = (data) => {
    setselectedTableConfigData([data]);
    settypeTC(data.type);
    setminPriceTC(data.minPrice);
    setrecomCapacityTC(data.recommendedCapacity);
    settmapleIDTC(data.tableMapId);
    seteditTableConfigCheck(true);
    setaddTableConfigPopup(true);
  };

  const deleteTableConfigurations = async (data) => {
    setloaderEnabled(true);

    const obj = {
      tableconfigId: data._id
    };
    const apiCall = await deleteTableConfig(obj);
    if (apiCall?.data?.status === true) {
      alert(apiCall?.data?.message);
      const tempTableConfigData = tableConfigData.filter((item) => item._id !== data._id);

      settableConfigData(tempTableConfigData);
      setloaderEnabled(!true);
    } else {
      alert('Technical Error !');
      setloaderEnabled(!true);
    }
  };
  // setselectedTableConfigData
  const editUpdateTableConfigurations = async (data) => {
    setloaderEnabled(true);
    const obj = {
      type: typeTC,
      minPrice: minPriceTC,
      recommendedCapacity: recomCapacityTC,
      clubId: selectedClubData._id,
      eventId: selectedEventData._id,
      tableMapId: tmapleIDTC
    };
    const apiCall = await updateTableConfig(
      selectedTableConfigData[0]._id,
      obj
    );
    if (apiCall.data?.status === true) {
      alert('Table Config Updated Successfully!');
      const updatingIndvTableConfigData = tableConfigData.findIndex((item) => item._id == selectedTableConfigData[0]._id);

      tableConfigData[updatingIndvTableConfigData] = apiCall.data.data;
      setaddTableConfigPopup(!true);
      setloaderEnabled(!true);
    } else {
      alert('Techincal Error ');
      setaddTableConfigPopup(!true);
      setloaderEnabled(!true);
    }
  };
  // resettingtable config the states
  const resettingTableConfigstates = () => {
    settypeTC('');
    setminPriceTC('');
    setrecomCapacityTC('');
    settmapleIDTC('');
    seteditTableConfigCheck(false);
  };

  // PAGES HANDLE
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  function getComparator(order, orderBy) {}

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - EventData.length) : 0;

  function applySortFilter(array, comparator, query) {
    const stabilizedThis = array?.map((el, index) => [el, index]);

    if (query) {
      return filter(
        array,
        (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    }
    return stabilizedThis.map((el) => el[0]);
  }

  const filteredData = applySortFilter(
    EventData,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredData?.length && !!filterName;
  return (
    <>
      <Helmet>
        <title> Night Table : Events </title>
      </Helmet>

      <Container maxWidth='xl'>
        <Container>
          <Stack direction='row' justifyContent='space-between' mb={5}>
            <Typography variant='h4' sx={{ color: palette.primary.gold }}>
              Events
            </Typography>
          </Stack>
          <Box display='flex'>
            <Box width='50%' textAlign='left'>
              <ResponsiveDateTimePickers
                value={currentDateinISO5601}
                onChange={(date) => {
                  setEventDate(date);
                }}
              />
              {/* </Box> */}
            </Box>
            <Box width='50%' textAlign='right'>
              <Button
                onClick={() => {
                  seteditEvent(false);
                  resettingEventStates();
                  seteditEventImage(true);
                  setEventClubPopUp(true);
                }}
                style={{
                  backgroundColor: palette.primary.gold,
                  color: palette.common.black,
                  padding: 8,
                  borderRadius: 10
                }}
                variant='Outlined'
                startIcon={<Iconify icon='eva:plus-fill' />}
              >
                Add Event
              </Button>
            </Box>
          </Box>

          <Scrollbar>
            <Stack direction='row' mt={2} mb={2}>
              {clubs_data.map((item, index) => (
                  <Box
                      onClick={() => {
                        setselected_club_btn(index);
                        setselectedClubData(item);
                        const obj = {
                          date: currentDateinTimeStamp
                        };
                        getClubsEvent(item._id, obj);
                      }}
                      border={2}
                      borderRadius={2}
                      marginRight={2}
                      borderColor={
                        index === selected_club_btn
                          ? palette.common.black
                          : palette.primary.gold
                      }
                      flexDirection='row'
                      justifyContent='center'
                      alignItems='center'
                      backgroundColor={
                        index === selected_club_btn
                          ? palette.primary.gold
                          : palette.common.black
                      }
                    >
                      <Typography
                        variant='body1'
                        style={{
                          color:
                            index === selected_club_btn
                              ? palette.common.black
                              : palette.primary.gold,
                          fontWeight:
                            index === selected_club_btn ? 'bold' : '500',
                          padding: 10,
                          textAlign: 'center'
                        }}
                      >
                        {item?.name}
                      </Typography>
                    </Box>
                ))}
            </Stack>
          </Scrollbar>

          <Container
            style={{
              borderWidth: 1,
              backgroundColor: palette.primary.gold,
              padding: 1,
              borderRadius: 4
            }}
            alignItems
          >
            <Scrollbar>
              <TableContainer>
                <Table>
                  <UserListHead
                    headLabel={EVENTS_TABLE_HEAD}
                    rowCount={EventData.length}
                    numSelected={selected.length}
                  />
                  <TableBody />
                </Table>
              </TableContainer>
            </Scrollbar>

            <Scrollbar>
              <TableContainer>
                <Table>
                  <TableBody>
                    {filteredData &&
                      filteredData
                        ?.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        ?.map((item, index) => {
                          const {
                            _id,
                            name,
                            isTableConfigAdded,
                            picture,
                            ticketLink,
                            eventDate
                          } = item;

                          return (
                            <TableRow
                                style={{
                                  margin: 20
                                }}
                                bgcolor={palette.primary.gold}
                                key={_id}
                                tabIndex={-1}
                              >
                                <TableCell align='left'>
                                  <Typography
                                    sx={{ color: palette.common.black }}
                                  >
                                    {
                                      <IconButton
                                          style={{
                                            background: palette.common.black
                                          }}
                                          size='large'
                                          color='inherit'
                                          onClick={() => {
                                            resettingTableConfigstates();
                                            settableConfigData([]);

                                            setselectedEventData(item);
                                            // IF TC = FALSE : DIRECT TC ADD
                                            if (isTableConfigAdded === false) {
                                              setaddTableConfigPopup(true);
                                            }
                                            // ELSE IF TRUE : TC.LENGTH === 1 - DIRECT TC UPDATE
                                            else if (
                                              isTableConfigAdded !== false
                                            ) {
                                              getIndEventTableConfig(item);
                                              // GET TC DATA
                                            }
                                            // ELSE IF : TC.LENGTH > 1 - MID POP-UP FOR TC : GET TC ARRAY : UPDATE & DELETE
                                          }}
                                        >
                                          <Iconify
                                            color={palette.primary.gold}
                                            icon={
                                              isTableConfigAdded === false
                                                ? 'eva:plus-fill'
                                                : 'material-symbols:edit'
                                            }
                                          />
                                        </IconButton>
                                    }
                                  </Typography>
                                </TableCell>
                                <TableCell
                                  bgcolor={palette.primary.gold}
                                  component='th'
                                  scope='row'
                                  padding='none'
                                >
                                  <Typography
                                    sx={{ color: palette.common.black, px: 2 }}
                                    variant='subtitle2'
                                    noWrap
                                  >
                                    {index + 1}
                                    {' )'} {name}
                                  </Typography>
                                </TableCell>
                                <TableCell
                                  bgcolor={palette.primary.gold}
                                  component='th'
                                  scope='row'
                                  padding='none'
                                >
                                  <Typography
                                    sx={{ color: palette.common.black, px: 2 }}
                                    variant='subtitle2'
                                    noWrap
                                  >
                                    {dayjs(eventDate).format(
                                      'DD-MM-YYYY HH:MM'
                                    )}
                                  </Typography>
                                </TableCell>

                                <TableCell align='right'>
                                  <Stack flexDirection='row'>
                                    <IconButton
                                      size='large'
                                      color='inherit'
                                      onClick={() => {
                                        // TO UPDATE CHECK FOR ADD AND UPDATE
                                        seteditEvent(true);
                                        // EVENT DATA
                                        setselectedEventData(item);
                                        // WANT TO UPLOAD NEW IMAGE
                                        seteditEventImage(false);
                                        // SET EVENT DATA FOR UPDATION
                                        seteventImage(picture);
                                        setEventName(name);
                                        setEventDate(eventDate);
                                        setticketLink(ticketLink);
                                        // ENABLE POP-UP
                                        setEventClubPopUp(true);
                                      }}
                                    >
                                      <Iconify icon='material-symbols:edit' />
                                    </IconButton>
                                  </Stack>
                                </TableCell>
                                <TableCell align='left'>
                                  <IconButton
                                    size='large'
                                    color='inherit'
                                    onClick={() => {
                                      setselectedEventData(item);
                                      setdeleteDialogOpen(true);
                                    }}
                                  >
                                    <Iconify icon='ic:baseline-delete' />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                          );
                        })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  {isNotFound && (
                    <TableBody
                      style={{
                        backgroundColor: palette.primary.gold
                      }}
                    >
                      <TableRow>
                        <TableCell align='center' colSpan={6} sx={{ py: 3 }}>
                          <Paper
                            sx={{
                              textAlign: 'center'
                            }}
                            style={{
                              backgroundColor: palette.primary.gold
                            }}
                          >
                            <Typography variant='h6' paragraph>
                              Not found
                            </Typography>

                            <Typography variant='body2'>
                              No results found for &nbsp;
                              <strong>&quot;{filterName}&quot;</strong>.
                              <br /> Try checking for typos or using complete
                              words.
                            </Typography>
                          </Paper>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>
            <TablePagination
              style={{
                backgroundColor: palette.common.black,
                color: 'white'
              }}
              rowsPerPageOptions={[5, 10, 25]}
              component='div'
              count={clubs_data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Container>
        </Container>
        {/* {'ADD EVENT  START POP-UP'} */}

        <Popover
          open={addEventPopUp}
          anchorEl={open}
          onClose={() => {
            setEventClubPopUp(!true);
          }}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'center'
          }}
          PaperProps={{
            sx: {
              p: 1,
              width: '90%',
              hieght: '100%',
              borderColor: palette.primary.gold,
              borderWidth: 1,

              '& .MuiMenuItem-root': {
                typography: 'body2',
                // borderRadius: 1,
                alignItems: 'center',
                justifyContent: 'center',
                width: '80%',
                borderColor: palette.primary.gold,
                borderWidth: 12
              }
            }
          }}
        >
          <Scrollbar>
            <Box
              component='form'
              sx={{
                width: '100%',
                borderWidth: 2,
                backgroundColor: palette.common.black,
                borderRadius: 4
              }}
              autoComplete='on'
            >
              <Stack alignItems='flex-end' justifyItems='right'>
                <IconButton
                  size='large'
                  color='inherit'
                  onClick={() => {
                    seteventLoader(false);
                    setEventClubPopUp(!true);
                  }}
                >
                  <Iconify color={palette.primary.gold} icon='maki:cross' />
                </IconButton>
              </Stack>
              <Typography
                sx={{
                  color: palette.primary.gold,
                  textAlign: 'center',
                  paddingTop: 4,
                  paddingBottom: 4,
                  fontSize: 20,
                  fontWeight: 'bold'
                }}
              >
                {editEvent !== false ? 'Update' : 'Add'} Event
              </Typography>
              <Container sx={{ width: '100%' }}>
                {eventLoader !== true ? (
                  <>
                    <Stack flexDirection='row'>
                      <Box sx={{ width: '30%' }}>
                        <Typography sx={{ color: palette.primary.gold }}>
                          Name
                        </Typography>
                      </Box>
                      <Box sx={{ width: '70%', paddingBottom: 2 }}>
                        <TextField
                          fullWidth
                          autoComplete='off'
                          label='Event Name'
                          variant='outlined'
                          value={EventName}
                          onChange={(text) => {
                            setEventName(text.target.value);
                          }}
                          inputProps={{
                            style: { color: palette.primary.gold }
                          }}
                          InputLabelProps={{
                            style: { color: palette.primary.gold }
                          }}
                        />
                      </Box>
                    </Stack>
                    <Stack flexDirection='row'>
                      <Box sx={{ width: '30%' }}>
                        <Typography
                          fullWidth
                          sx={{ color: palette.primary.gold }}
                        >
                          Ticket Url
                        </Typography>
                      </Box>
                      <Box sx={{ width: '70%', paddingBottom: 2 }}>
                        <Box sx={{ paddingBottom: 2 }}>
                          <TextField
                            label='Ticket Link '
                            autoComplete='no-autocomplete-random-string'
                            fullWidth
                            variant='outlined'
                            value={ticketLink}
                            onChange={(text) => {
                              setticketLink(text.target.value);
                            }}
                            inputProps={{
                              style: { color: palette.primary.gold }
                            }}
                            InputLabelProps={{
                              style: { color: palette.primary.gold }
                            }}
                          />
                        </Box>
                      </Box>
                    </Stack>
                    <Stack flexDirection='row'>
                      <Box sx={{ width: '30%' }}>
                        <Typography
                          fullWidth
                          sx={{ color: palette.primary.gold }}
                        >
                          Event Date
                        </Typography>
                      </Box>
                      <Box sx={{ width: '70%', paddingBottom: 2 }}>
                        <Box sx={{ paddingBottom: 2 }}>
                          <ResponsiveDateTimePickers
                            value={EventDate}
                            onChange={(date) => {
                              setEventDate(date);
                            }}
                          />
                        </Box>
                      </Box>
                    </Stack>
                    <Stack justifyItem='center'>
                      <Box sx={{ paddingBottom: 2 }}>
                        {editEventImage !== true ? (
                          <Box
                              style={{
                                width: '100%'
                              }}
                            >
                              <Stack
                                alignItems='flex-end'
                                justifyItems='right'
                              >
                                <IconButton
                                  size='large'
                                  color='inherit'
                                  onClick={() => {
                                    seteditEventImage(true);
                                  }}
                                >
                                  <Iconify
                                    color={palette.primary.gold}
                                    icon='maki:cross'
                                  />
                                </IconButton>
                              </Stack>
                              <Box>
                                <img
                                  src={eventImage}
                                  alt={eventImage}
                                  style={{ width: '300px', height: '200px' }} // Set the desired width and height
                                />
                              </Box>
                            </Box>
                        ) : (
                          <UploadSingleImage
                              heading=''
                              filesLimit={1}
                              eventImageLoader={eventImageLoader}
                              btnDisabled
                              handleSubmit={async (Data) => {
                                if (Data) {
                                  seteventImage(Data);
                                }
                              }}
                            />
                        )}
                      </Box>
                    </Stack>
                    <Box
                      sx={{
                        width: '100%',
                        padding: 2
                      }}
                    >
                      <Button
                        onClick={() => {
                          editEvent !== false ? updateEvent() : addEvent();

                          // setEventClubPopUp(true);
                        }}
                        style={{
                          backgroundColor: palette.primary.gold,
                          textAlign: 'center',
                          fontSize: 16,
                          fontWeight: 'bold',
                          color: palette.common.black,
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: '100%'
                        }}
                      >
                        {editEvent !== false ? 'Update' : 'Add'} Event
                      </Button>
                    </Box>
                  </>
                ) : (
                  <Box
                      style={{
                        height: 500,
                        width: '100%'
                      }}
                      display='flex'
                      justifyContent='center'
                      alignItems='center'
                    >
                      <CircularProgress
                        style={{
                          justifyItems: 'center',
                          alignItems: 'center',
                          justifyContent: 'center',
                          alignSelf: 'center'
                        }}
                        color='success'
                      />
                      <Typography
                        sx={{
                          color: palette.primary.gold,
                          textAlign: 'center',
                          paddingTop: 4,
                          paddingBottom: 4,
                          fontSize: 12,
                          fontWeight: 'bold'
                        }}
                      >
                        Please wait we are{' '}
                        {editEvent != false ? 'Updating' : 'Adding'} your event
                        !
                      </Typography>
                    </Box>
                )}
              </Container>
            </Box>
          </Scrollbar>
        </Popover>
        {/* {'ADD TABLE CONFIGURATION'} */}
        <Popover
          open={addTableConfigPopup}
          anchorEl={open}
          onClose={() => {
            setaddTableConfigPopup(!true);
          }}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'center'
          }}
          PaperProps={{
            sx: {
              p: 1,
              width: '90%',
              hieght: '100%',
              borderColor: palette.primary.gold,
              borderWidth: 1,

              '& .MuiMenuItem-root': {
                typography: 'body2',
                // borderRadius: 1,
                alignItems: 'center',
                justifyContent: 'center',
                width: '80%',
                borderColor: palette.primary.gold,
                borderWidth: 12
              }
            }
          }}
        >
          <Scrollbar>
            <Box
              component='form'
              sx={{
                width: '100%',
                borderWidth: 2,
                backgroundColor: palette.common.black,
                borderRadius: 4
              }}
              autoComplete='on'
            >
              <Stack alignItems='flex-end' justifyItems='right'>
                <IconButton
                  size='large'
                  color='inherit'
                  onClick={() => {
                    setaddTableConfigPopup(!true);
                  }}
                >
                  <Iconify color={palette.primary.gold} icon='maki:cross' />
                </IconButton>
              </Stack>
              <Typography
                sx={{
                  color: palette.primary.gold,
                  textAlign: 'center',
                  paddingTop: 4,
                  paddingBottom: 4,
                  fontSize: 20,
                  fontWeight: 'bold'
                }}
              >
                {editTableConfigCheck !== false ? 'Update' : 'Add'} Table
                Configuration
              </Typography>
              <Container sx={{ width: '100%' }}>
                <Stack flexDirection='row'>
                  <Box sx={{ width: '30%' }}>
                    <Typography sx={{ color: palette.primary.gold }}>
                      Table Type
                    </Typography>
                  </Box>
                  <Box sx={{ width: '70%', paddingBottom: 2 }}>
                    <TextField
                      fullWidth
                      autoComplete='off'
                      label='configuration'
                      variant='outlined'
                      value={typeTC}
                      onChange={(text) => {
                        settypeTC(text.target.value);
                      }}
                      inputProps={{ style: { color: palette.primary.gold } }}
                      InputLabelProps={{
                        style: { color: palette.primary.gold }
                      }}
                    />
                  </Box>
                </Stack>
                <Stack flexDirection='row'>
                  <Box sx={{ width: '30%' }}>
                    <Typography fullWidth sx={{ color: palette.primary.gold }}>
                      Minimum Price
                    </Typography>
                  </Box>
                  <Box sx={{ width: '70%', paddingBottom: 2 }}>
                    <Box sx={{ paddingBottom: 2 }}>
                      <TextField
                        label='price '
                        autoComplete='no-autocomplete-random-string'
                        fullWidth
                        variant='outlined'
                        value={minPriceTC}
                        onChange={(text) => {
                          setminPriceTC(text.target.value);
                        }}
                        inputProps={{ style: { color: palette.primary.gold } }}
                        InputLabelProps={{
                          style: { color: palette.primary.gold }
                        }}
                      />
                    </Box>
                  </Box>
                </Stack>
                <Stack flexDirection='row'>
                  <Box sx={{ width: '30%' }}>
                    <Typography fullWidth sx={{ color: palette.primary.gold }}>
                      Seating Capacity
                    </Typography>
                  </Box>
                  <Box sx={{ width: '70%', paddingBottom: 2 }}>
                    <Box sx={{ paddingBottom: 2 }}>
                      <TextField
                        label='capacity'
                        autoComplete='no-autocomplete-random-string'
                        fullWidth
                        variant='outlined'
                        value={recomCapacityTC}
                        onChange={(text) => {
                          setrecomCapacityTC(text.target.value);
                        }}
                        inputProps={{ style: { color: palette.primary.gold } }}
                        InputLabelProps={{
                          style: { color: palette.primary.gold }
                        }}
                      />
                    </Box>
                  </Box>
                </Stack>
                <Stack flexDirection='row'>
                  <Box sx={{ width: '30%' }}>
                    <Typography fullWidth sx={{ color: palette.primary.gold }}>
                      Table Map ID
                    </Typography>
                  </Box>
                  <Box sx={{ width: '70%', paddingBottom: 2 }}>
                    <Box sx={{ paddingBottom: 2 }}>
                      <TextField
                        label='Map id '
                        autoComplete='no-autocomplete-random-string'
                        fullWidth
                        variant='outlined'
                        value={tmapleIDTC}
                        onChange={(text) => {
                          settmapleIDTC(text.target.value);
                        }}
                        inputProps={{ style: { color: palette.primary.gold } }}
                        InputLabelProps={{
                          style: { color: palette.primary.gold }
                        }}
                      />
                    </Box>
                  </Box>
                </Stack>

                <Box
                  sx={{
                    width: '100%',
                    padding: 2
                  }}
                >
                  <Button
                    onClick={() => {
                      // eslint-disable-next-line no-lone-blocks
                      {
                        editTableConfigCheck !== false
                          ? editUpdateTableConfigurations()
                          : addTableConfiguration();
                      }
                    }}
                    // variant="contained"
                    style={{
                      backgroundColor: palette.primary.gold,
                      textAlign: 'center',
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: palette.common.black,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%'
                    }}
                  >
                    {editTableConfigCheck !== false ? 'Update' : 'Add'}{' '}
                    Configuration
                  </Button>
                </Box>
              </Container>
            </Box>
          </Scrollbar>
        </Popover>
        {/* {'ADD TABLE  END CONFIGURATION'} */}
        {/* {'SHOW TABLE  CONFIGURATION'} */}

        <Popover
          open={showAllConfigDataPopUp}
          anchorEl={open}
          onClose={() => {
            setshowAllConfigDataPopUp(!true);
          }}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'center'
          }}
          PaperProps={{
            sx: {
              p: 1,
              width: '90%',
              hieght: '100%',
              borderColor: palette.primary.gold,
              // backgroundColor: '#E4D0B5',
              borderWidth: 1,

              '& .MuiMenuItem-root': {
                typography: 'body2',
                // borderRadius: 1,
                alignItems: 'center',
                justifyContent: 'center',
                width: '80%',
                borderColor: palette.primary.gold,
                borderWidth: 12
              }
            }
          }}
        >
          <Box
            component='form'
            sx={{
              width: '100%',
              borderWidth: 2,
              backgroundColor: palette.common.black,
              borderRadius: 4,
              height: 500
            }}
            autoComplete='on'
          >
            <Box
              component='form'
              sx={{
                width: '100%',
                borderWidth: 2,
                backgroundColor: palette.common.black,
                borderRadius: 4
              }}
              autoComplete='on'
            >
              <Stack alignItems='flex-end' justifyItems='right'>
                <IconButton
                  size='large'
                  color='inherit'
                  onClick={() => {
                    setshowAllConfigDataPopUp(false);
                  }}
                >
                  <Iconify color={palette.primary.gold} icon='maki:cross' />
                </IconButton>
              </Stack>

              <Box display='flex'>
                <Box width='50%'>
                  <Typography
                    sx={{
                      color: palette.primary.gold,
                      textAlign: 'left',
                      fontSize: 20,
                      fontWeight: 'bold',
                      paddingLeft: 2
                    }}
                  >
                    All Table Configuration
                  </Typography>
                </Box>{' '}
                <Box width='50%' style={{ padding: 12, textAlign: 'right' }}>
                  <Button
                    onClick={() => {
                      resettingTableConfigstates();
                      setaddTableConfigPopup(true);
                    }}
                    style={{
                      backgroundColor: palette.primary.gold,
                      color: palette.common.black,
                      borderRadius: 10
                    }}
                    variant='Outlined'
                    startIcon={<Iconify icon='eva:plus-fill' />}
                  >
                    Add Table Config
                  </Button>
                </Box>
              </Box>
              <Scrollbar style={{ paddingLeft: 2, paddingRight: 2 }}>
                <TableContainer>
                  <Table>
                    <UserListHead
                      headLabel={EVENTS_TABLE_CONFIG_HEAD}
                      rowCount={EventData.length}
                      numSelected={selected.length}
                    />
                    <TableBody />
                  </Table>
                </TableContainer>
              </Scrollbar>
              <Container
                style={{
                  borderWidth: 1,
                  backgroundColor: palette.primary.gold,
                  padding: 1,
                  borderRadius: 4
                }}
                alignItems
              >
                <TableContainer>
                  <Table>
                    {tableConfigData?.map((item, index) => {
                      console.log('====================================');
                      console.log('item', item);
                      console.log('====================================');
                      return (
                        <TableRow
                            style={{
                              marginTop: 20
                            }}
                            bgcolor={palette.primary.gold}
                            // hover
                          >
                            <TableCell>
                              <Typography
                                sx={{ color: palette.common.black, px: 2 }}
                                variant='subtitle2'
                                noWrap
                              >
                                {item.minPrice}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ color: palette.common.black, px: 2 }}
                                variant='subtitle2'
                                noWrap
                              >
                                {item.type}
                              </Typography>
                            </TableCell>

                            <TableCell align='left'>
                              <Typography
                                sx={{ color: palette.common.black, px: 2 }}
                                variant='subtitle2'
                                noWrap
                              >
                                {item.recommendedCapacity}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ color: palette.common.black, px: 2 }}
                                variant='subtitle2'
                                noWrap
                              >
                                {item?.tableMapId}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Stack flexDirection='row'>
                                <IconButton
                                  size='large'
                                  color='inherit'
                                  onClick={() => {
                                    updateStateforEditUpdateTableConfig(item);
                                  }}
                                >
                                  <Iconify icon='material-symbols:edit' />
                                </IconButton>
                              </Stack>
                            </TableCell>
                            <TableCell>
                              <IconButton
                                size='large'
                                color='inherit'
                                onClick={() => {
                                  deleteTableConfigurations(item);
                                }}
                              >
                                <Iconify icon='ic:baseline-delete' />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                      );
                    })}
                  </Table>
                </TableContainer>
              </Container>
            </Box>
          </Box>
        </Popover>

        <DeleteEventDialog />
        {/* LOADER MODAL */}
        <Popover
          open={loaderEnabled}
          anchorEl={open}
          onClose={() => {
            setloaderEnabled(!true);
          }}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'center'
          }}
          PaperProps={{
            sx: {
              width: '100%',
              hieght: '100%'
            }
          }}
        >
          <Grid
            container
            style={{
              height: '100vh',
              width: '100%',
              backgroundColor: palette.common.black,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <CircularProgress
              style={{
                justifyItems: 'center',
                alignItems: 'center'
              }}
              color='success'
            />
            <Typography
              sx={{
                color: palette.primary.gold,
                textAlign: 'center',
                paddingTop: 4,
                paddingBottom: 4,
                fontSize: 12,
                fontWeight: 'bold'
              }}
            >
              Please wait we are saving the data!
            </Typography>
          </Grid>
        </Popover>
      </Container>
    </>
  );
}
