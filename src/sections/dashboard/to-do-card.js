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
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
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
          <Stack spacing={1} alignItems={"center"}>
            <Typography
              color="text.primary"
              variant="h3"
              sx={{ textAlign: "right", alignItems: "center" }}
            >
              {metric.name}
            </Typography>
            {/* <Typography
              variant="h5"
              color="text.secondary"
              sx={{
                // overflow: "hidden",
                whiteSpace: "nowrap",
                wordWrap: "break-word",
              }}
            >
              {metric.description.slice(0, 20)}
              {metric.description.length > 20 ? "..." : null}
            </Typography> */}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

ToDoCard.prototypes = {
  sx: PropTypes.object,
  value: PropTypes.string.isRequired,
};
