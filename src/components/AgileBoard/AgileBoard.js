import React from "react";
import Nav from "../Nav/Nav";
import TaskList from "./TaskList";
import { TASKS } from "./json";
import NewTask from "../NewTask/NewTask";

const AgileBoard = () => {
  return (
    <div>
      <Nav />
      <NewTask />
      <TaskList tasks={TASKS} />
    </div>
  );
};

export default AgileBoard;
