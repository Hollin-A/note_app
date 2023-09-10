import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchNotes, noteSelector } from "./noteSlice";

function NotePage() {
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

  function handleFetchNotes() {
    dispatch(fetchNotes());
  }
  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {notes.map((note) => (
        <li key={note._id}>
          {note._id} | {note.title} | {note.content}
        </li>
      ))}
      <button className="btn" onClick={handleFetchNotes}>
        Fetch
      </button>
    </div>
  );
}
export default NotePage;
