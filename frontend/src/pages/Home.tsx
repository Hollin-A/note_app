import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchNotes, noteSelector } from "../features/notes/noteSlice";
import { userSelector } from "../features/user/userSlice";

import Masonry from "@mui/lab/Masonry";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import NoteCard from "../components/NoteCard";
import AddNoteModal from "../modals/AddNoteModal";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.8),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.9),
  },
  marginLeft: 0,
  // width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("xs")]: {
      width: "10ch",
      "&:focus": {
        width: "15ch",
      },
    },
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));

const Home = () => {
  const [jwt, setJwt] = useState<string | undefined>(undefined);
  const selectedUsers = useAppSelector(userSelector);

  useEffect(() => {
    setJwt(selectedUsers.jwt);
  }, [selectedUsers]);

  const [notes, setNotes] = useState<Array<INote>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const selectedNotes = useAppSelector(noteSelector);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setLoading(selectedNotes.loading);
    setError(selectedNotes.error);
    setNotes(selectedNotes.notes);
  }, [selectedNotes]);

  useEffect(() => {
    dispatch(fetchNotes({ jwt }));
  }, [jwt]);

  function handleFetchNotes() {
    dispatch(fetchNotes({ jwt }));
  }
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingY: "20px",
        }}
      >
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <AddNoteModal />
      </Box>

      {!loading ? (
        <Box>
          <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
            {notes &&
              notes.map((note: INote) => (
                <NoteCard key={note._id} note={note} />
              ))}
          </Masonry>
        </Box>
      ) : (
        "loading"
      )}
    </Container>
  );
};

export default Home;
