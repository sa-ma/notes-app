import React from 'react';
import NotesItem from './NotesItem';

const NotesList = ({ notes, getNote, setToggle, deleteNote }) => {
  return (
    <div className="notes-container">
      {notes &&
        notes.map((note) => (
          <NotesItem
            key={note.id}
            note={note}
            getNote={getNote}
            toggleModal={setToggle}
            deleteNote={deleteNote}
          />
        ))}
    </div>
  );
};

export default NotesList;
