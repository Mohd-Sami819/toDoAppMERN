import { useState } from 'react';
import '../style/addtask.css';
import { useNavigate } from 'react-router-dom';
export default function AddTask() {
    const[taskData,setTaskData]= useState({});
    const navigate = useNavigate();
    const handleAddTask= async()=>{
        let result = await fetch("http://localhost:3000/add-task",{
            method: 'POST',
            body: JSON.stringify(taskData),
            credentials: 'include',
            headers:{
                "Content-Type": "application/json"
            }
        })
        result = await result.json();
        if (result.success) {
            navigate("/");
            console.log("New Task Added");
        }else{
            alert("Try after some time");
        }
    }
    return (
        <div className="container">
            <h1>Add Task</h1>
                <label htmlFor="">Title</label>
                <input onChange={(event)=>setTaskData({...taskData, title:event.target.value})} type="text" name="title" placeholder="Enter Task Description" />
                <label htmlFor="">Description</label>
                <textarea onChange={(event)=>setTaskData({...taskData, description:event.target.value})} rows={4} name="description" placeholder="Enter Task Descriptoin"></textarea>
                <button onClick={handleAddTask} className="submit">Add New Task</button>
        </div>
    )
}