import React from 'react';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';

const NotesItem = ({ note, getNote, deleteNote }) => {
  return (
    <div className="notes-item" onClick={() => getNote(note.id)}>
      <h2 className="notes-item__title">{note.title}</h2>
      <p>{note.body}</p>

      <div className="toolbox">
        <button className="toolbox__btn" onClick={() => getNote(note.id)}>
          <FaRegEdit color="#e8eaed" size={18} />
        </button>
        <button className="toolbox__btn" onClick={() => deleteNote(note.id)}>
          <FaRegTrashAlt color="#e8eaed" size={18} />
        </button>
      </div>
    </div>
  );
};

export default NotesItem;
