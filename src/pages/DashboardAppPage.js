import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

// @mui
import { useTheme } from '@mui/material/styles';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';
// ----------------------------------------------------------------------
import { ClubsData } from 'src/_mock/club';

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'Address', label: 'Address', alignRight: false },
  { id: 'Website', label: 'Website', alignRight: false },

  { id: 'Region', label: 'Region', alignRight: false },

  { id: '' },
  { id: '' },
];
export default function DashboardAppPage() {
  const theme = useTheme();

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  //add club pop-over open
  const [popOverOpen, setpopOverOpen] = useState(false);

  // const handleOpenMenu = (event) => {
  //   setOpen(event.currentTarget);
  // };

  // const handleCloseMenu = () => {
  //   setOpen(null);
  // };

  // const handleRequestSort = (event, property) => {
  //   const isAsc = orderBy === property && order === 'asc';
  //   setOrder(isAsc ? 'desc' : 'asc');
  //   setOrderBy(property);
  // };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = USERLIST.map((n) => n.name);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
  //   }
  //   setSelected(newSelected);
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ClubsData.length) : 0;

  function applySortFilter(array, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      // const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query) {
      return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
  }

  const filteredData = applySortFilter(ClubsData, filterName);
  const isNotFound = !!filterName;

  return (
    <>
      <Helmet>
        <title> Night Table : Admin Dashboard </title>
      </Helmet>

      <Container sx={{ bgcolor: 'black', width: '100%', height: '100%', borderTopColor: 'red' }} maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5, color: '#E4D0B5' }}>
          Hi, Welcome back
        </Typography>
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" sx={{ color: '#E4D0B5' }}>
              Clubs
            </Typography>
            <Button
              onClick={() => {
                setpopOverOpen(true);
              }}
              variant="contained"
              sx={{ backgroundColor: '#E4D0B5', color: 'black' }}
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Add CLub
            </Button>
          </Stack>

          <Card>
            <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800, backgroundColor: 'black', borderWidth: 1, borderColor: 'white' }}>
                <Table>
                  <UserListHead headLabel={TABLE_HEAD} rowCount={ClubsData.length} numSelected={selected.length} />
                  <TableBody>
                    {ClubsData.map((item) => {
                      const { id, name, Address, Website, Region } = item;
                      return (
                        <>
                          <TableRow
                            style={{
                              margin: 20,
                            }}
                            bgcolor={'#E4D0B5'}
                            // hover
                            key={id}
                            tabIndex={-1}
                          >
                            <TableCell bgcolor={'#E4D0B5'} component="th" scope="row" padding="none">
                              <Typography sx={{ color: 'black', px: 2 }} variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </TableCell>

                            <TableCell align="left">
                              <Typography sx={{ color: 'black' }}>{Address}</Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography sx={{ color: 'black' }}>{Website}</Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography sx={{ color: 'black' }}>{Region}</Typography>
                            </TableCell>

                            <TableCell align="right">
                              <IconButton
                                size="large"
                                color="inherit"
                                //onClick={handleOpenMenu}
                              >
                                <Iconify icon={'eva:more-vertical-fill'} />
                              </IconButton>
                              <IconButton
                                size="large"
                                color="inherit"
                                //onClick={handleOpenMenu}
                              >
                                <Iconify icon={'eva:more-vertical-fill'} />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        </>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>

                  {isNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <Paper
                            sx={{
                              textAlign: 'center',
                            }}
                          >
                            <Typography variant="h6" paragraph>
                              Not found
                            </Typography>

                            <Typography variant="body2">
                              No results found for &nbsp;
                              <strong>&quot;{filterName}&quot;</strong>.
                              <br /> Try checking for typos or using complete words.
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
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={ClubsData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Container>
        <Popover
          open={popOverOpen}
          anchorEl={open}
          onClose={() => {
            setpopOverOpen(!true);
          }}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          PaperProps={{
            sx: {
              p: 1,
              width: '80%',
              hieght: '100%',
              borderColor: '#E4D0B5',
              backgroundColor: '#E4D0B5',
              borderWidth: 1,

              '& .MuiMenuItem-root': {
                typography: 'body2',
                // borderRadius: 1,
                alignItems: 'center',
                justifyContent: 'center',
                width: '80%',
                borderColor: '#E4D0B5',
                borderWidth: 12,
              },
            },
          }}
        >
          <Box
            component="form"
            sx={{ width: '100%', borderWidth: 4, backgroundColor: 'black', borderRadius: 2 }}
            autoComplete="on"
          >
            <Stack alignItems={'flex-end'} justifyItems={'right'}>

              <IconButton
                size="large"
                color="inherit"
                onClick={() => {
                  setpopOverOpen(!true);
                }}
              >
                <Iconify color={'white'} icon={'maki:cross'} />
              </IconButton>
            </Stack>
            <Typography sx={{ color: 'white', textAlign: 'center', paddingTop: 6, paddingBottom: 6 }}>
              Add New Club
            </Typography>
            <Stack flexDirection={'row'}>
              <Box sx={{ width: '30%' }}>
                <Typography sx={{ color: 'white' }}>Club Name</Typography>
              </Box>
              <Box sx={{ width: '70%' }}>
                <TextField sx={{ width: '100%' }} id="outlined-basic" label="Club Name" variant="outlined" />
              </Box>
            </Stack>
            <Stack flexDirection={'row'}>
              <Box sx={{ width: '30%' }}>
                <Typography sx={{ color: 'white' }}>Country</Typography>
              </Box>
              <Box sx={{ width: '70%' }}>
                <TextField sx={{ width: '100%' }} id="outlined-basic" label="Club Name" variant="outlined" />
              </Box>
            </Stack>
            <Stack flexDirection={'row'}>
              <Box sx={{ width: '30%' }}>
                <Typography sx={{ color: 'white' }}>Address</Typography>
              </Box>
              <Box sx={{ width: '70%' }}>
                <TextField sx={{ width: '100%' }} id="outlined-basic" label="Club Name" variant="outlined" />
              </Box>
            </Stack>
            <Stack flexDirection={'row'}>
              <Box sx={{ width: '30%' }}>
                <Typography sx={{ color: 'white' }}>Club Name</Typography>
              </Box>
              <Box sx={{ width: '70%' }}>
                <TextField sx={{ width: '100%' }} id="outlined-basic" label="Club Name" variant="outlined" />
              </Box>
            </Stack>
            <Button
              onClick={() => {
                setpopOverOpen(true);
              }}
              variant="contained"
              sx={{ backgroundColor: '#E4D0B5', color: 'black' }}
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Add CLub
            </Button>
          </Box>
        </Popover>
      </Container>
    </>
  );
}

{
  /* <Scrollbar>
<TableContainer sx={{ minWidth: 800, backgroundColor: 'black', borderWidth: 1, borderColor: 'white' }}>
  <Table>
    <UserListHead headLabel={TABLE_HEAD} rowCount={clubsData.length} numSelected={selected.length} />
    <TableBody>
      {ClubsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
        const { id, name, Address, Website, Region } = row;
        // const selectedUser = selected.indexOf(name) !== -1;

        return (
          <TableRow bgcolor={'black'} hover key={id} tabIndex={-1} selected={selectedUser}>
            <TableCell bgcolor={'black'} component="th" scope="row" padding="none">
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography sx={{ color: 'white' }} variant="subtitle2" noWrap>
                  {name}
                </Typography>
              </Stack>
            </TableCell>

            <TableCell align="left">
              <Typography sx={{ color: 'white' }}>{Address}</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography sx={{ color: 'white' }}>{Website}</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography sx={{ color: 'white' }}>{Region}</Typography>
            </TableCell>

            <TableCell align="right">
              <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                <Iconify icon={'eva:more-vertical-fill'} />
              </IconButton>
              <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                <Iconify icon={'eva:more-vertical-fill'} />
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
      <TableBody>
        <TableRow>
          <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
            <Paper
              sx={{
                textAlign: 'center',
              }}
            >
              <Typography variant="h6" paragraph>
                Not found
              </Typography>

              <Typography variant="body2">
                No results found for &nbsp;
                <strong>&quot;{filterName}&quot;</strong>.
                <br /> Try checking for typos or using complete words.
              </Typography>
            </Paper>
          </TableCell>
        </TableRow>
      </TableBody>
    )}
  </Table>
</TableContainer>
</Scrollbar> */
}
