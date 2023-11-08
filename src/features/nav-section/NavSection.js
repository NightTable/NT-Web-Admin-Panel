import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Box, List, ListItemText } from '@mui/material';
//
import { StyledNavItem } from './styles';

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array
};

export default function NavSection({ data = [], ...other }) {
  return (
    <Box  sx={{ backgroundColor:'black'}} {...other}>
      <List  sx={{ p: 1,color:'#E4D0B5' }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object
};

const NavItem = ({ item }) => {
  const { title, path, icon, info } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      style={{
        '&.active': {
          color: '#E4D0B5',
          fontWeight: 'fontWeightBold',
          margin:8
        },
        color:'#E4D0B5',
        margin:8,
        paddingLeft:20
      }}
    >

      <ListItemText  primary={title} />

      {info && info}
    </StyledNavItem>
  );
};
