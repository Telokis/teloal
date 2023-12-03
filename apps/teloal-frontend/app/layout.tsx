import CssBaseline from "@mui/material/CssBaseline";
import EmotionRootStyleRegistry from "./emotion-root-style-registry";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import StarIcon from "@mui/icons-material/Star";
import SupportIcon from "@mui/icons-material/Support";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const DRAWER_WIDTH = 240;

const LINKS = [
  { text: "Home", href: "/", icon: HomeIcon },
  { text: "Starred", href: "/starred", icon: StarIcon },
];

const PLACEHOLDER_LINKS = [{ text: "Support", icon: SupportIcon }];

export const metadata = {
  title: "Teloal",
  description: "Tools for Adventure Land",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <EmotionRootStyleRegistry>
          <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            <AppBar position="fixed" sx={{ zIndex: 2000 }}>
              <Toolbar sx={{ backgroundColor: "background.paper" }}>
                {/* <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton> */}
                <Typography variant="h6" color="primary">
                  TeloAL
                </Typography>
              </Toolbar>
            </AppBar>
            <Drawer
              sx={{
                width: DRAWER_WIDTH,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                  width: DRAWER_WIDTH,
                  boxSizing: "border-box",
                  top: ["48px", "56px", "64px"],
                  height: "auto",
                  bottom: 0,
                },
              }}
              variant="permanent"
              anchor="left"
            >
              <Divider />
              <List>
                {LINKS.map(({ text, href, icon: Icon }) => (
                  <ListItem key={href} disablePadding>
                    <ListItemButton component={Link} href={href}>
                      <ListItemIcon>
                        <Icon />
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ mt: "auto" }} />
              <List>
                {PLACEHOLDER_LINKS.map(({ text, icon: Icon }) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon />
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Drawer>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                bgcolor: "background.default",
                ml: `${DRAWER_WIDTH}px`,
                mt: ["48px", "56px", "64px"],
                p: 3,
              }}
            >
              {children}
            </Box>
          </ThemeProvider>
        </EmotionRootStyleRegistry>
      </body>
    </html>
  );
}
