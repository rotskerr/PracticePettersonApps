import React, { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import "./NewProject.css";

const StyledTextField = styled(TextField)({
  "& .MuiInputLabel-root": {
    color: "#b8b7b7",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      color: "#b8b7b7",
      borderColor: "#b8b7b7",
    },
  },
});

const NewProject = ({ onCreate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const token = localStorage.getItem("token");

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setType("");
    setIsOpen(false);
  };

  const handleSubmit = () => {
    const data = { title, description, type };
    axios
      .post(
        "https://practicepetersonapps.herokuapp.com/api/project/store",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("New project created:", response.data);
        onCreate(response.data);
        setTitle("");
        setDescription("");
        setType("");
        handleClose();
      })
      .catch((error) => {
        console.error("Error creating new project:", error);
      });
  };

  return (
    <div>
      <button className="NewProjectBtn" onClick={handleOpen}>
        Create New Project
      </button>
      <Dialog className="Dialog" open={isOpen} onClose={handleClose}>
        <DialogTitle className="Dialog">Create New Project</DialogTitle>
        <DialogContent className="DialogContent">
          <StyledTextField
            InputProps={{ style: { color: "#B8B7B7" } }}
            autoFocus
            margin="normal"
            label="Title"
            type="text"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <StyledTextField
            InputProps={{ style: { color: "#B8B7B7" } }}
            margin="normal"
            label="Description"
            type="text"
            fullWidth
            multiline
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <StyledTextField
            InputProps={{ style: { color: "#B8B7B7" } }}
            margin="normal"
            label="Type"
            type="text"
            fullWidth
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </DialogContent>
        <DialogActions className="DialogActions">
          <Button
            sx={{ backgroundColor: "#333233", color: "#b8b7b7" }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            sx={{ backgroundColor: "#333233", color: "#b8b7b7" }}
            onClick={handleSubmit}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewProject;
