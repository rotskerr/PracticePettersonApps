import React, { useState } from "react";
import axios from "axios";

const NewProject = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = () => {
    const data = { title, description, type };
    axios.post("https://practicepetersonapps.herokuapp.com/api/project/store", data)
      .then(response => {
        console.log("New project created:", response.data);
        handleClose();
      })
      .catch(error => {
        console.error("Error creating new project:", error);
      });
  };

  return (
    <div>
      <button onClick={handleOpen}>Create New Project</button>
      {isOpen && (
        <dialog open onClose={handleClose}>
          <h2>Create New Project</h2>
          <form>
            <label>
              Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <br />
            <label>
              Description:
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <br />
            <label>
              Type:
              <input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </label>
            <br />
            <button type="button" onClick={handleSubmit}>Create</button>
            <button type="button" onClick={handleClose}>Cancel</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default NewProject;
