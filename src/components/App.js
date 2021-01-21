import React, { useEffect, useState } from 'react';
import { IoAdd } from 'react-icons/io5';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotesList from './NotesList';
import Form from './Form';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({});
  const [inputs, setInputs] = useState({ title: '', body: '' });
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    fetch('/api/notes')
      .then((res) => res.json())
      .then((data) => setNotes(data.notes))
      .catch((error) => console.log('Error fetching notes', error));
  };
  const getNote = (id) => {
    fetch(`/api/notes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setNote(data.notes);
        setToggle(true);
      })
      .catch((error) => console.log('Note not found', error));
  };
  const addNote = (title, body) => {
    if (!title || !body) {
      toast.error('Please fill all the required input fields');
      return;
    }
    fetch('/api/notes', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        body: body,
      }),
    })
      .then((res) => {
        console.log(res.json());
        getNotes();
        setToggle(false);
        setInputs({ title: '', body: '' });
        toast.success('Note added successfully');
      })
      .catch((error) => {
        console.log('Error adding note.', error);
        toast.error('Error adding note.');
      });
  };
  const updateNote = (id, title, body) => {
    if (!title || !body) {
      toast.error('Please fill all the required input fields');
      return;
    }
    fetch(`/api/notes/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title: title,
        body: body,
      }),
    })
      .then((res) => {
        getNotes();
        setToggle(false);
        toast.success('Note updated successfully.');
      })
      .catch((error) => {
        console.log('Note not found', error);
        toast.error('Error updating note.');
      });
  };
  const deleteNote = (id) => {
    fetch(`/api/notes/${id}`, { method: 'DELETE' })
      .then((res) => {
        getNotes();
        toast.success('Note deleted successfully');
      })
      .catch((error) => {
        console.log('Note not found', error);
        toast.error('Error deleting note.');
      });
  };

  const handleAdd = () => {
    setInputs({ title: '', body: '' });
    setNote([]);
    setToggle(true);
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="header__title">Notes</h1>
        <button className="btn" onClick={handleAdd}>
          Add Note <IoAdd className="btn__icon" size="24" />
        </button>
      </header>
      <NotesList
        notes={notes}
        getNote={getNote}
        setToggle={setToggle}
        deleteNote={deleteNote}
      />
      <Form
        showModal={toggle}
        note={note}
        toggleModal={setToggle}
        addNote={addNote}
        updateNote={updateNote}
        inputs={inputs}
        setInputs={setInputs}
      />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
      />
    </div>
  );
};

export default App;
