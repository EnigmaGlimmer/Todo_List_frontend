import { Checkbox, IconButton, ListItem, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import {Delete, Edit, Save} from '@mui/icons-material';

const TodoItem = ({task, updateTaskInList, removeTaskInList}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTask, setEditTask] = useState('');

  const toggleCompletion = async () => {
    try {
      const {data} = await axios.put(`http://localhost:5000/api/${task._id}`, {completed: !task.completed});
      updateTaskInList(data);
    } catch (error) {
      console.log('Error toggling task completion', error);
    }
  };
  
  const saveEditTask = async () => {
    if(isEditing.trim() === '') return;
    try {
      const {data} = await axios.put(`http://localhost:5000/api/${task._id}`, {title: editTask});
      updateTaskInList(data);
      setEditTask('');
    } catch (error) {
      console.log("Error updating task", error);
    }
  }

  const deleteTask = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${task._id}`);
      removeTaskInList(task._id);
    } catch (error) {
      console.log("Error Deleting task", error);
    }
  }

  return (
    <ListItem>
      <Checkbox 
        checked = {task.completed}
        onChange={toggleCompletion}
        color="primary"
      />
      {isEditing ? (<TextField 
        value={editTask}
        variant="standard"
        color="primary"
        onChange={(e) => setEditTask(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && saveEditTask()}
      />)
       : (<Typography variant="body1" style={{textDecoration: task.completed? 'line-through': 'none', flexGrow:1}} onDoubleClick = {() => setIsEditing(true)}>
          {task.title}
      </Typography>)}
      <IconButton onClick={() => (isEditing? saveEditTask(): setIsEditing(true))} color="secondary" >
        {isEditing ? <Edit />: <Save />}
      </IconButton>
      <IconButton onClick={deleteTask} color="secondary">
        <Delete />
      </IconButton>
    </ListItem>
  );
};

export default TodoItem;