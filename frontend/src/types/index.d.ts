interface INote {
  _id: string;
  title: string;
  content: string;
  createdBy: string;
  createDate: string;
  updatedDate: string;
}

interface INoteState {
  loading: boolean;
  notes: Array<INote>;
  error: string | undefined;
}

interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
}

interface IUserState {
  loggedIn: boolean;
  username: string | undefined;
  jwt: string | undefined;
  error: string | undefined;
}
