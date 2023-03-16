import PropTypes from "prop-types";
import {
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "../../components/scrollbar";
import { SeverityPill } from "../../components/severity-pill";

const statusMap = {
  active: "success",
  inactive: "warning",
  fixed: "error",
};

export const MetricsTable = (props) => {
  const {
    metrics,
    onDeselectAll,
    onDeselectOne,
    onSelectAll,
    onSelectOne,
    selected = [],
  } = props;

  console.log("@@#$@", metrics);

  const selectedSome = selected.length > 0 && selected.length < metrics.length;
  const selectedAll = metrics.length > 0 && selected.length === metrics.length;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Chart Type</TableCell>
                <TableCell>Timing</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {metrics.map((metric) => {
                const isSelected = selected.includes(metric._id);

                return (
                  <TableRow hover key={metric._id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(metric._id);
                          } else {
                            onDeselectOne?.(metric._id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2">
                          {metric.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{metric.description}</TableCell>
                    <TableCell>{metric.chartType}</TableCell>
                    <TableCell>{metric.timing}</TableCell>
                    <TableCell>
                      <SeverityPill color={statusMap[metric.status]}>
                        {metric.status}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
    </Card>
  );
};

MetricsTable.propTypes = {
  metrics: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  selected: PropTypes.array,
};
