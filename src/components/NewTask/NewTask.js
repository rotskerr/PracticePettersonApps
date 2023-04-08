import React, { useState } from "react";
import axios from "axios";

function Form() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const [formData, setFormData] = useState({
    description: "",
    title: "",
    type: "",
    stage: 0,
    hours_spend: 0,
    project_id: 0,
    user_id: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "https://practicepetersonapps.herokuapp.com/api/note/store",
        formData
      )
      .then((response) => {
        console.log(response);
        // Do something with the response data, if needed
      })
      .catch((error) => {
        console.error(error);
        // Handle the error, if needed
      });
  };

  return (
    <div>
      <button onClick={handleOpen}>Create New Task</button>
      {isOpen && (
        <dialog open onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="type">Type:</label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="hours_spend">Hours Spend:</label>
          <input
            type="number"
            id="hours_spend"
            name="hours_spend"
            value={formData.hours_spend}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="project_id">Project ID:</label>
          <input
            type="number"
            id="project_id"
            name="project_id"
            value={formData.project_id}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="user_id">User ID:</label>
          <input
            type="number"
            id="user_id"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
          />
        </div>
        <button type="submit" onClick={handleSubmit}>Create</button>
        <button type="button" onClick={handleClose}>Cancel</button>
      </form>
      </dialog>
      )}
    </div>
  );
}

export default Form;
