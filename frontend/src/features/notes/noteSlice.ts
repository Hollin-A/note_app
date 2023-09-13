import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios, { AxiosResponse } from "axios";

import BASE_URL from "../../config/apiConfig";

const initialState: INoteState = {
  loading: false,
  notes: [],
  error: undefined,
};

export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  (props: { jwt: string | undefined }) => {
    const res = axios
      .get(`${BASE_URL}/notes`, {
        headers: {
          Authorization: `Bearer ${props.jwt}`,
        },
      })
      .then((data: AxiosResponse<{ notes: INote[] }>) => data.data.notes)
      .catch((err) => {
        throw err;
      });
    return res;
  }
);

export const addNote = createAsyncThunk(
  "notes/addNote",
  (props: {
    title: string;
    content: string;
    jwt: string | undefined;
    category: string;
  }) => {
    const res = axios
      .post(
        `${BASE_URL}/notes`,
        {
          title: props.title,
          content: props.content,
          category: props.category,
        },
        {
          headers: {
            Authorization: `Bearer ${props.jwt}`,
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
  (props: { _id: string; jwt: string | undefined }) => {
    const res = axios
      .delete(`${BASE_URL}/notes/${props._id}`, {
        headers: {
          Authorization: `Bearer ${props.jwt}`,
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
  (props: {
    _id: string;
    title: string;
    content: string;
    jwt: string | undefined;
  }) => {
    const { _id, title, content, jwt } = props;
    const res = axios
      .patch(
        `${BASE_URL}/notes/${_id}`,
        {
          title: title,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
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
        state.notes = [action.payload, ...state.notes];
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

        const newState: INote[] = state.notes
          .map((existingNote) =>
            existingNote._id === action.payload._id
              ? action.payload
              : existingNote
          )
          .sort((a, b) => (a.updatedDate > b.updatedDate ? -1 : 1));
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
