import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import PropTypes from "prop-types";

import { Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";

export const MetricsSearch = ({ search, setSearch }) => (
  <Card sx={{ p: 2 }}>
    <OutlinedInput
      fullWidth
      placeholder="Search metrics"
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
      }}
      startAdornment={
        <InputAdornment position="start">
          <SvgIcon color="action" fontSize="small">
            <MagnifyingGlassIcon />
          </SvgIcon>
        </InputAdornment>
      }
      sx={{ maxWidth: 500 }}
    />
  </Card>
);
MetricsSearch.prototype = {
  search: PropTypes.object.isRequired,
  setSearch: PropTypes.func.isRequired,
};
