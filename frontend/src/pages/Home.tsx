import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import Masonry from "@mui/lab/Masonry";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

import BASE_URL from "../config/apiConfig";

import NoteCard from "../components/NoteCard";
import AddNoteModal from "../modals/AddNoteModal";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.80),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.90),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
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
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));

const token: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFyaXlhd2Fuc2Fob2xsaW5AZ21haWwuY29tIiwiaWF0IjoxNjk0MTkyNTY4LCJleHAiOjE2OTQyNzg5Njh9._tpvbzjVGxZP5JuiQeMFP139ZaaagIsVdQ8i84isDhM";

type Note = {
  _id: string;
  title: string;
  content: string;
  createDate: string;
  updatedDate: string;
};

const Home = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const getNotes = async () => {
      const axiosConfig = {
        method: "get",
        url: `${BASE_URL}/notes`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios(axiosConfig)
        .then((response: AxiosResponse<{ notes: Note[] }>) => {
          setNotes(response.data.notes);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          // setLoading(false);
        });
    };

    getNotes();
  }, []);

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginY: "20px",
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
      <Masonry columns={4} spacing={2}>
        {notes &&
          notes.map((note: Note) => <NoteCard key={note._id} note={note} />)}
      </Masonry>
    </Container>
  );
};

export default Home;