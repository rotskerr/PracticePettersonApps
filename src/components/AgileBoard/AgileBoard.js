import React from 'react'
import Nav from '../Nav/Nav'
import TaskList from "./TaskList";
import { TASKS } from "./json";

const AgileBoard = () => {
  return (
    <div>

        <Nav/>
        <TaskList tasks={TASKS} />
    </div>
  )
}

export default AgileBoard