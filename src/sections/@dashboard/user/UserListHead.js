import PropTypes from "prop-types";
// @mui
import {
  Box,
  TableRow,
  TableCell,
  TableHead,
  TableSortLabel,
} from "@mui/material";

// ----------------------------------------------------------------------

const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: "1px",
  height: "1px",
  overflow: "hidden",
  position: "absolute",
  whiteSpace: "nowrap",
  clip: "rect(0 0 0 0)",
};

UserListHead.propTypes = {
  order: PropTypes.oneOf(["asc", "desc"]),
  orderBy: PropTypes.string,
  rowCount: PropTypes.number,
  headLabel: PropTypes.array,
  numSelected: PropTypes.number,
  onRequestSort: PropTypes.func,
  onSelectAllClick: PropTypes.func,
};

export default function UserListHead({
  order,
  orderBy,
  rowCount,
  headLabel,
  numSelected,
  onRequestSort,
  onSelectAllClick,
}) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead >
      <TableRow >
        {headLabel.map((headCell) => (
           <TableCell
           sx={{
             bgcolor: 'black',
             color:'#E4D0B5',borderColor:'red'
           }}
             key={headCell.id}
             align={headCell.alignRight ? "right" : "left"}
             //  sortDirection={orderBy === headCell.id ? order : false}
           >
            <TableSortLabel>{headCell.label}</TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
