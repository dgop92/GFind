import * as React from "react";
import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import SpaceBarIcon from "@mui/icons-material/SpaceBar";
import GroupsIcon from "@mui/icons-material/Groups";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/Home";

const drawerWidth = 280;

const sidebarItemsData = [
  {
    name: "Home",
    iconClass: HomeIcon,
    path: "/home",
  },
  {
    name: "Registrase",
    iconClass: HowToRegIcon,
    path: "/register",
  },
  {
    name: "Encontrar huecos",
    iconClass: SpaceBarIcon,
    path: "/find",
  },
  {
    name: "Analizar reuniones",
    iconClass: GroupsIcon,
    path: "/analyze",
  },
];

const DrawerHeader = styled("div")(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
  ".MuiTypography-root": {
    fontFamily: theme.typography.titleFontFamily,
  },
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "center",
}));

function SidebarItem({ name, path, iconClass: IconClass }) {
  return (
    <ListItem
      button
      sx={{
        color: "primary.contrastText",
        borderColor: "secondary.dark",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: (theme) => theme.spacing(1.5),
        mb: 1.2,
        // border: (theme) => `${theme.palette.secondary.main} solid 2px`,
      }}
      component="a"
      href={path}
    >
      <ListItemIcon
        sx={{
          minWidth: 45,
        }}
      >
        <IconClass sx={{ color: (theme) => theme.palette.primary.contrastText }} />
      </ListItemIcon>
      <ListItemText primary={name} />
    </ListItem>
  );
}

export default function Sidebar({ open, handleDrawerClose, drawerProps }) {
  return (
    <Drawer
      PaperProps={{
        elevation: 0,
      }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: (theme) => theme.palette.primary.dark,
        },
      }}
      anchor="left"
      open={open}
      onClose={handleDrawerClose}
      {...drawerProps}
    >
      <DrawerHeader>
        {open && (
          <IconButton color="inherit" onClick={handleDrawerClose}>
            <ChevronLeftIcon sx={{ fontSize: "2rem" }} />
          </IconButton>
        )}
        <Typography variant="h6" noWrap component="h1" sx={{ fontSize: "1.5rem" }}>
          GapFind
        </Typography>
      </DrawerHeader>
      <List component="nav" sx={{ p: 1, flexGrow: 1 }}>
        {sidebarItemsData.map((data) => (
          <SidebarItem
            key={data.name}
            name={data.name}
            path={data.path}
            iconClass={data.iconClass}
          />
        ))}
      </List>
      <Box component="footer" sx={{ p: 2, backgroundColor: "primary.main" }}>
        <Typography align="center" variant="body1" sx={{ color: "common.white" }}>
          Hecho por{" "}
          <Link
            href="https://github.com/dgop92"
            target="_blank"
            underline="hover"
            color="inherit"
            rel="noopener"
            sx={{ fontWeight: 700 }}
          >
            @dgop92
          </Link>
        </Typography>
      </Box>
    </Drawer>
  );
}
