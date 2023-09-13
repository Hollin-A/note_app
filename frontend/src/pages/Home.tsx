import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchNotes, noteSelector } from "../features/notes/noteSlice";
import { userSelector } from "../features/user/userSlice";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

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
  width: "100%",
  [theme.breakpoints.up("md")]: {
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
    padding: theme.spacing(1.5, 1, 1, 0),
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
  const [notes, setNotes] = useState<Array<INote>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState<string>("");
  const [categorySelect, setCategorySelect] = useState<string>("all");

  const selectedUsers = useAppSelector(userSelector);
  const selectedNotes = useAppSelector(noteSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setJwt(selectedUsers.jwt);
  }, [selectedUsers]);

  useEffect(() => {
    setLoading(selectedNotes.loading);
    setError(selectedNotes.error);
    setNotes(selectedNotes.notes);
  }, [selectedNotes]);

  useEffect(() => {
    dispatch(fetchNotes({ jwt }));
  }, [jwt]);

  const handleCategorySelectChange = (
    event: React.MouseEvent<HTMLElement>,
    newCategorySelect: string
  ) => {
    setCategorySelect(newCategorySelect);
  };

  const categoryFilteredNotes =
    notes &&
    notes.filter((note) => {
      if (categorySelect == "all") {
        return notes;
      } else if (categorySelect == "personal") {
        return note.category.includes("personal");
      } else if (categorySelect == "work") {
        return note.category.includes("work");
      }
    });

  const searchFilteredNotes = categoryFilteredNotes.filter((note) => {
    return (
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
    );
  });

  const filtered: JSX.Element[] = searchFilteredNotes.map((note: INote) => (
    <NoteCard key={note._id} note={note} />
  ));

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "stretch",
          gap: 2,
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
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setSearch(e.target.value)}
          />
        </Search>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: { xs: "space-between", md: "right" },
            gap: 2,
          }}
        >
          <ToggleButtonGroup
            color="primary"
            value={categorySelect}
            exclusive
            onChange={handleCategorySelectChange}
          >
            <ToggleButton value="all">all</ToggleButton>
            <ToggleButton value="personal">personal</ToggleButton>
            <ToggleButton value="work">work</ToggleButton>
          </ToggleButtonGroup>
          <AddNoteModal />
        </Box>
      </Box>

      {!loading ? (
        <Box>
          <Masonry
            columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
            spacing={{ xs: 0, sm: 2 }}
          >
            {filtered}
          </Masonry>
        </Box>
      ) : (
        "loading"
      )}
    </Container>
  );
};

export default Home;
