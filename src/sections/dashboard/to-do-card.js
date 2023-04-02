import PropTypes from "prop-types";

import ClockIcon from "@heroicons/react/24/solid/ClockIcon";
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";

export const ToDoCard = (props) => {
  const { sx, metric, setOpenModal, setOpenBlood, setSelectedMetric } = props;

  return (
    <Card
      sx={sx}
      style={{ outline: "solid 1px #e2e2e2", cursor: "pointer" }}
      onClick={(e) => {
        metric.fieldType === "bloodPressure"
          ? setOpenBlood(true)
          : setOpenModal(true);

        setSelectedMetric(metric);
      }}
    >
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography color="text.primary" variant="h3">
              {metric.name}
            </Typography>
            <Typography variant="h4" color="text.secondary">
              {metric.description}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "error.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <ClockIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

ToDoCard.prototypes = {
  sx: PropTypes.object,
  value: PropTypes.string.isRequired,
};
