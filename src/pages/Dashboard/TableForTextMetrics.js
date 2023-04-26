import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Box,
} from "@mui/material";
import moment from "moment";
import React from "react";

const TableForTextMetrics = ({
  data,
  selectedShowChatMetric,
  filterStartDay,
  filterEndDay,
}) => {
  const valueArray = [];
  const sortedData = data.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  for (
    let currentDate = filterStartDay.clone();
    currentDate <= filterEndDay;
    currentDate.add(1, "days")
  ) {
    const mm = sortedData.filter(
      (d) =>
        moment(d.createdAt).format("YYYY-MM-DD") ===
        currentDate.format("YYYY-MM-DD")
    );
    valueArray.push(...mm);
  }

  function sortDataByRecentDate(data) {
    const sortedData = data.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    const groupedData = sortedData.reduce((acc, curr) => {
      const date = new Date(curr.createdAt).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(curr);
      return acc;
    }, {});

    const sortedDates = Object.keys(groupedData).sort(
      (a, b) => new Date(b) - new Date(a)
    );

    const sortedGroupedData = [];
    for (const date of sortedDates) {
      sortedGroupedData.push(groupedData[date]);
    }
    return sortedGroupedData;
  }
  const rows = sortDataByRecentDate(valueArray);

  return (
    <Box style={{ paddingBottom: "15px" }}>
      <TableContainer sx={{ maxHeight: 350 }}>
        <Table stickyHeader sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: "center", width: "20%" }}>
                No
              </TableCell>
              <TableCell sx={{ textAlign: "center", width: "20%" }}>
                Date
              </TableCell>
              <TableCell sx={{ textAlign: "center", width: "60%" }}>
                Content
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, ind) =>
              row?.map((item, index) =>
                index === 0 ? (
                  <TableRow key={item._id}>
                    <TableCell
                      rowSpan={row.length}
                      sx={{
                        padding: { xs: "4px" },
                        textAlign: "center",
                      }}
                    >
                      {ind + 1}
                    </TableCell>
                    <TableCell
                      rowSpan={row.length}
                      sx={{
                        padding: { xs: "4px" },
                        textAlign: "center",
                      }}
                    >
                      {moment(row[0]?.createdAt).format("MM-DD-YYYY")}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: { xs: "4px" },
                        textAlign: "center",
                        wordBreak: "break-all",
                      }}
                    >
                      {item.wage}
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow key={item._id}>
                    <TableCell
                      sx={{
                        padding: { xs: "4px" },
                        textAlign: "center",
                        wordBreak: "break-all",
                      }}
                    >
                      {item.wage}
                    </TableCell>
                  </TableRow>
                )
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableForTextMetrics;
