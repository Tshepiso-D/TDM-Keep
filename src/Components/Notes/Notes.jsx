import "./Notes.css";
import Note from "./Note";

const Notes = (props) => {
  const { notes, emptyMessage, deleteNote, setReminder, cycleNoteColor, toggleModal, setSelectedNote } = props;
  return (
    <div className="notes">
      {notes.length === 0 ? (
        <p>{emptyMessage || "Notes you add appear here."}</p>
      ) : (
        notes.map((note, index) => (
          <Note
            key={index}
            note={note}
            deleteNote={deleteNote}
            setReminder={setReminder}
            cycleNoteColor={cycleNoteColor}
            toggleModal={toggleModal}
            setSelectedNote={setSelectedNote}
          />
        ))
      )}
    </div>
  );
};

export default Notes;
