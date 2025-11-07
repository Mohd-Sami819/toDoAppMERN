import { useEffect, useState } from 'react';
import '../style/addtask.css';
import { useNavigate, useParams } from 'react-router-dom';
export default function AddTask() {
    const[taskData,setTaskData]= useState({});
    const navigate = useNavigate();
    const {id} = useParams();

    const updateTaskData = async()=>{
        let task = await fetch("http://localhost:3000/task/"+id);
        task = await task.json();
        if (task.result) {
            setTaskData(task.result);
        }
    }
    useEffect(()=>{
        updateTaskData(id);
    },[])

    const updateTask = async()=>{
        let task = await fetch("http://localhost:3000/update-task",{
            method: 'put',
            body: JSON.stringify(taskData),
            headers:{
                "Content-Type": "application/json"
            }
        })
        task = await task.json();
        if (task) {
            navigate("/");
        }
    }

    return (
        <div className="container">
            <h1>Update Task</h1>
                <label htmlFor="">Title</label>
                <input value={taskData?.title} onChange={(event)=>setTaskData({...taskData, title:event.target.value})} type="text" name="title" placeholder="Enter Task Description" />
                <label htmlFor="">Description</label>
                <textarea value={taskData?.description} onChange={(event)=>setTaskData({...taskData, description:event.target.value})} rows={4} name="description" placeholder="Enter Task Descriptoin"></textarea>
                <button onClick={updateTask} className="submit">Update Task</button>
        </div>
    )
}