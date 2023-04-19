import * as React from "react";
import Nav from "../Nav/Nav";
import "./style.css";
import NewTask from "../NewTask/NewTask";
import NewProject from "../NewProject/NewProject";
import ProjectSelect from "../ProjectSelect/ProjectSelect";
import { useState, useEffect } from "react";
import axios from "axios";
import { Paper, styled } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InfoIcon from "@mui/icons-material/Info";
import { getProjectInfoService } from "../../utils/services";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#353535 ",
  color: "#B8B7B7",
  borderRadius: "15px",
}));

export default function DashBoard() {
  const token = localStorage.getItem("token");

  const [projects, setProjects] = useState([]);
  const [id, setId] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [notes, setNotes] = useState([]);

  const handleProjectSelect = (projectId) => {
    setId(projectId);
  };
  const [open, setOpen] = useState(false);
  const [openSecondDialog, setOpenSecondDialog] = useState(false);
  const [openTaskInfo, setopenTaskInfo] = useState(false);
  const [openAlert, setopenAlert] = useState(false);
  const [taskNote, setTaskNote] = useState(null);

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

  const handleOpenTaskInfo = (note) => {
    setopenTaskInfo(true);
    setTaskNote(note);
  };

  const handleCloseTaskInfo = () => {
    setopenTaskInfo(false);
  };

  const handleOpenTaskAlert = () => {
    setopenAlert(true);
  };

  const handleCloseTaskAlert = () => {
    setopenAlert(false);
  };

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
        alert("plese login to have access");
        // console.log(error);
      });
  }, [id, token]);

  useEffect(() => {
    if (id) {
      getProjectInfoService(id).then((data) => {
        setSelectedProject(data);
        setNotes(data.notes);
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
        alert("error deleting project")
        console.log(error);
      });
  };

  const handleDeleteTask = (noteId) => {
    axios
      .delete(
        `https://practicepetersonapps.herokuapp.com/api/note/destroy/${noteId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
        handleCloseTaskInfo();
        handleCloseTaskAlert();
      })
      .catch((error) => {
        alert("error deleting task")
        console.log(error);
      });
  };

  return (
    <div>
      <Nav />
      <div>
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
            projectId={id}
            token={token}
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
            {notes && notes.length > 0 ? (
              <ul>
                <Dialog
                  className="Dialog"
                  open={openTaskInfo}
                  onClose={handleCloseTaskInfo}
                >
                  <DialogTitle className="DialogTitle">tasks Info</DialogTitle>
                  <DialogContent className="DialogContent">
                    <p className="NoteItem">{taskNote?.title}</p>
                    <p>{taskNote?.description}</p>
                    <p>{taskNote?.type}</p>
                  </DialogContent>
                  <DialogActions className="DialogActions">
                    <Button color="success" onClick={handleCloseTaskInfo}>
                      Cancel
                    </Button>
                    <Button
                      color="error"
                      variant="contained"
                      onClick={handleOpenTaskAlert}
                    >
                      delete
                    </Button>
                    <Dialog
                      className="Dialog"
                      open={openAlert}
                      onClose={handleCloseTaskAlert}
                    >
                      <DialogTitle className="DialogTitle">
                        delete task
                      </DialogTitle>
                      <DialogContent className="DialogContent">
                        <h2>
                          Are you sure you want to delete the task? this will
                          lead to the inevitable deletion of the task
                        </h2>
                      </DialogContent>
                      <DialogActions className="DialogActions">
                        <Button color="success" onClick={handleCloseTaskAlert}>
                          Cancel
                        </Button>
                        <Button
                          onClick={() => handleDeleteTask(taskNote.id)}
                          color="error"
                        >
                          delete
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </DialogActions>
                </Dialog>
                {notes.map((note) => (
                  <Item key={note.id} className="item">
                    <li>
                      {note.title}
                      <Button
                        className="InfoBtn"
                        variant="text"
                        onClick={() => handleOpenTaskInfo(note)}
                      >
                        <InfoIcon color="success" />
                      </Button>
                    </li>
                  </Item>
                ))}
              </ul>
            ) : (
              <p>No notes yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
