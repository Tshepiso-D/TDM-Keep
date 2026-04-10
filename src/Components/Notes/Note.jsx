import React, { useState } from "react";

const Note = (props) => {
  const { toggleModal, note, setSelectedNote } = props;
  const [isHover, setIsHover] = useState(false);

  const noteClickHandler = () => {
    toggleModal();
    setSelectedNote(note);
  };

  const hoverOverHandler = () => {
    setIsHover(true);
  };
  const hoverOutHandler = () => {
    setIsHover(false);
  };
  const deleteHandler = (event) => {
    event.stopPropagation();
    props.deleteNote(note.id);
  };
  const reminderClickHandler = (event) => {
    event.stopPropagation();
    setSelectedNote(note);
    toggleModal();
  };
  const setReminderHandler = (event) => {
    event.stopPropagation();
    const message = "Set a reminder (example: Tomorrow 9:00 AM). Leave blank to clear.";
    const nextReminder = window.prompt(message, note.reminder || "");
    if (nextReminder === null) return;
    props.setReminder(note.id, nextReminder.trim() || null);
  };
  const cycleColorHandler = (event) => {
    event.stopPropagation();
    props.cycleNoteColor(note.id);
  };
  return (
    <div
      className="note"
      id={props.id}
      style={{ backgroundColor: note.color || undefined }}
      onClick={noteClickHandler}
      onMouseOver={hoverOverHandler}
      onMouseOut={hoverOutHandler}
    >
      {isHover && (
        <span className="material-icons check-circle">check_circle</span>
      )}
      {note.reminder && (
        <button
          type="button"
          className="reminder-chip"
          onClick={reminderClickHandler}
          title={`Reminder: ${note.reminder}`}
        >
          <span className="material-icons-outlined">notifications</span>
          <span>{note.reminder}</span>
        </button>
      )}
      <div className="title">{note.title}</div>
      <div className="text">{note.text}</div>

      <div
        className="note-footer"
        style={{ visibility: isHover ? "visible" : "hidden" }}
      >
        <div className="tooltip" onClick={setReminderHandler}>
          <span className="material-icons-outlined hover small-icon">
            add_alert
          </span>
          <span className="tooltip-text">Set reminder</span>
        </div>
        <div className="tooltip">
          <span className="material-icons-outlined hover small-icon">
            person_add
          </span>
          <span className="tooltip-text">Collaborator</span>
        </div>
        <div className="tooltip" onClick={cycleColorHandler}>
          <span className="material-icons-outlined hover small-icon">
            palette
          </span>
          <span className="tooltip-text">Change Color</span>
        </div>
        <div className="tooltip">
          <span className="material-icons-outlined hover small-icon">
            image
          </span>
          <span className="tooltip-text">Add Image</span>
        </div>
        <div className="tooltip archive" onClick={deleteHandler}>
          <span className="material-icons-outlined hover small-icon">
            archive
          </span>
          <span className="tooltip-text">Archive</span>
        </div>
        <div className="tooltip">
          <span className="material-icons-outlined hover small-icon">
            more_vert
          </span>
          <span className="tooltip-text">More</span>
        </div>
      </div>
    </div>
  );
};

export default Note;
