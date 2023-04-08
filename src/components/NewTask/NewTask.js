import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DialogActions from "@mui/material/DialogActions";
import "./NewTask.css";

const StyledTextField = styled(TextField)({
  "& .MuiInputLabel-root": {
    color: "#b8b7b7",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#b8b7b7",
      color: "#b8b7b7",
    },
  },
});

function NewTask() {
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
      <button className="NewTaskBtn" onClick={handleOpen}>
        Create New Task
      </button>
      <Dialog className="Dialog" open={isOpen} onClose={handleClose}>
        <DialogTitle className="Dialog">Create New Task</DialogTitle>
        <DialogContent className="DialogContent">
          <form onSubmit={handleSubmit}>
            {" "}
            <StyledTextField
              InputProps={{ style: { color: "#B8B7B7" } }}
              margin="dense"
              id="title"
              label="Title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
            />
            <StyledTextField
              InputProps={{ style: { color: "#B8B7B7" } }}
              margin="dense"
              id="description"
              label="Description"
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              multiline
            />
            <StyledTextField
              InputProps={{ style: { color: "#B8B7B7" } }}
              margin="dense"
              id="type"
              label="Type"
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              fullWidth
            />
            <StyledTextField
              InputProps={{ style: { color: "#B8B7B7" } }}
              margin="dense"
              id="hours_spend"
              label="Hours Spend"
              type="number"
              name="hours_spend"
              value={formData.hours_spend}
              onChange={handleChange}
              fullWidth
            />
            <StyledTextField
              InputProps={{ style: { color: "#B8B7B7" } }}
              margin="dense"
              id="project_id"
              label="Project ID"
              type="number"
              name="project_id"
              value={formData.project_id}
              onChange={handleChange}
              fullWidth
            />
            <StyledTextField
              InputProps={{ style: { color: "#B8B7B7" } }}
              margin="dense"
              id="user_id"
              label="User ID"
              type="number"
              name="user_id"
              value={formData.user_id}
              onChange={handleChange}
              fullWidth
            />
            <DialogActions className="DialogActions">
              <Button
                onClick={handleClose}
                sx={{ backgroundColor: "#333233", color: "#b8b7b7" }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                sx={{ backgroundColor: "#333233", color: "#b8b7b7" }}
              >
                Create
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default NewTask;
