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

function NewTask(props) {
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

  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");

  useEffect(() => {
    axios
      .get("https://practicepetersonapps.herokuapp.com/api/project/index")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSelectChange = (event) => {
    setSelectedProject(event.target.value);
  };

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    axios
      .get("https://practicepetersonapps.herokuapp.com/api/user/index")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleUserSelectChange = (event) => {
    setSelectedUser(event.target.value);
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
            <FormControl fullWidth margin="normal">
              <InputLabel id="user-select-label">User</InputLabel>
              <Select
                labelId="user-select-label"
                id="user-select"
                value={selectedUser}
                onChange={handleUserSelectChange}
              >
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name}
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
