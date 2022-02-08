import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { getSSIndiceOfCurrentDate } from "../algorithms";
import { FreeUserCard } from "../FreeUserCard";
import { loadRegUsers } from "../regUsers";

export default function FreeUserCardContainer() {
  const freeData = useSelector((state) => state.free);
  const [regUsers, setRegUsers] = useState([]);

  useEffect(() => {
    console.log(freeData);
    const indicieData = getSSIndiceOfCurrentDate();
    setRegUsers(
      loadRegUsers(
        indicieData,
        freeData.filterOptions.searchQuery,
        freeData.filterOptions.onlyFreeUsers
      )
    );
  }, [freeData]);

  console.log(regUsers);

  if (typeof regUsers === "string") {
    return (
      <Typography
        component="h6"
        variant="h6"
        align="center"
        sx={{
          fontFamily: (theme) => theme.typography.titleFontFamily,
          fontWeight: 700,
          alignSelf: "center",
          mt: 2,
          p: 1,
        }}
      >
        {regUsers}
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(auto-fill, minmax(250px, 1fr))",
          md: "repeat(auto-fill, minmax(350px, 1fr))",
        },
        mx: { xs: 0, sm: 2, md: 4 },
        my: 2,
      }}
      component="section"
    >
      {regUsers.map((data) => (
        <FreeUserCard cardRegUser={data} key={data.username} />
      ))}
    </Box>
  );
}
