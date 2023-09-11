import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { userSelector } from "../features/user/userSlice";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Fade from "@mui/material/Fade";

interface Props {
  children: React.ReactElement;
}

function ScrollTop(props: Props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

const Navbar = (props: Props) => {
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const userDetails = useAppSelector(userSelector);

  useEffect(() => {
    setLoggedIn(userDetails.loggedIn);
    setUsername(userDetails.username);
  }, [userDetails]);

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar id="back-to-top-anchor" disableGutters>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            NOTE APP
          </Typography>

          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                display: { xs: "none", sm: "block" },
                mr: 2,
                fontWeight: 500,
              }}
            >
              {username && username}
            </Typography>
            {loggedIn ? (
              <Button
                sx={{
                  my: 2,
                  ml: 2,
                  color: "white",
                  display: "block",
                  border: "1px solid white",
                  px: 2,
                }}
              >
                log out
              </Button>
            ) : (
              <Button
                sx={{
                  my: 2,
                  ml: 2,
                  color: "white",
                  display: "block",
                  border: "1px solid white",
                  px: 2,
                }}
              >
                sign in
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </AppBar>
  );
};

export default Navbar;
