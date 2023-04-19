import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import DialogActions from "@mui/material/DialogActions";
import "./NewTask.css";

const token = localStorage.getItem("token");

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

const NewTask = ({ onCreate, projects }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  const defaultValues = {
    description: "",
    title: "",
    type: "",
    hours_spend: 0,
    project_id: null,
  };
  const [formData, setFormData] = useState({
    ...defaultValues,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "https://practicepetersonapps.herokuapp.com/api/note/store",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setSelectedProject(response.data);
        onCreate(response.data);
        console.log(response);
      })
      .catch((error) => {
        alert("there is some error");
        console.error(error);
      });
  };

  const [selectedProject, setSelectedProject] = useState("");

  const handleSelectChange = (event) => {
    setSelectedProject(event.target.value);
    setFormData({ ...formData, project_id: event.target.value });
  };
  console.log(projects);

  useEffect(() => {
    if (!isOpen) setFormData(defaultValues);
  }, [isOpen]);
  return (
    <div>
      <button className="NewTaskBtn" onClick={handleOpen}>
        Create New Task
      </button>
      <Dialog className="Dialog" open={isOpen} onClose={handleClose}>
        <DialogTitle className="Dialog">Create New Task</DialogTitle>
        <DialogContent className="DialogContent">
          <form onSubmit={handleSubmit}>
            {""}
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
            <FormControl fullWidth margin="normal">
              <InputLabel sx={{ color: "#b8b7b7" }}>Projects</InputLabel>
              <Select
                sx={{ color: "#b8b7b7", borderColor: "#b8b7b7" }}
                value={selectedProject}
                onChange={handleSelectChange}
              >
                {projects.map((project) => (
                  <MenuItem key={project.id} value={project.id}>
                    {project.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
                onClick={handleClose}
              >
                Create
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewTask;
