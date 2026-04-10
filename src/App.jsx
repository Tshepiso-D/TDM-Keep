import { useEffect, useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from './assets/vite.svg'
//import heroImg from './assets/hero.png'
import Navbar from "./Components/Navbar/Navbar"
import Sidebar from "./Components/Sidebar/Sidebar";
import Form from "./Components/Form/Form";
import Notes from "./Components/Notes/Notes";
import Modal from "./Components/Modal/Modal";
import './App.css'

const NOTES = [];
const NOTE_COLORS = ["#fff475", "#ccff90", "#a7ffeb", "#cbf0f8", "#fdcfe8"];

const App = () => {
  const [notes, setNotes] = useState(NOTES);
  const [selectedNote, setSelectedNote] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeView, setActiveView] = useState("notes");
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("tdm-keep-theme");
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("tdm-keep-theme", theme);
  }, [theme]);

  const addNote = (note) => {
    setNotes((prevNotes) => {
      return [...prevNotes, note];
    });
  };
  // const addNote3 = (note) => {
  //   const demo = "test"
  //   console.log("This is a test...")
  //   setNotes((prevNotes) => {
  //     return [...prevNotes, note];
  //   });
  // };
  const editNote = (editedNote) => {
    setNotes(prevNotes => {
      const newArray = prevNotes.map(note => {
        if(editedNote.id === note.id) {
          note.title = editedNote.title
          note.text = editedNote.text
        }
        return note;
      })
      return newArray;
    })
  }
  const deleteNote = (id) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => id !== note.id);
    });
  };
  const setReminder = (id, reminder) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? { ...note, reminder } : note))
    );
  };
  const cycleNoteColor = (id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id !== id) return note;
        const currentColorIndex = NOTE_COLORS.indexOf(note.color);
        const nextColorIndex = (currentColorIndex + 1) % NOTE_COLORS.length;
        return { ...note, color: NOTE_COLORS[nextColorIndex] };
      })
    );
  };
  const toggleModal = () => {
    // open or close the modal based on previous state - setIsModalOpen
    setIsModalOpen((prevState) => {
      return !prevState;
    });
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const filteredNotes =
    activeView === "reminders"
      ? notes.filter((note) => Boolean(note.reminder))
      : notes;

  return (
    <div className={`app theme-${theme}`}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <Form addNote={addNote} />
      <Notes
        notes={filteredNotes}
        emptyMessage={activeView === "reminders" ? "No reminder notes yet." : "Notes you add appear here."}
        deleteNote={deleteNote}
        setReminder={setReminder}
        cycleNoteColor={cycleNoteColor}
        toggleModal={toggleModal}
        setSelectedNote={setSelectedNote}
      />
      {isModalOpen && (
        <Modal isModalOpen={isModalOpen} selectedNote={selectedNote} toggleModal={toggleModal} editNote={editNote}/>
      )}
    </div>
  );
};

export default App;
