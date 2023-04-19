import React from "react";
import { updateTaskStatusService } from "../../utils/services";
import image from "./test.png";
import { Button } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import axios from "axios";


const NewTaskList = ({ tasks, setTasks }) => {
  const token = localStorage.getItem("token");
  const [notes, setNotes] = useState([]);
  const [openTaskInfo, setopenTaskInfo] = useState(false);
  const [openAlert, setopenAlert] = useState(false);
  const [taskNote, setTaskNote] = useState(null);
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
        console.log(error);
      });
  };

  const onDragStart = (evt) => {
    let element = evt.currentTarget;
    element.classList.add("dragged");
    evt.dataTransfer.setData("text/plain", evt.currentTarget.id);
    evt.dataTransfer.effectAllowed = "move";
  };

  const onDragEnd = (evt) => {
    evt.currentTarget.classList.remove("dragged");
  };

  const onDragEnter = (evt) => {
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.add("dragged-over");
    evt.dataTransfer.dropEffect = "move";
  };

  const onDragLeave = (evt) => {
    let currentTarget = evt.currentTarget;
    let newTarget = evt.relatedTarget;
    if (newTarget.parentNode === currentTarget || newTarget === currentTarget)
      return;
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.remove("dragged-over");
  };

  const onDragOver = (evt) => {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "move";
  };
  const handleUpdateTask = (task) => {
    updateTaskStatusService(task.id, { stage: task.stage });
  };
  const onDrop = (evt, value, status) => {
    evt.preventDefault();
    evt.currentTarget.classList.remove("dragged-over");
    let data = evt.dataTransfer.getData("text/plain");
    let updated = tasks.map((task) => {
      if (task.id.toString() === data.toString()) {
        task.stage = status;
        handleUpdateTask(task);
      }
      return task;
    });
    setTasks(updated);
  };

  let pending = tasks.filter((data) => data.stage === 1);
  let done = tasks.filter((data) => data.stage === 2);
  let newOrder = tasks.filter((data) => data.stage === 0);

  const STATUS_MAP = ["New Order", "In Progress", "Done"];
  return (
    <div className="container">
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
          <p>{taskNote?.hours_spend}</p>
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
            <DialogTitle className="DialogTitle">delete task</DialogTitle>
            <DialogContent className="DialogContent">
              <h2>
                Are you sure you want to delete the task? this will lead to the
                inevitable deletion of the task
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
      <div
        className="order small-box"
        onDragLeave={(e) => onDragLeave(e)}
        onDragEnter={(e) => onDragEnter(e)}
        onDragEnd={(e) => onDragEnd(e)}
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e, false, 0)}
      >
        <section className="drag_container">
          <div className="container">
            <div className="drag_column">
              <div className="drag_row">
                <h4 className="task_card">New Orders</h4>
                {newOrder.map((task) => (
                  <div
                    className="card"
                    key={task.id}
                    id={task.id}
                    draggable
                    onDragStart={(e) => onDragStart(e)}
                    onDragEnd={(e) => onDragEnd(e)}
                  >
                    <div className="img">
                      <img src={image} alt="box" />
                    </div>
                    <div className="card_right">
                      <div className="status">{STATUS_MAP[task.stage]}</div>
                      <div className="days">{task.title}</div>
                      <Button
                        className="InfoBtn"
                        variant="text"
                        onClick={() => handleOpenTaskInfo(task)}
                      >
                        <InfoIcon color="success" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      <div
        className="pending small-box"
        onDragLeave={(e) => onDragLeave(e)}
        onDragEnter={(e) => onDragEnter(e)}
        onDragEnd={(e) => onDragEnd(e)}
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e, false, 1)}
      >
        <section className="drag_container">
          <div className="container">
            <div className="drag_column">
              <div className="drag_row">
                <h4 className="task_card">In Progress</h4>
                {pending.map((task) => (
                  <div
                    className="card"
                    key={task.id}
                    id={task.id}
                    draggable
                    onDragStart={(e) => onDragStart(e)}
                    onDragEnd={(e) => onDragEnd(e)}
                  >
                    <div className="img">
                      <img src={image} alt="box" />
                    </div>
                    <div className="card_right">
                      <div className="status">{STATUS_MAP[task.stage]}</div>
                      <div className="days">{task.title}</div>
                      <Button
                        className="InfoBtn"
                        variant="text"
                        onClick={() => handleOpenTaskInfo(task)}
                      >
                        <InfoIcon color="success" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <div
        className="done small-box"
        onDragLeave={(e) => onDragLeave(e)}
        onDragEnter={(e) => onDragEnter(e)}
        onDragEnd={(e) => onDragEnd(e)}
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e, true, 2)}
      >
        <section className="drag_container">
          <div className="container">
            <div className="drag_column">
              <div className="drag_row">
                <h4 className="task_card">Completed</h4>
                {done.map((task) => (
                  <div
                    className="card"
                    key={task.id}
                    id={task.id}
                    draggable
                    onDragStart={(e) => onDragStart(e)}
                    onDragEnd={(e) => onDragEnd(e)}
                  >
                    <div className="img">
                      <img src={image} alt="box" />
                    </div>
                    <div className="card_right">
                      <div className="status">{STATUS_MAP[task.stage]}</div>
                      <div className="days">{task.title}</div>
                      <Button
                        className="InfoBtn"
                        variant="text"
                        onClick={() => handleOpenTaskInfo(task)}
                      >
                        <InfoIcon color="success" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NewTaskList;
