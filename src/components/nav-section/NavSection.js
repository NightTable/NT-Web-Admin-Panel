import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Box, List, ListItemText } from '@mui/material';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  return (
    <Box  sx={{ backgroundColor:'black'}} {...other}>
      <List disablePadding sx={{ p: 1,color:'#E4D0B5' }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, icon, info } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        '&.active': {
          color: '#E4D0B5',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
          margin:2,
        },
        color:'#E4D0B5',
        margin:2,
      }}
    >

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}
