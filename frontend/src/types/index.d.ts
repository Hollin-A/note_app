interface INote {
  _id: string;
  title: string;
  content: string;
  createDate: string;
  updatedDate: string;
}

interface INoteState {
  loading: boolean;
  notes: Array<INote>;
  error: string | undefined;
}

type NoteAction = {
  type: string;
  note: INote;
};

type DispatchType = (args: NoteAction) => NoteAction;
