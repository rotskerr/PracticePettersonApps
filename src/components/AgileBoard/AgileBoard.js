import React from "react";
import Nav from "../Nav/Nav";
import NewTask from "../NewTask/NewTask";
import NewProject from "../NewProject/NewProject";
import ProjectSelect from "../ProjectSelect/ProjectSelect";
import "./styles.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { getProjectInfoService } from "../../utils/services";
import NewTaskList from "./NewTaskList";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InfoIcon from "@mui/icons-material/Info";

const AgileBoard = () => {
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const [openSecondDialog, setOpenSecondDialog] = useState(false);
  const [projects, setProjects] = useState([]);
  const [id, setId] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [notes, setNotes] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenSecondDialog = () => {
    setOpenSecondDialog(true);
  };

  const handleCloseSecondDialog = () => {
    setOpenSecondDialog(false);
  };
  const handleProjectSelect = (projectId) => {
    setId(projectId);
  };
  console.log(notes);

  useEffect(() => {
    axios
      .get("https://practicepetersonapps.herokuapp.com/api/project/index", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        alert("plese login to have access .");
        // console.log(error);
      });
  }, [id, token]);

  useEffect(() => {
    if (id) {
      getProjectInfoService(id)
        .then((data) => {
          setSelectedProject(data);
          setNotes(data.notes);
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id, token]);

  const handleDeleteProject = () => {
    axios
      .delete(
        `https://practicepetersonapps.herokuapp.com/api/project/destroy/${selectedProject.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        handleClose();
        setId(null);
        setSelectedProject(null);
        setNotes([]);
        setId(null);
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project.id !== selectedProject.id)
        );
      })
      .catch((error) => {
        alert("eroor in deleting project")
        console.log(error);
      });
  };

  return (
    <div>
      <div>
        <Nav />
        <div className="ControlPanel">
          <ProjectSelect
            projectList={projects}
            onSelect={handleProjectSelect}
          />
          <NewProject
            onCreate={(project) => {
              setProjects((prev) => {
                return [...prev, project];
              });
            }}
          />
          <NewTask
            projects={projects}
            onCreate={(newNotes) =>
              setNotes((prevNotes) => [...prevNotes, newNotes])
            }
          />
        </div>
        {selectedProject && (
          <div>
            <Button className="InfoBtn" onClick={handleClickOpen}>
              <InfoIcon color="success" />
            </Button>
            <Dialog className="Dialog" open={open} onClose={handleClose}>
              <DialogTitle className="DialogTitle"> Project Info</DialogTitle>
              <DialogContent className="DialogContent">
                <p>{selectedProject.title}</p>
                <p>{selectedProject.description}</p>
                <Dialog
                  className="Dialog"
                  open={openSecondDialog}
                  onClose={handleCloseSecondDialog}
                >
                  <DialogTitle className="DialogTitle">
                    delete project
                  </DialogTitle>
                  <DialogContent className="DialogContent">
                    <h2>
                      Are you sure you want to delete the project? this will
                      lead to the inevitable deletion of the project and all
                      tasks attached to it
                    </h2>
                  </DialogContent>
                  <DialogActions className="DialogActions">
                    <Button color="success" onClick={handleCloseSecondDialog}>
                      Cancel
                    </Button>
                    <Button
                      color="error"
                      variant="contained"
                      onClick={handleDeleteProject}
                    >
                      delete
                    </Button>
                  </DialogActions>
                </Dialog>
              </DialogContent>
              <DialogActions className="DialogActions">
                <Button onClick={handleClose} color="success">
                  Cancel
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  onClick={handleOpenSecondDialog}
                >
                  delete
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}
      </div>
      <NewTaskList tasks={notes} setTasks={setNotes} />
    </div>
  );
};

export default AgileBoard;
