import React, { useEffect } from 'react';
import { FaArrowCircleLeft } from 'react-icons/fa';

const Form = ({
  showModal,
  toggleModal,
  note,
  addNote,
  updateNote,
  inputs,
  setInputs,
}) => {
  useEffect(() => {
    if (note) {
      setInputs({ title: note.title, body: note.body });
    }
  }, [note, setInputs]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { title, body } = inputs;
    if (!note.id) {
      addNote(title, body);
      return;
    }
    updateNote(note.id, title, body);
  };

  const handleChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <div className={`modal ${showModal ? 'showModal' : 'hideModal'}`}>
      <div className="go-back-container">
        <button className="go-back" onClick={() => toggleModal(false)}>
          <FaArrowCircleLeft
            size={32}
            color="#41331c"
            onClick={() => toggleModal(false)}
          />
          <span>Go Back</span>
        </button>
      </div>
      <form className="modal-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="modal-form-input"
          value={inputs.title}
          onChange={handleChange}
          placeholder="Title"
          name="title"
          required
        />
        <textarea
          rows="5"
          className="modal-form-input"
          value={inputs.body}
          placeholder="Start typing ...."
          onChange={handleChange}
          name="body"
          required
        />
        <button type="submit" className="btn" onClick={handleSubmit}>
          {note.id ? 'Update Note' : 'Add Note'}
        </button>
      </form>
    </div>
  );
};

export default Form;
