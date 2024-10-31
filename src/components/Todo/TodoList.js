import { Button, Container, List, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

import TodoItem from "./TodoItem";

const TodoList = () => {
    const [newTask, setNewTask] =useState('');
    const {auth} = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
   
    useEffect(() => {
        fetchTasks();
    });

    const fetchTasks = async () => {
        try {
            const {data} = await axios.get('http://localhost:5000/api/tasks', {headers: {Authorization:`Bearer ${auth.token}`},});
            setTasks(data);
        } catch (error) {
            console.log('Fetching Task Error', error);
        }
    }

    const addTask = async () => {
        try {
            const {data} = await axios.post('http://localhost:5000/api/tasks',
                {name: newTask},
                {headers: {Authorization:  `Bearer ${auth.token}`}}
            );
            setTasks((prev) => [...prev, data]);
            setNewTask('');
        } catch (error) {
            console.log('Error adding task', error);
        }
    }

    return (
        <Container sx={{display: "flex",alignItems: 'center', justifyContent:'space-between'}}>
            <TextField 
                label = "New Task"
                fullWidth
                sx={{marginRight: '10px'}}
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
            />
            <Button onClick={addTask} variant="contained" color="primary">
                Add Task
            </Button>
            <List>
                {tasks.map(task => (
                    <TodoItem key={task._id} task = {task} />
                ))}
            </List>            
        </Container>
    );
};

export default TodoList;
