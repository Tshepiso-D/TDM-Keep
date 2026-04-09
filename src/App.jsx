import { useState } from 'react'
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

const App = () => {
  const [notes, setNotes] = useState(NOTES);
  const [selectedNote, setSelectedNote] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addNote = (note) => {
    setNotes((prevNotes) => {
      return [...prevNotes, note];
    });
  };
  const addNote3 = (note) => {
    const demo = "test"
    console.log("This is a test...")
    setNotes((prevNotes) => {
      return [...prevNotes, note];
    });
  };
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
  const toggleModal = () => {
    // open or close the modal based on previous state - setIsModalOpen
    setIsModalOpen((prevState) => {
      return !prevState;
    });
  };

  return (
    <div>
      <Navbar />
      <Sidebar />
      <Form addNote={addNote} />
      <Notes
        notes={notes}
        deleteNote={deleteNote}
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
