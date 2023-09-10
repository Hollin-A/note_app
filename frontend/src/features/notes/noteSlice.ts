import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios, { AxiosResponse } from "axios";

import BASE_URL from "../../config/apiConfig";

const token: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFyaXlhd2Fuc2Fob2xsaW5AZ21haWwuY29tIiwiaWF0IjoxNjk0Mjg4NjM0LCJleHAiOjE2OTQzNzUwMzR9.7PtIfGl6NV9I69pj2hZfdCPKcuRHO6C6RKT83DsyjMI";

const initialState: INoteState = {
  loading: false,
  notes: [],
  error: undefined,
};

export const fetchNotes = createAsyncThunk("notes/fetchNotes", () => {
  const res = axios
    .get(`${BASE_URL}/notes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((data: AxiosResponse<{ notes: INote[] }>) => data.data.notes)
    .catch((err) => {
      throw err;
    });
  return res;
});

export const addNote = createAsyncThunk(
  "notes/addNote",
  (props: { title: string; content: string }) => {
    const res = axios
      .post(
        `${BASE_URL}/notes`,
        {
          title: props.title,
          content: props.content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((data: AxiosResponse<{ note: INote }>) => {
        return data.data.note;
      })
      .catch((err) => {
        throw err;
      });
    return res;
  }
);

export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  (props: { _id: string }) => {
    const { _id } = props;
    const res = axios
      .delete(`${BASE_URL}/notes/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data: AxiosResponse<{ note: INote }>) => {
        return data.data.note;
      })
      .catch((err) => {
        throw err;
      });
    return res;
  }
);

export const editNote = createAsyncThunk(
  "notes/editNote",
  (props: { _id: string; title: string; content: string }) => {
    const { _id, title, content } = props;
    const res = axios
      .patch(
        `${BASE_URL}/notes/${_id}`,
        {
          title: title,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((data: AxiosResponse<{ note: INote }>) => {
        return data.data.note;
      })
      .catch((err) => {
        return err;
      });
    return res;
  }
);

export const noteSlice = createSlice({
  name: "notes",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchNotes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchNotes.fulfilled,
      (state, action: PayloadAction<Array<INote>>) => {
        state.loading = false;
        state.notes = action.payload;
      }
    );
    builder.addCase(fetchNotes.rejected, (state, action) => {
      state.loading = false;
      state.notes = [];
      state.error = action.error.message;
    });
    builder.addCase(addNote.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      addNote.fulfilled,
      (state, action: PayloadAction<INote>) => {
        state.loading = false;
        state.notes = [...state.notes, action.payload];
      }
    );
    builder.addCase(addNote.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteNote.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      deleteNote.fulfilled,
      (state, action: PayloadAction<INote>) => {
        state.loading = false;
        const { _id } = action.payload;
        const OldNotes = state.notes.filter((note) => note._id !== _id);
        state.notes = OldNotes;
      }
    );
    builder.addCase(deleteNote.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(editNote.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      editNote.fulfilled,
      (state, action: PayloadAction<INote>) => {
        state.loading = false;

        const newState: INote[] = state.notes.map((existingNote) =>
          existingNote._id === action.payload._id
            ? action.payload
            : existingNote
        );
        state.notes = newState;
      }
    );
    builder.addCase(editNote.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
  reducers: {},
});

export const noteSelector = (state: RootState) => state.noteReducer;
export default noteSlice.reducer;
